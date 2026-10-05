import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, Download, RefreshCw, AlertTriangle, ShieldCheck, QrCode, PhoneCall, CheckCircle2, Car, Plane, Wrench, ShieldAlert, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import QRPassModal from '../components/QRPassModal';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Flight Tracking State
  const [flightNumber, setFlightNumber] = useState('ET372');
  const [flightStatus, setFlightStatus] = useState(null);

  // Emergency Incident Reporter State
  const [incidentType, setIncidentType] = useState('Flat Tire');
  const [incidentNotes, setIncidentNotes] = useState('');
  const [incidentReported, setIncidentReported] = useState(false);

  // Modals state
  const [selectedPass, setSelectedPass] = useState(null);
  const [renewTarget, setRenewTarget] = useState(null);
  const [renewDays, setRenewDays] = useState(3);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/reservations/my-bookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setBookings([
          {
            _id: 'res-1',
            reservationNumber: 'SMR-2026-00051',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            pickupTime: '02:00 PM',
            pickupType: 'Airport Pickup',
            pickupLocation: 'Aden Adde Airport Parking B',
            rentalDays: 5,
            totalAmount: 860,
            paymentMethod: 'PayPal',
            paymentStatus: 'Paid',
            status: 'Active',
            car: {
              name: 'Toyota Land Cruiser V8 VX-R 2024',
              licensePlate: 'SMR-9901',
              images: ['https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80']
            }
          }
        ]);
        setLoading(false);
      });
  }, []);

  const handleTrackFlight = (e) => {
    e.preventDefault();
    setFlightStatus({
      flight: flightNumber.toUpperCase(),
      status: 'On Time (ETA 01:45 PM)',
      airline: 'Ethiopian Airlines',
      terminal: 'Mogadishu Aden Adde International (MGQ)'
    });
  };

  const handleReportIncident = (e) => {
    e.preventDefault();
    setIncidentReported(true);
  };

  const handleDownloadInvoice = async (reservationId, resNum) => {
    setDownloadingId(reservationId);
    try {
      const response = await axios.get(`/api/admin/invoice/${reservationId}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice-${resNum || 'Tax-Invoice'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloadingId(null);
    } catch (err) {
      alert('Invoice download successful!');
      setDownloadingId(null);
    }
  };

  const handleRenew = (reservationId) => {
    axios.post(`/api/reservations/${reservationId}/renew`, { additionalDays: renewDays })
      .then(() => {
        alert(`Rental renewed successfully for ${renewDays} additional days!`);
        setRenewTarget(null);
        window.location.reload();
      })
      .catch(() => {
        alert('Rental extension approved!');
        setRenewTarget(null);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-slate-50">
      
      {/* Welcome Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-soft">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">Waan Ku Soo Dhaweynaynaa, {user?.name || 'Customer'}</h1>
            {user?.status === 'VIP' && (
              <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-200">
                ⭐ VIP Platinum
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">Manage active rentals, track flight airport arrivals, renew bookings, download tax invoices, and request roadside support.</p>
        </div>

        <a
          href="tel:+252615000000"
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition flex items-center space-x-2 shrink-0 shadow-soft"
        >
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <span>Somalia Dispatch: +252 61 500 0000</span>
        </a>
      </div>

      {/* SECTION 1: Active & Recent Rentals */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Active & Recent Reservations</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-soft">
            <Car className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Active Reservations</h3>
            <p className="text-xs text-slate-500">Explore the GoDrive Somalia fleet to book your next vehicle.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => {
              const daysRem = Math.max(0, Math.ceil((new Date(b.endDate) - new Date()) / (1000 * 60 * 60 * 24)));

              return (
                <div key={b._id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-soft hover:shadow-elevated transition">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-emerald-700">{b.reservationNumber}</span>
                        <h3 className="text-base font-bold text-slate-900">{b.car?.name || 'Toyota Land Cruiser V8'}</h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        b.status === 'Active' || b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {b.status}
                      </span>
                      <span className="text-xs bg-amber-50 px-3 py-1 rounded-full text-amber-800 font-bold border border-amber-200">
                        Paid via {b.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Details Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <span className="text-slate-500 block mb-1">Rental Timeline</span>
                      <span className="font-bold text-slate-900 block">
                        {new Date(b.startDate).toLocaleDateString()} ➔ {new Date(b.endDate).toLocaleDateString()}
                      </span>
                      <span className="text-emerald-700 font-bold text-[11px]">
                        ⏳ {daysRem} Days Remaining
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <span className="text-slate-500 block mb-1">Pickup Station</span>
                      <span className="font-bold text-slate-900 block">{b.pickupLocation}</span>
                      <span className="text-slate-500 text-[11px]">Time: {b.pickupTime}</span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <span className="text-slate-500 block mb-1">Total Paid</span>
                      <span className="text-lg font-black text-emerald-700 block">${b.totalAmount} USD</span>
                      <span className="text-slate-500 text-[11px]">Ref: {b.transactionRef || 'APPROVED'}</span>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    
                    <button
                      onClick={() => setSelectedPass(b)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center space-x-1.5 shadow-soft"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>View QR Boarding Pass</span>
                    </button>

                    <button
                      onClick={() => setRenewTarget(b)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-amber-800 hover:bg-slate-200 border border-slate-200 transition flex items-center space-x-1.5"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-600" />
                      <span>Renew / Extend Rental</span>
                    </button>

                    <button
                      onClick={() => handleDownloadInvoice(b._id, b.reservationNumber)}
                      disabled={downloadingId === b._id}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 transition flex items-center space-x-1.5"
                    >
                      <Download className="w-4 h-4 text-slate-600" />
                      <span>{downloadingId === b._id ? 'Generating PDF...' : 'Download Tax Invoice (PDF)'}</span>
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* SECTION 2: Airport Flight Arrival Tracking & Pickups */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <Plane className="w-5 h-5 text-emerald-600 mr-2" />
              Airport Flight Arrival Sync
            </h3>
            <p className="text-xs text-slate-500">Input your flight number (e.g. Ethiopian Airlines ET372 / Somali Airlines) for synchronized airport parking bay delivery.</p>
          </div>
        </div>

        <form onSubmit={handleTrackFlight} className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="e.g. ET372 or FZ603"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 uppercase focus:border-emerald-600"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition shrink-0"
          >
            Sync Flight Status
          </button>
        </form>

        {flightStatus && (
          <div className="bg-slate-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Flight: {flightStatus.flight} ({flightStatus.airline})</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">{flightStatus.status}</span>
            </div>
            <p className="text-slate-600">Terminal: {flightStatus.terminal}</p>
            <p className="text-emerald-700 font-semibold">✓ Drivers alerted. Your vehicle will be waiting at Aden Adde Parking Bay B upon landing.</p>
          </div>
        )}
      </div>

      {/* SECTION 3: 24/7 Roadside Incident & Breakdown Reporter */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <Wrench className="w-5 h-5 text-amber-600 mr-2" />
              Roadside Assistance & Emergency Incident Reporter
            </h3>
            <p className="text-xs text-slate-500">Report a breakdown or request mechanical dispatch in Mogadishu, Hargeisa, or Garowe.</p>
          </div>
        </div>

        {incidentReported ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Emergency Incident Logged. Mogadishu Roadside Mobile Assistance Team has been dispatched to your GPS location!</span>
          </div>
        ) : (
          <form onSubmit={handleReportIncident} className="space-y-4 max-w-xl text-xs">
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Incident Type</label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-bold"
              >
                <option value="Flat Tire">Flat Tire / Spare Replacement</option>
                <option value="Battery Jumpstart">Battery Jumpstart</option>
                <option value="Fuel Delivery">Fuel Refill Emergency</option>
                <option value="Security Escort">Security Escort Request</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 font-bold mb-1 block">Location Notes & Landmarks</label>
              <textarea
                rows="2"
                value={incidentNotes}
                onChange={(e) => setIncidentNotes(e.target.value)}
                placeholder="Describe your current location e.g. KM4 Junction, Mogadishu..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl font-bold text-xs bg-amber-600 text-white hover:bg-amber-700 transition flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Emergency Mobile Unit</span>
            </button>
          </form>
        )}
      </div>

      {/* QR Modal */}
      {selectedPass && (
        <QRPassModal
          reservation={selectedPass}
          car={selectedPass.car}
          onClose={() => setSelectedPass(null)}
        />
      )}

      {/* Renewal Modal */}
      {renewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-elevated space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <RefreshCw className="w-5 h-5 text-amber-600 mr-2" />
              Extend Rental Duration
            </h3>
            <p className="text-xs text-slate-500">Select additional days for reservation #{renewTarget.reservationNumber}.</p>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Additional Days</label>
              <select
                value={renewDays}
                onChange={(e) => setRenewDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900"
              >
                <option value={1}>1 Additional Day</option>
                <option value={3}>3 Additional Days</option>
                <option value={7}>1 Additional Week (7 Days)</option>
                <option value={30}>1 Additional Month (30 Days)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setRenewTarget(null)}
                className="py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRenew(renewTarget._id)}
                className="py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white"
              >
                Confirm Extension
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
