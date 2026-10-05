import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['Oil Change', 'Tire Replacement', 'Engine Inspection', 'Brake Service', 'Registration Expiry', 'Insurance Renewal'], required: true },
  cost: { type: Number, required: true },
  status: { type: String, enum: ['Scheduled', 'In Progress', 'Completed'], default: 'Scheduled' },
  scheduledDate: { type: Date, required: true },
  completedDate: { type: Date },
  notes: { type: String, default: '' },
  performedBy: { type: String, default: 'Mogadishu Auto Care' }
}, { timestamps: true });

export default mongoose.models.Maintenance || mongoose.model('Maintenance', maintenanceSchema);
