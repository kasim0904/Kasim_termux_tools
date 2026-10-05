import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  performer: { type: String, required: true },
  role: { type: String, default: 'Staff' },
  details: { type: String, required: true },
  targetId: { type: String, default: '' },
  ipAddress: { type: String, default: '127.0.0.1' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
