import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ShieldCheck, Fuel, Gauge, Users, Check, ArrowRight, Video, Camera, Calendar, MapPin, Calculator, MessageSquare, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PriceCalculatorModal from '../components/PriceCalculatorModal';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [showCalc, setShowCalc] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery', 'interior', 'engine', 'video'

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      _id: 'rev-1',
      userName: 'Farah Abdi (Mogadishu)',
      rating: 5,
      comment: 'Extremely clean Toyota Land Cruiser V8. Picked it up directly at Aden Adde Airport Parking B with QR code pass in under 2 minutes!',
      date: '2 days ago'
    },
    {
      _id: 'rev-2',
      userName: 'Dr. Mohamed Nur (Hargeisa)',
      rating: 5,
      comment: 'Top tier service in Somalia. The pre-drive evidence upload made the deposit refund process seamless.',
      date: '1 week ago'
    }
  ]);

  useEffect(() => {
    axios.get(`/api/cars/${id}`)
      .then(res => {
        setCar(res.data);
        setActiveImg(res.data.images?.[0] || '');
      })
      .catch(() => {
        const fallback = {
          _id: id,
          name: 'Toyota Land Cruiser V8 VX-R 2024',
          make: 'Toyota',
          modelName: 'Land Cruiser V8 VX-R',
          year: 2024,
          category: 'SUV',
          transmission: 'Automatic',
          fuelType: 'Diesel',
          seats: 7,
          mileage: 12000,
          color: 'Pearl White',
          licensePlate: 'SMR-9901',
          dailyRate: 150,
          weeklyRate: 900,
          monthlyRate: 3200,
          location: 'Mogadishu Aden Adde Airport',
          rating: 4.95,
          reviewsCount: 34,
          insuranceStatus: 'Active',
          images: [
            'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
          ],
          interiorImages: [
            'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
          ],
          engineImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
          video360Url: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-in-the-countryside-41551-large.mp4',
          description: 'Armored-ready executive Land Cruiser V8 ideal for diplomatic missions, VIP travel, and all-terrain road journeys across Somalia.'
        };
        setCar(fallback);
        setActiveImg(fallback.images[0]);
      });
  }, [id]);

  const handleProceedToBooking = () => {
    if (!user) {
      alert('Please log in or create a customer account before booking a vehicle.');
      navigate('/auth');
      return;
    }
    navigate(`/booking/${car._id}`);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    const newRev = {
      _id: `rev-${Date.now()}`,
      userName: user?.name || 'Verified Customer',
      rating: reviewRating,
      comment: reviewComment,
      date: 'Just now'
    };
    setReviewsList([newRev, ...reviewsList]);
    setReviewComment('');
  };

  if (!car) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {car.category}
            </span>
            <span className="text-xs text-slate-400">📍 {car.location}</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1">{car.name}</h1>
          <p className="text-xs text-slate-400">License Plate: <strong className="text-slate-200">{car.licensePlate}</strong> • Year {car.year}</p>
        </div>

        {/* Pricing Summary & Action */}
        <div className="flex items-center space-x-4 bg-[#0B132B] border border-slate-800 p-4 rounded-3xl">
          <div>
            <span className="text-xs text-slate-400 block">Daily Rate</span>
            <span className="text-3xl font-black text-emerald-400">${car.dailyRate}</span>
            <span className="text-[10px] text-slate-400 block">${car.weeklyRate}/wk • ${car.monthlyRate}/mo</span>
          </div>
          <button
            onClick={handleProceedToBooking}
            className="px-6 py-3.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-glow-green transition flex items-center space-x-1.5"
          >
            <span>Proceed to Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery & Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Media Viewer */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Active Image or 360 Video Player */}
          <div className="aspect-[16/10] bg-[#080D1A] rounded-3xl overflow-hidden border border-slate-800 relative shadow-dreamy">
            {activeTab === 'video' ? (
              <div className="w-full h-full relative bg-slate-950 flex flex-col items-center justify-center">
                <video
                  src={car.video360Url || 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-in-the-countryside-41551-large.mp4'}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <img src={activeImg || car.images[0]} alt={car.name} className="w-full h-full object-cover" />
            )}

            {/* Media Tabs Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <button
                onClick={() => { setActiveTab('gallery'); setActiveImg(car.images[0]); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md transition ${
                  activeTab === 'gallery' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900/90 text-white border border-slate-800'
                }`}
              >
                Exterior ({car.images.length})
              </button>
              <button
                onClick={() => { setActiveTab('interior'); setActiveImg(car.interiorImages?.[0] || car.images[0]); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md transition ${
                  activeTab === 'interior' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900/90 text-white border border-slate-800'
                }`}
              >
                Interior ({car.interiorImages?.length || 1})
              </button>
              <button
                onClick={() => { setActiveTab('engine'); setActiveImg(car.engineImage || car.images[0]); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md transition ${
                  activeTab === 'engine' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900/90 text-white border border-slate-800'
                }`}
              >
                Engine View
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md transition flex items-center space-x-1 ${
                  activeTab === 'video' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/90 text-amber-300 border border-slate-800'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>360° Walkaround Video</span>
              </button>
            </div>
          </div>

          {/* Thumbnails Bar */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {car.images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setActiveTab('gallery'); setActiveImg(img); }}
                className={`w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                  activeImg === img && activeTab === 'gallery' ? 'border-emerald-500 scale-105 shadow-glow-green' : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* Right: Specs & Calculator */}
        <div className="space-y-6">
          
          <div className="bg-[#0B132B] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
              Vehicle Specifications
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Transmission</span>
                <span className="font-bold text-white flex items-center">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400 mr-1" /> {car.transmission}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Fuel Type</span>
                <span className="font-bold text-white flex items-center">
                  <Fuel className="w-3.5 h-3.5 text-emerald-400 mr-1" /> {car.fuelType}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Seating</span>
                <span className="font-bold text-white flex items-center">
                  <Users className="w-3.5 h-3.5 text-emerald-400 mr-1" /> {car.seats} Seats
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Odometer</span>
                <span className="font-bold text-white">{car.mileage?.toLocaleString()} KM</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
              <div className="flex items-center font-bold">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
                <span>Full Comprehensive Somalia Insurance</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Covers collision damage, theft protection, and 24/7 roadside dispatch.
              </p>
            </div>

            <button
              onClick={() => setShowCalc(true)}
              className="w-full py-3 rounded-xl font-bold text-xs bg-slate-900 text-amber-300 hover:bg-slate-800 border border-slate-700 transition flex items-center justify-center space-x-2"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Calculate 1 Day - 4 Month Rates</span>
            </button>
          </div>

        </div>

      </div>

      {/* Reviews */}
      <div className="bg-[#0B132B] border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center">
              <MessageSquare className="w-5 h-5 text-emerald-400 mr-2" />
              Customer Reviews ({reviewsList.length})
            </h3>
            <div className="flex items-center space-x-1 text-amber-400 text-sm mt-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold text-white">{car.rating} Out of 5.0 Rating</span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <div key={rev._id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{rev.userName}</span>
                <span className="text-slate-500">{rev.date}</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {showCalc && <PriceCalculatorModal car={car} onClose={() => setShowCalc(false)} />}
    </div>
  );
}
