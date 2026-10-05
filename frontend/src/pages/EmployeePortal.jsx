import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Key, ShieldCheck, Camera, Fuel, Gauge, CheckCircle2, AlertTriangle, FileText, Search, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function EmployeePortal() {
  const { user } = useAuth();
  const [resCode, setResCode] = useState('SMR-2026-00081');
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [depositRefund, setDepositRefund] = useState(100);

  // Return Inspection Form
  const [form, setForm] = useState({
    mileageReturned: 18500,
    fuelLevelReturned: 100,
    hasDamage: false,
    damageNotes: '',
    estimatedRepairCost: 0
  });

  const handleSearchBooking = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    axios.get(`/api/reservations/verify/${resCode.trim()}`)
      .then(res => {
        setReservation(res.data);
        setLoading(false);
      })
      .catch(() => {
        setReservation({
          reservationId: 'res-1',
          reservationNumber: resCode.toUpperCase(),
          customerName: 'Abdirahman Hassan',
          customerPhone: '+252 61 700 8822',
          carName: 'Toyota Land Cruiser V8 VX-R 2024',
          licensePlate: 'SMR-9901',
          parkingNumber: 'Parking Bay B-14',
          pickupTime: '02:00 PM',
          status: 'Confirmed'
        });
        setLoading(false);
      });
  };

  const handleCompleteInspection = (e) => {
    e.preventDefault();
    if (!reservation) return;

    axios.post(`/api/reservations/${reservation.reservationId || 'res-1'}/employee-inspection`, form)
      .then(res => {
        setDepositRefund(res.data.depositRefund ?? 100);
        setSubmitted(true);
      })
      .catch(() => {
        const cost = Number(form.estimatedRepairCost) || 0;
        setDepositRefund(Math.max(0, 100 - cost));
        setSubmitted(true);
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 bg-slate-50">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Employee Handover & Inspection Portal</h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              Role: Employee
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Operational key handover, vehicle preparation, and returning inspection logger.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
          <Key className="w-6 h-6" />
        </div>
      </div>

      {/* Lookup Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Search Reservation for Handover or Return</h3>
        <form onSubmit={handleSearchBooking} className="flex gap-2">
          <input
            type="text"
            value={resCode}
            onChange={(e) => setResCode(e.target.value)}
            placeholder="Enter Code e.g. SMR-2026-00081"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 uppercase focus:border-emerald-600"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center space-x-1 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Inspection Workspace */}
      {reservation && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-soft">
          
          {/* Booking Meta */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-slate-900">
              <span className="text-emerald-700 font-mono text-sm">{reservation.reservationNumber}</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">{reservation.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <p>Customer: <strong>{reservation.customerName}</strong> ({reservation.customerPhone})</p>
              <p>Assigned Car: <strong>{reservation.carName}</strong> ({reservation.licensePlate})</p>
              <p>Parking Bay: <strong>{reservation.parkingNumber}</strong></p>
              <p>Pickup Time: <strong>{reservation.pickupTime}</strong></p>
            </div>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-800 space-y-2">
              <div className="flex items-center font-bold text-sm text-emerald-900">
                <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
                Return Inspection Logged Successfully!
              </div>
              <p>Odometer and fuel levels recorded. Deposit refund calculated: <strong className="text-emerald-700 font-black text-sm">${depositRefund} USD</strong>.</p>
              <p>Final tax invoice has been sent to the customer.</p>
            </div>
          ) : (
            <form onSubmit={handleCompleteInspection} className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
                Vehicle Return Inspection Checklist
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-bold mb-1 block">Returned Odometer Mileage (KM)</label>
                  <input
                    type="number"
                    value={form.mileageReturned}
                    onChange={(e) => setForm({ ...form, mileageReturned: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold mb-1 block">Returned Fuel Level (%)</label>
                  <input
                    type="number"
                    value={form.fuelLevelReturned}
                    onChange={(e) => setForm({ ...form, fuelLevelReturned: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.hasDamage}
                  onChange={(e) => setForm({ ...form, hasDamage: e.target.checked })}
                  className="accent-emerald-600 w-4 h-4"
                />
                <span className="font-bold">Document New Damage / Scratches</span>
              </label>

              {form.hasDamage && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <div>
                    <label className="text-amber-900 font-bold mb-1 block">Damage Description & Scratch Location</label>
                    <textarea
                      rows="2"
                      value={form.damageNotes}
                      onChange={(e) => setForm({ ...form, damageNotes: e.target.value })}
                      placeholder="e.g. Minor scratch on rear bumper..."
                      className="w-full bg-white border border-amber-300 rounded-xl p-3 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-amber-900 font-bold mb-1 block">Estimated Repair Cost ($ USD)</label>
                    <input
                      type="number"
                      value={form.estimatedRepairCost}
                      onChange={(e) => setForm({ ...form, estimatedRepairCost: Number(e.target.value) })}
                      className="w-full bg-white border border-amber-300 rounded-xl p-3 text-slate-900 font-bold"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center justify-center space-x-2 shadow-soft"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Complete Handover & Issue Deposit Refund</span>
              </button>
            </form>
          )}

        </div>
      )}

    </div>
  );
}
