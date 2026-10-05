import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { 
    type: String, 
    enum: ['Admin', 'Manager', 'Employee', 'Guard', 'Customer'], 
    default: 'Customer' 
  },
  isVerified: { type: Boolean, default: true },
  verificationToken: { type: String, default: null },
  licenseUrl: { type: String, default: '' },
  passportUrl: { type: String, default: '' },
  emergencyContact: {
    name: { type: String, default: '' },
    relationship: { type: String, default: '' },
    phone: { type: String, default: '' }
  },
  status: { type: String, enum: ['Active', 'VIP', 'Blacklisted'], default: 'Active' },
  blacklistReason: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
