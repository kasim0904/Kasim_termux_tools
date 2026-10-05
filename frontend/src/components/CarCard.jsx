import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Users, Fuel, Gauge, Check, Info, Calculator, ArrowRight } from 'lucide-react';
import PriceCalculatorModal from './PriceCalculatorModal';

export default function CarCard({ car }) {
  const [showCalc, setShowCalc] = useState(false);

  return (
    <>
      <div className="group rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/50 overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between">
        
        {/* Car Cover */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={car.images?.[0] || 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80'}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-emerald-700 border border-emerald-200 shadow-sm">
              {car.category}
            </span>
            {car.location && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-900/80 text-white">
                📍 {car.location.split(' ')[0]}
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-white shadow-sm backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span>{car.rating || 4.9}</span>
              <span className="text-[10px] text-amber-100">({car.reviewsCount || 12})</span>
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-lg font-bold tracking-tight line-clamp-1 group-hover:text-emerald-300 transition">
              {car.name}
            </h3>
            <p className="text-xs text-slate-200">{car.year} • {car.licensePlate}</p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700">
            <div className="flex flex-col items-center justify-center p-1">
              <Gauge className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="font-semibold text-slate-900">{car.transmission}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 border-x border-slate-200">
              <Fuel className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="font-semibold text-slate-900">{car.fuelType}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1">
              <Users className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="font-semibold text-slate-900">{car.seats} Seats</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center text-emerald-700 font-medium">
              <Check className="w-3.5 h-3.5 mr-1" /> Dual AC & Bluetooth
            </span>
            <span className="flex items-center text-amber-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Insurance Active
            </span>
          </div>

          {/* Rates */}
          <div className="pt-2 border-t border-slate-200 flex items-end justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Rental Rates</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black text-emerald-600">${car.dailyRate}</span>
                <span className="text-xs text-slate-500">/day</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium block">
                ${car.weeklyRate}/wk • ${car.monthlyRate}/mo
              </span>
            </div>

            <button
              onClick={() => setShowCalc(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-amber-700 border border-slate-200 transition"
              title="Open Price Calculator"
            >
              <Calculator className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to={`/cars/${car._id}`}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-center bg-slate-100 text-slate-800 hover:bg-slate-200 transition flex items-center justify-center"
            >
              <Info className="w-4 h-4 mr-1.5" />
              View Details
            </Link>
            <Link
              to={`/booking/${car._id}`}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-center bg-emerald-600 text-white hover:bg-emerald-700 shadow-soft transition flex items-center justify-center"
            >
              Book Now
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

      </div>

      {showCalc && (
        <PriceCalculatorModal car={car} onClose={() => setShowCalc(false)} />
      )}
    </>
  );
}
