import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, Tag, AlertCircle } from 'lucide-react';

export default function PriceCalculatorModal({ car, onClose }) {
  const [days, setDays] = useState(7);
  const [months, setMonths] = useState(0);

  // Dynamic Calculation logic
  const totalDays = months > 0 ? months * 30 : days;
  const isTooLong = totalDays > 120; // 4 months max

  let basePrice = 0;
  let discountPct = 0;

  if (totalDays >= 30) {
    const totalM = Math.floor(totalDays / 30);
    const remD = totalDays % 30;
    basePrice = (totalM * car.monthlyRate) + (remD * car.dailyRate);
    discountPct = 0.15;
  } else if (totalDays >= 7) {
    const totalW = Math.floor(totalDays / 7);
    const remD = totalDays % 7;
    basePrice = (totalW * car.weeklyRate) + (remD * car.dailyRate);
    discountPct = 0.10;
  } else {
    basePrice = totalDays * car.dailyRate;
  }

  const discount = basePrice * discountPct;
  const netRental = basePrice - discount;
  const insuranceFee = 25;
  const tax = netRental * 0.05;
  const deposit = 100;
  const totalAmount = netRental + insuranceFee + tax + deposit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Dynamic Price Calculator</h3>
              <p className="text-xs text-slate-400">{car.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 mb-2 block uppercase tracking-wider">
              Select Booking Duration
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Days ({days} Days)</span>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => {
                    setDays(Number(e.target.value));
                    setMonths(0);
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Long-Term Months ({months} Mo)</span>
                <select
                  value={months}
                  onChange={(e) => {
                    setMonths(Number(e.target.value));
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs font-bold text-slate-200 focus:border-emerald-500"
                >
                  <option value={0}>Standard Daily Rate</option>
                  <option value={1}>1 Month (30 Days - 15% Off)</option>
                  <option value={2}>2 Months (60 Days - 15% Off)</option>
                  <option value={3}>3 Months (90 Days - 15% Off)</option>
                  <option value={4}>4 Months (120 Days - Max)</option>
                </select>
              </div>
            </div>
          </div>

          {isTooLong && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Maximum initial booking duration is 4 months (120 days). For extensions, use the in-app rental renewal feature.</span>
            </div>
          )}

          {/* Breakdown Table */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Base Rate ({totalDays} Days)</span>
              <span className="font-bold text-white">${basePrice.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span className="flex items-center">
                  <Tag className="w-3.5 h-3.5 mr-1" /> Long-Term Discount ({(discountPct * 100).toFixed(0)}%)
                </span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-300">
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 mr-1" /> Comprehensive Insurance
              </span>
              <span>${insuranceFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Local Govt Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Refundable Security Deposit</span>
              <span>${deposit.toFixed(2)}</span>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400">${totalAmount.toFixed(2)}</span>
                <span className="text-[10px] text-slate-400 block">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
