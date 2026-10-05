import React, { useState } from 'react';
import { X, Camera, Video, Fuel, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function EvidenceUploadModal({ reservation, onComplete, onClose }) {
  const [fuelLevel, setFuelLevel] = useState(100);
  const [videoUrl, setVideoUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-in-the-countryside-41551-large.mp4');
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  ]);
  const [dashboardPhoto, setDashboardPhoto] = useState('https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80');

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({
      fuelLevelPercentage: fuelLevel,
      video360: videoUrl,
      photos,
      dashboardPhoto
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pre-Drive Evidence Upload</h3>
              <p className="text-xs text-slate-400">Reservation #{reservation?.reservationNumber || 'SMR-2026-00051'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-300 text-xs flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Uploading photos & 360° video prior to pickup protects both customer and fleet company against false damage claims.</span>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Fuel Slider */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center">
                <Fuel className="w-4 h-4 text-emerald-400 mr-1" /> Initial Fuel Gauge Level
              </span>
              <span className="text-emerald-400 font-bold">{fuelLevel}% Full</span>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={fuelLevel}
              onChange={(e) => setFuelLevel(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* 360 Video Preview */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block flex items-center">
              <Video className="w-4 h-4 text-emerald-400 mr-1" /> 360° Walkaround Inspection Video
            </label>
            <div className="aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative">
              <video src={videoUrl} controls className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Video recorded and timestamped at Mogadishu Aden Adde Hub.</span>
          </div>

          {/* Exterior & Dashboard Photos */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block flex items-center">
              <Camera className="w-4 h-4 text-emerald-400 mr-1" /> Inspection Photos (Exterior 4-Sides + Dashboard)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((url, i) => (
                <div key={i} className="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
                  <img src={url} alt="inspection" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-slate-950/80 text-[10px] text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                    Angle #{i+1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition shadow-glow-green flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Confirm & Lock Pre-Drive Evidence</span>
          </button>
        </form>

      </div>
    </div>
  );
}
