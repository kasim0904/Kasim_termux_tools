import express from 'express';
import { getReservations, getCars, getUsers, getMaintenance, addMaintenance, getAuditLogs, updateUser, getSettings, updateSettings, getAuditorAlerts, addUser } from '../utils/mockStore.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';
import { generateInvoicePDF } from '../utils/pdfGenerator.js';

const router = express.Router();

// Admin Stats
router.get('/stats', authMiddleware, roleMiddleware(['Admin', 'Manager', 'Auditor']), (req, res) => {
  const reservations = getReservations();
  const cars = getCars();
  const users = getUsers();
  const maintenance = getMaintenance();

  const totalRevenue = reservations.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
  const carsAvailable = cars.filter(c => c.isAvailable).length;
  const carsRented = cars.length - carsAvailable;

  res.json({
    totalRevenue,
    totalCars: cars.length,
    carsAvailable,
    carsRented,
    pendingRequests: reservations.filter(r => r.status === 'Confirmed').length,
    lateReturns: 0,
    totalCustomers: users.filter(u => u.role === 'Customer').length,
    totalEmployees: users.filter(u => u.role !== 'Customer').length,
    maintenanceAlerts: maintenance.length,
    monthlyRevenue: [
      { month: 'Jan', revenue: 14200 },
      { month: 'Feb', revenue: 18500 },
      { month: 'Mar', revenue: 22400 },
      { month: 'Apr', revenue: 19800 },
      { month: 'May', revenue: 26500 },
      { month: 'Jun', revenue: 31000 },
      { month: 'Jul', revenue: totalRevenue || 34200 }
    ]
  });
});

// Employee Management (Create, Role Assign, Deactivate)
router.get('/employees', authMiddleware, roleMiddleware(['Admin', 'Manager', 'Auditor']), (req, res) => {
  res.json(getUsers().filter(u => u.role !== 'Customer'));
});

router.post('/employees', authMiddleware, roleMiddleware(['Admin']), (req, res) => {
  const { name, email, password, role, phone } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Name, email, and role are required' });
  }

  const newEmp = {
    _id: `user-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    password: password || 'staff123',
    role,
    phone: phone || '',
    isVerified: true,
    status: 'Active',
    createdAt: new Date().toISOString()
  };

  addUser(newEmp);
  res.status(201).json({ message: 'Staff member account created', employee: newEmp });
});

// System Settings (Taxes, Pricing rules, Deposits, Languages)
router.get('/settings', authMiddleware, roleMiddleware(['Admin', 'Auditor']), (req, res) => {
  res.json(getSettings());
});

router.put('/settings', authMiddleware, roleMiddleware(['Admin']), (req, res) => {
  const updated = updateSettings(req.body);
  res.json({ message: 'System settings updated successfully', settings: updated });
});

// Auditor Portal Alerts & Compliance Read-Only Summary
router.get('/auditor/alerts', authMiddleware, roleMiddleware(['Auditor', 'Admin']), (req, res) => {
  res.json(getAuditorAlerts());
});

router.get('/auditor/summary', authMiddleware, roleMiddleware(['Auditor', 'Admin']), (req, res) => {
  const reservations = getReservations();
  const totalFinancials = reservations.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
  const totalDeposits = reservations.reduce((sum, r) => sum + (r.deposit || 0), 0);

  res.json({
    isReadOnly: true,
    auditorName: req.user.name,
    totalFinancials,
    totalDeposits,
    reconciledCount: reservations.length,
    anomaliesDetected: getAuditorAlerts().length,
    verificationAudit: {
      guardApprovalsCount: reservations.filter(r => r.guardVerification).length,
      employeeHandoverCount: reservations.filter(r => r.postDriveInspection).length
    }
  });
});

// Export CSV/Report Data
router.get('/export-report', authMiddleware, roleMiddleware(['Admin', 'Auditor']), (req, res) => {
  const reservations = getReservations();
  const csvRows = [
    ['Reservation Code', 'Customer', 'Vehicle', 'Amount Paid', 'Status', 'Payment Method', 'Date'].join(','),
    ...reservations.map(r => [
      r.reservationNumber,
      `"${r.digitalSignature || 'Customer'}"`,
      `"${r.carNumber || 'Toyota V8'}"`,
      r.totalAmount,
      r.status,
      r.paymentMethod,
      new Date(r.createdAt || Date.now()).toLocaleDateString()
    ].join(','))
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=GoDrive-Somalia-Operational-Report.csv');
  res.send(csvRows);
});

// Download Invoice PDF
router.get('/invoice/:reservationId', authMiddleware, async (req, res) => {
  try {
    const reservation = getReservations().find(r => r._id === req.params.reservationId || r.reservationNumber === req.params.reservationId);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    const car = getCars().find(c => c._id === (typeof reservation.car === 'object' ? reservation.car._id : reservation.car));
    const user = getUsers().find(u => u._id === reservation.user);

    const pdfBuffer = await generateInvoicePDF(reservation, car, user);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${reservation.reservationNumber}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
  }
});

// Maintenance
router.get('/maintenance', authMiddleware, roleMiddleware(['Admin', 'Manager', 'Employee', 'Auditor']), (req, res) => {
  const list = getMaintenance().map(m => {
    const car = getCars().find(c => c._id === m.car);
    return { ...m, car };
  });
  res.json(list);
});

// Customer Directory
router.get('/customers', authMiddleware, roleMiddleware(['Admin', 'Manager', 'Auditor']), (req, res) => {
  res.json(getUsers().filter(u => u.role === 'Customer'));
});

// Audit Logs
router.get('/audit-logs', authMiddleware, roleMiddleware(['Admin', 'Auditor']), (req, res) => {
  res.json(getAuditLogs());
});

export default router;
