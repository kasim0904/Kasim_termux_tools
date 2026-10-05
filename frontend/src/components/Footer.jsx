import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Go<span className="text-emerald-400">Drive</span> Somalia
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Somalia's premier commercial vehicle rental network. Offering fully armored and standard luxury 4x4 SUVs, sedans, and double cab pickups with 24/7 security dispatch, online verification, and digital evidence upload.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                ISO Certified Somalia Fleet
              </span>
            </div>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Somalia Hubs</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mogadishu Aden Adde Airport</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hargeisa Egal International</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Garowe Airport & City Center</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kismayo Seaport & Downtown</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Baidoa & Bosaso Stations</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-emerald-400 transition">Home Landing</Link></li>
              <li><Link to="/cars" className="hover:text-emerald-400 transition">Browse Vehicles</Link></li>
              <li><Link to="/my-bookings" className="hover:text-emerald-400 transition">My Reservation Pass</Link></li>
              <li><Link to="/guard-gate" className="hover:text-emerald-400 transition">Guard QR Verification</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 transition">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Accepted Payments */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Payment Gateways</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-2">
                <span className="font-bold text-blue-400">PayPal</span>
                <span className="text-[10px] text-slate-500">Instant Online</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-2">
                <span className="font-bold text-emerald-400">Visa / MasterCard</span>
                <span className="text-[10px] text-slate-500">Global Credit</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-2">
                <span className="font-bold text-amber-400">EVC Plus / Zaad / Sahal</span>
                <span className="text-[10px] text-slate-500">Somali Mobile</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 text-center md:flex md:justify-between md:text-left text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GoDrive Somalia Ltd. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex justify-center space-x-6">
            <span className="hover:text-slate-300">Privacy Policy</span>
            <span className="hover:text-slate-300">Digital Rental Contract Terms</span>
            <span className="hover:text-slate-300">Security Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
