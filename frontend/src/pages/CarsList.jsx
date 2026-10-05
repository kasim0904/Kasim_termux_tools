import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, SlidersHorizontal, Car } from 'lucide-react';
import CarCard from '../components/CarCard';

export default function CarsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [search, setSearch] = useState('');
  const [transmission, setTransmission] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/cars?category=${category}&search=${search}&transmission=${transmission}&sortBy=${sortBy}`)
      .then(res => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [category, search, transmission, sortBy]);

  const categories = ['All', 'SUV', 'Sedan', 'Luxury', 'Pickup', 'Economy'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-black text-white tracking-tight">GoDrive Somalia Fleet Catalog</h1>
        <p className="text-xs text-slate-400">Browse fully inspected 4x4 SUVs, VIP Sedans, and Pickups in Mogadishu, Hargeisa & Garowe.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
              category === cat
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-glow-green'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat === 'All' ? 'All Fleet' : cat}
          </button>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search make, model, or plate (e.g. Land Cruiser)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Transmission */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500"
          >
            <option value="All">All Transmissions</option>
            <option value="Automatic">Automatic Transmission</option>
            <option value="Manual">Manual Transmission</option>
          </select>
        </div>

        {/* Sorting */}
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500"
          >
            <option value="rating">Highest Customer Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Cars Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto" />
          <p className="text-xs text-slate-400 mt-3">Loading Somalia fleet catalog...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
          <Car className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No vehicles found matching criteria</h3>
          <p className="text-xs text-slate-400">Try adjusting your category filter or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}

    </div>
  );
}
