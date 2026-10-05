import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Car, ShieldCheck, MapPin, Calendar, Search, Star, Award, CheckCircle2, ArrowRight, ShieldAlert, Zap, PhoneCall } from 'lucide-react';
import CarCard from '../components/CarCard';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [location, setLocation] = useState('Mogadishu Aden Adde Airport');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios.get('/api/cars')
      .then(res => setFeaturedCars(res.data.slice(0, 3)))
      .catch(() => {
        // Fallback static
        setFeaturedCars([
          {
            _id: 'car-1',
            name: 'Toyota Land Cruiser V8 VX-R 2024',
            make: 'Toyota',
            year: 2024,
            category: 'SUV',
            transmission: 'Automatic',
            fuelType: 'Diesel',
            seats: 7,
            dailyRate: 150,
            weeklyRate: 900,
            monthlyRate: 3200,
            location: 'Mogadishu Aden Adde Airport',
            rating: 4.95,
            reviewsCount: 28,
            licensePlate: 'SMR-9901',
            images: ['https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80']
          },
          {
            _id: 'car-2',
            name: 'Toyota Hilux GR Sport 4x4 Double Cab',
            make: 'Toyota',
            year: 2023,
            category: 'Pickup',
            transmission: 'Automatic',
            fuelType: 'Diesel',
            seats: 5,
            dailyRate: 110,
            weeklyRate: 650,
            monthlyRate: 2400,
            location: 'Hargeisa Egal Airport',
            rating: 4.88,
            reviewsCount: 19,
            licensePlate: 'SMR-5520',
            images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80']
          },
          {
            _id: 'car-3',
            name: 'Mercedes-Benz G63 AMG V8 Biturbo',
            make: 'Mercedes-Benz',
            year: 2024,
            category: 'Luxury',
            transmission: 'Automatic',
            fuelType: 'Petrol',
            seats: 5,
            dailyRate: 350,
            weeklyRate: 2200,
            monthlyRate: 7500,
            location: 'Mogadishu Aden Adde Airport',
            rating: 5.0,
            reviewsCount: 14,
            licensePlate: 'SMR-0001',
            images: ['https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80']
          }
        ]);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/cars?location=${encodeURIComponent(location)}&category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80"
            alt="GoDrive Somalia Hero"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-glow-green">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Commercial Car Rental System for Somalia</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            Drive With Security & Elegance Across <span className="gradient-text-green">Somalia</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Reserve premium armored & standard Land Cruiser V8s, Hilux 4x4 pickups, and luxury sedans with instant digital QR passes, 360° evidence inspection, and dynamic daily/weekly/monthly rates.
          </p>

          {/* Quick Search Widget */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
              
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block text-left flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Pickup Station
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Mogadishu Aden Adde Airport">Mogadishu Aden Adde Airport</option>
                  <option value="Hargeisa Egal Airport">Hargeisa Egal Airport</option>
                  <option value="Garowe Airport">Garowe Airport & City</option>
                  <option value="Kismayo Port">Kismayo Port & Downtown</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block text-left flex items-center">
                  <Car className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Vehicle Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="All">All Vehicles</option>
                  <option value="SUV">SUV & 4x4 Land Cruiser</option>
                  <option value="Pickup">Hilux 4WD Pickup</option>
                  <option value="Luxury">Luxury & VIP</option>
                  <option value="Sedan">Executive Sedan</option>
                  <option value="Economy">Economy</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block text-left flex items-center">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Booking Period
                </label>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-emerald-400 text-center">
                  1 Day to 4 Months
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-glow-green transition flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Fleet</span>
              </button>

            </form>
          </div>

        </div>

      </section>

      {/* Featured Fleet Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Premium Fleet</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Available Vehicles in Somalia</h2>
          </div>
          <Link
            to="/cars"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
          >
            <span>Browse Full Catalog ({featuredCars.length}+ Cars)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>

      {/* Key Somali Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Why GoDrive Somalia</span>
            <h2 className="text-3xl font-black text-white">Commercial Excellence & Security Built-In</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Digital Contract & QR Pass</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sign legal digital contracts online and receive an encrypted QR Boarding Pass (`SMR-2026-XXXXX`) for instant airport parking bay pickup.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">360° Video Evidence Upload</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload 360° walkaround videos and vehicle dashboard photos before driving off to guarantee transparent deposit refunds.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">PayPal, Visa & Somali Mobile</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamless checkout with PayPal, Credit Cards (Visa/Mastercard), as well as EVC Plus, Zaad, and Sahal mobile money.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Emergency Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900/60 via-slate-900 to-amber-900/60 border border-emerald-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start">
              <PhoneCall className="w-5 h-5 text-emerald-400 mr-2" />
              24/7 Security Escort & Roadside Support
            </h3>
            <p className="text-xs text-slate-300">
              Need armored vehicle escorts or emergency assistance in Mogadishu, Garowe, or Hargeisa?
            </p>
          </div>
          <a
            href="tel:+252615000000"
            className="px-6 py-3 rounded-2xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition shadow-glow-green shrink-0"
          >
            Call Dispatch: +252 61 500 0000
          </a>
        </div>
      </section>

    </div>
  );
}
