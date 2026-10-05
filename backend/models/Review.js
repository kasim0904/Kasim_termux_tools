import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  photos: [{ type: String }],
  isVerifiedBooking: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
