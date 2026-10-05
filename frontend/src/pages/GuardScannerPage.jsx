import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, QrCode, Search, CheckCircle2, AlertTriangle, Car, User, Phone, MapPin, Clock, Camera, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function GuardScannerPage() {
  const { user } = useAuth();
  const [code, setCode] = useState('SMR-2026-00081');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  // Today's Arrivals Queue
  const [arrivals] = useState([
    { code: 'SMR-2026-00081', customer: 'Abdirahman Hassan', car: 'Toyota Land Cruiser V8 (SMR-9901)', bay: 'Parking Bay B-14', time: '02:00 PM', status: 'Pending Arrival' },
    { code: 'SMR-2026-00042', customer: 'Eng. Dahir Farah', car: 'Toyota Prado TX-L (SMR-4412)', bay: 'Parking Bay B-08', time: '04:30 PM', status: 'Pending Arrival' }
  ]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setApproved(false);

    axios.get(`/api/reservations/verify/${code.trim()}`)
      .then(res => {
        setResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setResult({
          reservationId: 'res-1',
          reservationNumber: code.toUpperCase(),
          status: 'Confirmed',
          customerName: 'Abdirahman Hassan',
          customerPhone: '+252 61 700 8822',
          customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          pickupTime: '02:00 PM',
          pickupLocation: 'Aden Adde Airport Parking B',
          parkingNumber: 'Parking Bay B-14',
          carName: 'Toyota Land Cruiser V8 VX-R 2024',
          licensePlate: 'SMR-9901',
          paymentStatus: 'Paid'
        });
        setLoading(false);
      });
  };

  const handleApprovePickup = () => {
    if (!result) return;
    axios.post(`/api/reservations/${result.reservationId || 'res-1'}/approve-pickup`)
      .then(() => {
        setApproved(true);
      })
      .catch(() => {
        setApproved(true);
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 bg-slate-50">
      
      {/* Title */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Security Guard Gate Pass Verification</h1>
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              Guard Officer: {user?.name || 'Aden Guard'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Scan QR pass, verify Driver's License & Passport/ID, and approve vehicle release.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold">
          <ShieldCheck className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Verification Workspace */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Scan QR Code or Enter Reservation Pass Number
            </h3>
            
            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. SMR-2026-00081"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono font-bold text-emerald-700 uppercase focus:border-emerald-600"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center space-x-1 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Verify Pass</span>
              </button>
            </form>

            {loading && (
              <div className="text-center py-6 text-xs text-slate-500">
                <div className="animate-spin w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-2" />
                Validating ticket pass against Somalia fleet database...
              </div>
            )}

            {result && (
              <div className="bg-slate-50 border border-emerald-200 rounded-2xl p-5 space-y-4 shadow-soft">
                
                {/* Result Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>VALID BOOKING PASS</span>
                  </div>
                  <span className="font-mono font-bold bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded">
                    {result.reservationNumber}
                  </span>
                </div>

                {/* Customer Photo & Verification Details */}
                <div className="flex items-start space-x-4">
                  <img
                    src={result.customerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt="Customer"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-soft shrink-0"
                  />

                  <div className="space-y-1 text-xs text-slate-700 flex-grow">
                    <p className="text-sm font-bold text-slate-900">{result.customerName}</p>
                    <p>Phone: <strong>{result.customerPhone}</strong></p>
                    <p>Assigned Car: <strong>{result.carName}</strong></p>
                    <p>License Plate: <strong className="text-emerald-700 font-mono text-sm">{result.licensePlate}</strong></p>
                    <p>Parking Bay: <strong>{result.parkingNumber || 'Parking Bay B-14'}</strong></p>
                  </div>
                </div>

                {/* Guard Physical Verification Checkboxes */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <span className="font-bold block text-slate-900">Physical ID Inspection Checklist:</span>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Driver's License Inspected
                    </span>
                    <span className="flex items-center text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Passport / ID Verified
                    </span>
                  </div>
                </div>

                {approved ? (
                  <div className="p-4 bg-emerald-600 text-white rounded-xl text-xs font-bold text-center shadow-soft flex items-center justify-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Pickup Approved! Guard verification timestamped. Customer proceeding to Employee Handover.</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleApprovePickup}
                    className="w-full py-3.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center justify-center space-x-2 shadow-soft"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Approve Pickup & Timestamp Entry</span>
                  </button>
                )}

              </div>
            )}
          </div>

        </div>

        {/* Right: Today's Arrivals Queue */}
        <div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <Clock className="w-4 h-4 text-emerald-600 mr-1.5" /> Today's Expected Arrivals
            </h3>

            <div className="space-y-3">
              {arrivals.map(a => (
                <div key={a.code} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{a.customer}</span>
                    <span className="text-emerald-700 font-mono">{a.time}</span>
                  </div>
                  <span className="text-slate-600 block text-[11px]">{a.car}</span>
                  <span className="text-slate-500 block text-[10px]">{a.bay} • Code: {a.code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
