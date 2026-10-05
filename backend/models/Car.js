import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  make: { type: String, required: true },
  modelName: { type: String, required: true },
  year: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['SUV', 'Sedan', 'Luxury', 'Pickup', 'Economy'], 
    required: true 
  },
  transmission: { type: String, enum: ['Automatic', 'Manual'], default: 'Automatic' },
  fuelType: { type: String, enum: ['Diesel', 'Petrol', 'Hybrid'], default: 'Diesel' },
  ac: { type: Boolean, default: true },
  bluetooth: { type: Boolean, default: true },
  seats: { type: Number, default: 5 },
  mileage: { type: Number, default: 15000 },
  color: { type: String, default: 'White' },
  licensePlate: { type: String, required: true, unique: true },
  dailyRate: { type: Number, required: true },
  weeklyRate: { type: Number, required: true },
  monthlyRate: { type: Number, required: true },
  location: { type: String, default: 'Mogadishu Aden Adde Airport' },
  images: [{ type: String }],
  interiorImages: [{ type: String }],
  engineImage: { type: String, default: '' },
  video360Url: { type: String, default: '' },
  insuranceStatus: { type: String, enum: ['Active', 'Pending', 'Expired'], default: 'Active' },
  insuranceExpiry: { type: Date, default: () => new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) },
  registrationExpiry: { type: Date, default: () => new Date(Date.now() + 300 * 24 * 60 * 60 * 1000) },
  oilChangeKm: { type: Number, default: 5000 },
  nextServiceKm: { type: Number, default: 20000 },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 12 },
  description: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Car || mongoose.model('Car', carSchema);
