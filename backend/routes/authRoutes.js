import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, authMiddleware } from '../middleware/auth.js';
import { getUsers, addUser, updateUser } from '../utils/mockStore.js';

const router = express.Router();

// Register Customer
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, licenseUrl, passportUrl } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ message: 'An account already exists with this email address' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      role: 'Customer',
      isVerified: true,
      licenseUrl: licenseUrl || '',
      passportUrl: passportUrl || '',
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    addUser(newUser);
    const token = generateToken(newUser);

    const { password: _, ...userWithoutPass } = newUser;
    return res.status(201).json({
      message: 'Customer account registered successfully',
      token,
      user: userWithoutPass
    });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login (Supports Admin, Auditor, Guard, Employee, Customer)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Default password checks or bcrypt
    const defaultPasswords = {
      'admin@godrive.so': 'admin123',
      'auditor@godrive.so': 'auditor123',
      'guard@godrive.so': 'guard123',
      'employee@godrive.so': 'employee123',
      'customer@godrive.so': 'customer123'
    };

    const isDefaultMatch = defaultPasswords[user.email] && defaultPasswords[user.email] === password;
    const isBcryptMatch = await bcrypt.compare(password, user.password).catch(() => false);

    if (!isDefaultMatch && !isBcryptMatch && user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPass } = user;

    return res.json({
      message: 'Login successful',
      token,
      user: userWithoutPass
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get Profile
router.get('/profile', authMiddleware, (req, res) => {
  const user = getUsers().find(u => u._id === req.user.id || u.email === req.user.email);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password: _, ...userWithoutPass } = user;
  res.json(userWithoutPass);
});

export default router;
