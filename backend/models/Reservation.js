import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  reservationNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  pickupTime: { type: String, default: '10:00 AM' },
  pickupType: { type: String, enum: ['Airport Pickup', 'Hotel Pickup', 'Self Pickup'], default: 'Airport Pickup' },
  pickupLocation: { type: String, default: 'Aden Adde Airport Parking B' },
  
  // Pricing breakdown
  rentalDays: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  insuranceFee: { type: Number, default: 25 },
  tax: { type: Number, default: 15 },
  deposit: { type: Number, default: 100 },
  totalAmount: { type: Number, required: true },
  
  // Contract & Signatures
  digitalSignature: { type: String, default: '' },
  agreementAccepted: { type: Boolean, default: false },
  qrCodeUrl: { type: String, default: '' },
  
  // Pre-drive Evidence
  preDriveEvidence: {
    photos: [{ type: String }],
    video360: { type: String, default: '' },
    dashboardPhoto: { type: String, default: '' },
    fuelLevelPercentage: { type: Number, default: 100 },
    verifiedAt: { type: Date }
  },
  
  // Return Inspection
  postDriveInspection: {
    mileageReturned: { type: Number, default: 0 },
    fuelLevelReturned: { type: Number, default: 100 },
    hasDamage: { type: Boolean, default: false },
    damageNotes: { type: String, default: '' },
    estimatedRepairCost: { type: Number, default: 0 },
    inspectionPhotos: [{ type: String }],
    inspectedBy: { type: String, default: '' },
    inspectedAt: { type: Date }
  },

  // Payment
  paymentMethod: { type: String, enum: ['PayPal', 'Credit Card', 'Visa', 'Mastercard', 'EVC Plus', 'Zaad', 'Sahal'], default: 'PayPal' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Refunded', 'Failed'], default: 'Paid' },
  transactionRef: { type: String, default: '' },

  // Status
  status: { 
    type: String, 
    enum: ['Confirmed', 'Active', 'Completed', 'Cancelled', 'Late'], 
    default: 'Confirmed' 
  },
  renewalHistory: [{
    extendedUntil: { type: Date },
    additionalCost: { type: Number },
    renewedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);
