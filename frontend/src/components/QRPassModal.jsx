import React from 'react';
import { X, QrCode, Download, Printer, ShieldCheck, MapPin, Calendar, Clock, Car } from 'lucide-react';

export default function QRPassModal({ reservation, car, onClose }) {
  const code = reservation?.reservationNumber || 'SMR-2026-00051';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Digital Reservation Pass</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Pass Container */}
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl p-5 border border-emerald-500/30 shadow-glow-green text-center space-y-4 relative overflow-hidden">
          
          {/* Ticket Header Badge */}
          <div className="bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest py-1 px-4 rounded-full inline-block">
            GoDrive Somalia Official Pass
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium block">RESERVATION NUMBER</span>
            <span className="text-2xl font-black tracking-widest text-emerald-400 font-mono">
              {code}
            </span>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-4 rounded-2xl inline-block shadow-lg mx-auto">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                JSON.stringify({ code, company: 'GoDrive Somalia', verifyUrl: `https://godrive.so/verify/${code}` })
              )}`}
              alt="Reservation QR Code"
              className="w-40 h-40 object-contain mx-auto"
            />
          </div>

          <p className="text-[11px] text-slate-400 font-medium max-w-xs mx-auto">
            Show this QR code to GoDrive Somalia Security Guards at airport parking gate for immediate vehicle release.
          </p>

          {/* Pass Details */}
          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-xs text-left space-y-2 text-slate-300">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-slate-400">
                <Car className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Vehicle:
              </span>
              <span className="font-bold text-white">{car?.name || 'Toyota Land Cruiser V8'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Pickup Bay:
              </span>
              <span className="font-bold text-white">{reservation?.pickupLocation || 'Aden Adde Airport Parking B'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Pickup Time:
              </span>
              <span className="font-bold text-emerald-400">
                {new Date(reservation?.startDate || Date.now()).toLocaleDateString()} @ {reservation?.pickupTime || '02:00 PM'}
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => window.print()}
            className="py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition flex items-center justify-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition flex items-center justify-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Done</span>
          </button>
        </div>

      </div>
    </div>
  );
}
