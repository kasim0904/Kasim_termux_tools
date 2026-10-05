import { initialCars } from '../data/seedData.js';

let carsStore = [...initialCars];

let usersStore = [
  {
    _id: 'user-admin',
    name: 'Executive Admin',
    email: 'admin@godrive.so',
    password: '$2a$10$X8m1P39.w4nL1p8v0w.1.eWq3W7d1w1a1s1d1f1g1h1j1k1l1m', // admin123
    phone: '+252 61 555 0100',
    role: 'Admin',
    isVerified: true,
    status: 'Active'
  },
  {
    _id: 'user-auditor',
    name: 'Compliance Auditor',
    email: 'auditor@godrive.so',
    password: '$2a$10$X8m1P39.w4nL1p8v0w.1.eWq3W7d1w1a1s1d1f1g1h1j1k1l1m', // auditor123
    phone: '+252 61 555 0101',
    role: 'Auditor',
    isVerified: true,
    status: 'Active'
  },
  {
    _id: 'user-guard',
    name: 'Aden Guard Officer',
    email: 'guard@godrive.so',
    password: '$2a$10$X8m1P39.w4nL1p8v0w.1.eWq3W7d1w1a1s1d1f1g1h1j1k1l1m', // guard123
    phone: '+252 61 555 0102',
    role: 'Guard',
    isVerified: true,
    status: 'Active'
  },
  {
    _id: 'user-employee',
    name: 'Mogadishu Handover Staff',
    email: 'employee@godrive.so',
    password: '$2a$10$X8m1P39.w4nL1p8v0w.1.eWq3W7d1w1a1s1d1f1g1h1j1k1l1m', // employee123
    phone: '+252 61 555 0103',
    role: 'Employee',
    isVerified: true,
    status: 'Active'
  },
  {
    _id: 'user-customer',
    name: 'Abdirahman Hassan',
    email: 'customer@godrive.so',
    password: '$2a$10$X8m1P39.w4nL1p8v0w.1.eWq3W7d1w1a1s1d1f1g1h1j1k1l1m', // customer123
    phone: '+252 61 700 8822',
    role: 'Customer',
    isVerified: true,
    status: 'VIP'
  }
];

let systemSettings = {
  taxRatePct: 5,
  securityDepositUsd: 100,
  insuranceDailyRateUsd: 25,
  maxInitialBookingDays: 120,
  defaultCurrency: 'USD',
  supportedLanguages: ['English', 'Af-Soomaali'],
  emailTemplates: {
    bookingConfirmed: 'Dear {name}, your booking {resCode} for {car} is confirmed. Show your QR pass at {location}.',
    reminder7Days: 'Reminder: Your rental for {car} expires in 7 days.',
    reminder24Hours: 'Important: Your rental for {car} expires in 24 hours. Renew online or return vehicle.'
  }
};

let reservationsStore = [
  {
    _id: 'res-1',
    reservationNumber: 'SMR-2026-00081',
    user: 'user-customer',
    car: 'car-1',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    pickupTime: '02:00 PM',
    pickupType: 'Airport Pickup',
    pickupLocation: 'Aden Adde Airport Parking B',
    parkingNumber: 'Parking Bay B-14',
    carNumber: 'SMR-9901',
    rentalDays: 5,
    basePrice: 750,
    discount: 50,
    insuranceFee: 25,
    tax: 35,
    deposit: 100,
    totalAmount: 860,
    digitalSignature: 'Abdirahman Hassan',
    agreementAccepted: true,
    qrCodeUrl: '',
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    transactionRef: 'PAYPAL-8892019',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
    guardVerification: null,
    employeeHandover: null,
    postDriveInspection: null
  }
];

let maintenanceStore = [
  {
    _id: 'maint-1',
    car: 'car-1',
    title: 'Routine Oil & Filter Change',
    type: 'Oil Change',
    cost: 120,
    status: 'Scheduled',
    scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Synthetic 5W-40 oil for Land Cruiser V8.'
  }
];

let auditorAlertsStore = [
  {
    id: 'alt-1',
    severity: 'Medium',
    type: 'Manual Deposit Refund',
    message: 'Manual deposit refund of $100 authorized for reservation SMR-2026-00051',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 'alt-2',
    severity: 'Low',
    type: 'System Settings Access',
    message: 'Tax rate settings inspected by Executive Admin',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  }
];

let auditLogsStore = [
  {
    _id: 'audit-1',
    action: 'Reservation Verified by Guard',
    performer: 'guard@godrive.so',
    role: 'Guard',
    details: 'Verified License & Passport for Abdirahman Hassan (SMR-2026-00081)',
    ipAddress: '197.220.88.12',
    createdAt: new Date().toISOString()
  }
];

export const getCars = () => carsStore;
export const addCar = (car) => { carsStore.push(car); return car; };
export const updateCar = (id, updates) => {
  carsStore = carsStore.map(c => c._id === id ? { ...c, ...updates } : c);
  return carsStore.find(c => c._id === id);
};

export const getUsers = () => usersStore;
export const addUser = (user) => { usersStore.push(user); return user; };
export const updateUser = (id, updates) => {
  usersStore = usersStore.map(u => u._id === id ? { ...u, ...updates } : u);
  return usersStore.find(u => u._id === id);
};

export const getReservations = () => reservationsStore;
export const addReservation = (res) => { reservationsStore.unshift(res); return res; };
export const updateReservation = (id, updates) => {
  reservationsStore = reservationsStore.map(r => r._id === id ? { ...r, ...updates } : r);
  return reservationsStore.find(r => r._id === id);
};

export const getMaintenance = () => maintenanceStore;
export const addMaintenance = (m) => { maintenanceStore.unshift(m); return m; };

export const getSettings = () => systemSettings;
export const updateSettings = (updates) => { systemSettings = { ...systemSettings, ...updates }; return systemSettings; };

export const getAuditorAlerts = () => auditorAlertsStore;
export const addAuditorAlert = (alert) => { auditorAlertsStore.unshift(alert); return alert; };

export const getAuditLogs = () => auditLogsStore;
export const addAuditLog = (log) => { auditLogsStore.unshift(log); return log; };
