import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CarsList from './pages/CarsList';
import CarDetails from './pages/CarDetails';
import BookingPage from './pages/BookingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GuardScannerPage from './pages/GuardScannerPage';
import EmployeePortal from './pages/EmployeePortal';
import AuditorPortal from './pages/AuditorPortal';
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarsList />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employee" element={<EmployeePortal />} />
          <Route path="/auditor" element={<AuditorPortal />} />
          <Route path="/guard-gate" element={<GuardScannerPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
