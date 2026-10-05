import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database Connection with Fallback
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log(' Connected to MongoDB Atlas'))
    .catch((err) => console.warn(' MongoDB Atlas connection error, using in-memory store:', err.message));
} else {
  console.log(' MONGODB_URI not provided. Operating in High-Performance In-Memory Store Mode.');
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'GoDrive Somalia API Backend',
    timestamp: new Date().toISOString(),
    supportedPayments: ['PayPal', 'Credit Card (Visa/Mastercard)', 'EVC Plus', 'Zaad', 'Sahal']
  });
});

// Root fallback
app.get('/', (req, res) => {
  res.send('GoDrive Somalia Car Rental API Backend is running smoothly.');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 GoDrive Somalia Backend server listening on http://localhost:${PORT}`);
});
