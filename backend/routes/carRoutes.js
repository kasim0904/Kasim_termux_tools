import express from 'express';
import { getCars, addCar, updateCar } from '../utils/mockStore.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all cars with filtering & search
router.get('/', (req, res) => {
  let fleet = getCars();
  const { category, search, transmission, location, minPrice, maxPrice, sortBy } = req.query;

  if (category && category !== 'All') {
    fleet = fleet.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }

  if (transmission && transmission !== 'All') {
    fleet = fleet.filter(c => c.transmission.toLowerCase() === transmission.toLowerCase());
  }

  if (location && location !== 'All') {
    fleet = fleet.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    fleet = fleet.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.make.toLowerCase().includes(q) ||
      c.modelName.toLowerCase().includes(q) ||
      c.licensePlate.toLowerCase().includes(q)
    );
  }

  if (minPrice) fleet = fleet.filter(c => c.dailyRate >= Number(minPrice));
  if (maxPrice) fleet = fleet.filter(c => c.dailyRate <= Number(maxPrice));

  if (sortBy === 'price-low') fleet.sort((a, b) => a.dailyRate - b.dailyRate);
  if (sortBy === 'price-high') fleet.sort((a, b) => b.dailyRate - a.dailyRate);
  if (sortBy === 'rating') fleet.sort((a, b) => b.rating - a.rating);

  res.json(fleet);
});

// Dynamic Price Calculator (Supports up to 4 months / 120 days)
router.post('/calculate-price', (req, res) => {
  const { carId, days, months } = req.body;
  const car = getCars().find(c => c._id === carId);

  if (!car) return res.status(404).json({ message: 'Car not found' });

  const totalDays = Number(days) || (Number(months) ? Number(months) * 30 : 1);
  if (totalDays > 120) {
    return res.status(400).json({ message: 'Maximum initial booking duration is 4 months (120 days).' });
  }

  let baseRate = 0;
  let discountPct = 0;

  if (totalDays >= 30) {
    const totalMonths = Math.floor(totalDays / 30);
    const remDays = totalDays % 30;
    baseRate = (totalMonths * car.monthlyRate) + (remDays * car.dailyRate);
    discountPct = 0.15; // 15% long-term rental discount
  } else if (totalDays >= 7) {
    const totalWeeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    baseRate = (totalWeeks * car.weeklyRate) + (remDays * car.dailyRate);
    discountPct = 0.10; // 10% weekly discount
  } else {
    baseRate = totalDays * car.dailyRate;
  }

  const discount = baseRate * discountPct;
  const netRental = baseRate - discount;
  const insuranceFee = 25;
  const tax = netRental * 0.05; // 5% Somali Tax
  const deposit = 100;
  const finalPrice = netRental + insuranceFee + tax + deposit;

  res.json({
    totalDays,
    baseRate,
    discount,
    netRental,
    insuranceFee,
    tax,
    deposit,
    finalPrice,
    currency: 'USD'
  });
});

// Get single car details
router.get('/:id', (req, res) => {
  const car = getCars().find(c => c._id === req.params.id);
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
});

// Admin/Manager Add Car
router.post('/', authMiddleware, roleMiddleware(['Admin', 'Manager']), (req, res) => {
  const newCar = {
    _id: `car-${Date.now()}`,
    ...req.body,
    rating: 5.0,
    reviewsCount: 1,
    createdAt: new Date().toISOString()
  };
  addCar(newCar);
  res.status(201).json({ message: 'Car added to fleet successfully', car: newCar });
});

// Admin/Manager Update Car
router.put('/:id', authMiddleware, roleMiddleware(['Admin', 'Manager']), (req, res) => {
  const updated = updateCar(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Car not found' });
  res.json({ message: 'Car updated successfully', car: updated });
});

export default router;
