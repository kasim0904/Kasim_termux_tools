import express from 'express';
import { getReservations, addReservation, updateReservation, getCars, getUsers, addAuditLog } from '../utils/mockStore.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';
import { generateReservationQR } from '../utils/qrGenerator.js';

const router = express.Router();

// Create Reservation
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      carId,
      startDate,
      endDate,
      pickupTime,
      pickupType,
      pickupLocation,
      rentalDays,
      basePrice,
      discount,
      insuranceFee,
      tax,
      deposit,
      totalAmount,
      digitalSignature,
      paymentMethod
    } = req.body;

    const car = getCars().find(c => c._id === carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const reservationSeq = Math.floor(10000 + Math.random() * 90000);
    const reservationNumber = `SMR-2026-${reservationSeq}`;
    const qrCodeUrl = await generateReservationQR(reservationNumber);

    const newReservation = {
      _id: `res-${Date.now()}`,
      reservationNumber,
      user: req.user.id,
      car: carId,
      startDate,
      endDate,
      pickupTime: pickupTime || '10:00 AM',
      pickupType: pickupType || 'Airport Pickup',
      pickupLocation: pickupLocation || 'Aden Adde Airport Parking B',
      parkingNumber: `Parking Bay B-${Math.floor(10 + Math.random() * 40)}`,
      carNumber: car.licensePlate,
      rentalDays: Number(rentalDays) || 1,
      basePrice: Number(basePrice),
      discount: Number(discount) || 0,
      insuranceFee: Number(insuranceFee) || 25,
      tax: Number(tax) || 15,
      deposit: Number(deposit) || 100,
      totalAmount: Number(totalAmount),
      digitalSignature: digitalSignature || req.user.name,
      agreementAccepted: true,
      qrCodeUrl,
      paymentMethod: paymentMethod || 'PayPal',
      paymentStatus: 'Paid',
      transactionRef: `${(paymentMethod || 'PAYPAL').toUpperCase()}-${Date.now().toString().slice(-6)}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      guardVerification: null,
      employeeHandover: null,
      postDriveInspection: null
    };

    addReservation(newReservation);

    // Audit Log
    addAuditLog({
      action: 'Reservation Booked',
      performer: req.user.email,
      role: req.user.role,
      details: `Created reservation ${reservationNumber} for ${car.name}`,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      message: 'Reservation booked successfully!',
      reservation: newReservation,
      car
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reservation', error: error.message });
  }
});

// Guard Step: Approve Pickup Timestamping
router.post('/:id/approve-pickup', authMiddleware, roleMiddleware(['Guard', 'Admin']), (req, res) => {
  const reservation = getReservations().find(r => r._id === req.params.id || r.reservationNumber === req.params.id);
  if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

  const guardVerification = {
    guardName: req.user.name,
    guardEmail: req.user.email,
    approvedAt: new Date().toISOString(),
    location: reservation.pickupLocation,
    licenseVerified: true,
    passportVerified: true
  };

  const updated = updateReservation(reservation._id, {
    status: 'Guard Verified',
    guardVerification
  });

  addAuditLog({
    action: 'Guard Approved Pickup',
    performer: req.user.email,
    role: 'Guard',
    details: `Guard approved driver identity for ${reservation.reservationNumber}`,
    createdAt: new Date().toISOString()
  });

  res.json({ message: 'Pickup approved by Guard', reservation: updated });
});

// Employee Step: Handover & Inspection
router.post('/:id/employee-inspection', authMiddleware, roleMiddleware(['Employee', 'Admin', 'Manager']), (req, res) => {
  const { mileageReturned, fuelLevelReturned, hasDamage, damageNotes, estimatedRepairCost, inspectionPhotos } = req.body;
  const reservation = getReservations().find(r => r._id === req.params.id || r.reservationNumber === req.params.id);
  if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

  const repairCost = Number(estimatedRepairCost) || 0;
  const depositRefund = Math.max(0, (reservation.deposit || 100) - repairCost);

  const postDriveInspection = {
    mileageReturned: Number(mileageReturned),
    fuelLevelReturned: Number(fuelLevelReturned),
    hasDamage: Boolean(hasDamage),
    damageNotes: damageNotes || '',
    estimatedRepairCost: repairCost,
    depositRefund,
    inspectionPhotos: inspectionPhotos || [],
    inspectedBy: req.user.name,
    inspectedAt: new Date().toISOString()
  };

  const updated = updateReservation(reservation._id, {
    status: 'Completed',
    postDriveInspection
  });

  addAuditLog({
    action: 'Employee Inspection Completed',
    performer: req.user.email,
    role: req.user.role,
    details: `Completed return inspection for ${reservation.reservationNumber}. Refund calculated: $${depositRefund}`,
    createdAt: new Date().toISOString()
  });

  res.json({
    message: 'Return inspection logged successfully',
    reservation: updated,
    depositRefund
  });
});

// My Bookings
router.get('/my-bookings', authMiddleware, (req, res) => {
  const reservations = getReservations()
    .filter(r => r.user === req.user.id || r.user?._id === req.user.id)
    .map(r => {
      const car = getCars().find(c => c._id === (typeof r.car === 'object' ? r.car._id : r.car));
      return { ...r, car };
    });
  res.json(reservations);
});

// Guard Verification Lookup
router.get('/verify/:code', (req, res) => {
  const code = req.params.code.toUpperCase();
  const reservation = getReservations().find(r => r.reservationNumber.toUpperCase() === code);
  if (!reservation) {
    return res.status(404).json({ message: 'Invalid Reservation Pass Code' });
  }

  const car = getCars().find(c => c._id === (typeof reservation.car === 'object' ? reservation.car._id : reservation.car));
  const user = getUsers().find(u => u._id === reservation.user);

  res.json({
    verified: true,
    reservationId: reservation._id,
    reservationNumber: reservation.reservationNumber,
    status: reservation.status,
    customerName: user ? user.name : 'Abdirahman Hassan',
    customerPhone: user ? user.phone : '+252 61 700 8822',
    pickupTime: reservation.pickupTime,
    pickupLocation: reservation.pickupLocation,
    parkingNumber: reservation.parkingNumber || 'Parking Bay B-14',
    carName: car ? `${car.make} ${car.modelName}` : 'Toyota Land Cruiser V8',
    licensePlate: car ? car.licensePlate : 'SMR-9901',
    paymentStatus: reservation.paymentStatus,
    guardVerification: reservation.guardVerification
  });
});

export default router;
