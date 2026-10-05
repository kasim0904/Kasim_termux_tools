import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, UserCheck, PhoneCall, Globe, LogOut, Menu, X, Key, Lock } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t, lang, toggleLanguage } = useLanguage();
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      
      {/* Top Banner: Emergency Hotline & Language Switch */}
      <div className="bg-slate-900 py-1.5 px-4 text-xs font-medium text-slate-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-emerald-400 font-semibold">
              <PhoneCall className="w-3.5 h-3.5 mr-1 animate-pulse" />
              {t('emergencyHotline')}
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-slate-400">
              ✈ Mogadishu Aden Adde • Hargeisa Egal • Garowe • Kismayo
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-slate-200 hover:text-emerald-400 font-semibold bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? '🇸🇴 Soomaali' : '🇬🇧 English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Custom SUV Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#00A859] p-2 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
              <img src="/favicon.svg" alt="GoDrive Somalia SUV Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Go<span className="text-[#00A859]">Drive</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  SOMALIA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Car Rental & Fleet System</p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t('home')}
            </Link>

            <Link
              to="/cars"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/cars') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t('fleet')}
            </Link>

            {user?.role === 'Customer' && (
              <Link
                to="/my-bookings"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                  isActive('/my-bookings') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t('myBookings')}
              </Link>
            )}

            {user?.role === 'Guard' && (
              <Link
                to="/guard-gate"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center space-x-1.5 ${
                  isActive('/guard-gate') ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'text-amber-700 hover:bg-amber-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Guard Gate Pass</span>
              </Link>
            )}

            {user?.role === 'Employee' && (
              <Link
                to="/employee"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center space-x-1.5 ${
                  isActive('/employee') ? 'bg-emerald-600 text-white shadow-soft' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Key className="w-4 h-4 text-emerald-400" />
                <span>Employee Handover</span>
              </Link>
            )}

            {user?.role === 'Auditor' && (
              <Link
                to="/auditor"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center space-x-1.5 ${
                  isActive('/auditor') ? 'bg-purple-600 text-white shadow-soft' : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Auditor Portal</span>
              </Link>
            )}

            {user?.role === 'Admin' && (
              <Link
                to="/admin"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center space-x-1.5 ${
                  isActive('/admin') ? 'bg-emerald-600 text-white shadow-soft' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Admin Portal</span>
              </Link>
            )}
          </nav>

          {/* User Auth Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-end space-x-1">
                    <span>{user.name}</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold border border-emerald-200">
                      {user.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A859] text-white hover:bg-emerald-700 shadow-soft transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 rounded-xl bg-slate-100 text-slate-700">
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 text-sm font-semibold">
          <Link to="/" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-700">{t('home')}</Link>
          <Link to="/cars" onClick={() => setMobileMenu(false)} className="block py-2 text-slate-700">{t('fleet')}</Link>
          {user ? (
            <button onClick={() => { logout(); setMobileMenu(false); }} className="w-full text-left py-2 text-red-600">Log Out</button>
          ) : (
            <Link to="/auth" onClick={() => setMobileMenu(false)} className="block py-2 text-[#00A859]">Log In / Register</Link>
          )}
        </div>
      )}

    </header>
  );
}
