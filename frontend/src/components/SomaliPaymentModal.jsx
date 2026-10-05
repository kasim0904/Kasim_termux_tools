import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Phone, Lock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SomaliPaymentModal({ amount, onPaymentSuccess, onClose }) {
  const [method, setMethod] = useState('PayPal'); // 'PayPal', 'Credit Card', 'EVC Plus'
  const [loading, setLoading] = useState(false);

  // Clean empty inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (err) {}
      onPaymentSuccess({
        paymentMethod: method,
        transactionRef: `${method.toUpperCase().replace(/\s+/g, '')}-TX-${Date.now().toString().slice(-6)}`,
        amount
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-[#0B132B] border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Secure Checkout</h3>
              <p className="text-xs text-slate-400">Total Due: <strong className="text-emerald-400">${amount?.toFixed(2)} USD</strong></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Method Selector */}
        <div>
          <label className="text-xs font-bold text-slate-300 mb-2 block uppercase tracking-wider">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            
            {/* PayPal */}
            <button
              type="button"
              onClick={() => setMethod('PayPal')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center ${
                method === 'PayPal'
                  ? 'bg-blue-500/10 border-blue-500 text-blue-400 font-bold shadow-glow-blue'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="text-sm font-black italic tracking-tighter text-blue-400">PayPal</span>
              <span className="text-[10px] text-slate-500">Global Express</span>
            </button>

            {/* Visa / MasterCard Credit Card */}
            <button
              type="button"
              onClick={() => setMethod('Credit Card')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center ${
                method === 'Credit Card'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-glow-green'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <CreditCard className="w-5 h-5 mb-0.5 text-emerald-400" />
              <span className="text-xs font-bold">Visa / Master</span>
            </button>

            {/* EVC Plus / Zaad */}
            <button
              type="button"
              onClick={() => setMethod('EVC Plus')}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center ${
                method === 'EVC Plus'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold shadow-glow-gold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Phone className="w-5 h-5 mb-0.5 text-amber-400" />
              <span className="text-xs font-bold">EVC / Zaad</span>
            </button>

          </div>
        </div>

        {/* Dynamic Payment Form */}
        <form onSubmit={handlePay} className="space-y-4">
          
          {/* PayPal */}
          {method === 'PayPal' && (
            <div className="bg-slate-950 rounded-2xl p-4 border border-blue-500/20 space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>PayPal Account Checkout</span>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Enter PayPal Email Address</label>
                <input
                  type="email"
                  required
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Credit Card */}
          {method === 'Credit Card' && (
            <div className="bg-slate-950 rounded-2xl p-4 border border-emerald-500/20 space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Card Number (Visa / MasterCard)</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Expiry Date (MM/YY)</label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">CVC / CVV</label>
                  <input
                    type="password"
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="123"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Somali Mobile */}
          {method === 'EVC Plus' && (
            <div className="bg-slate-950 rounded-2xl p-4 border border-amber-500/20 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
                <Phone className="w-4 h-4" />
                <span>EVC Plus (*770#) / Zaad (*880#) / Sahal (*899#)</span>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Enter Mobile Phone Number</label>
                <input
                  type="text"
                  required
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  placeholder="e.g. +252 61 XXX XXXX"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-emerald-300 shadow-glow-green transition flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="animate-spin w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full" />
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Authorize & Pay ${amount?.toFixed(2)} USD</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted & Bank-Grade Security</span>
          </div>

        </form>

      </div>
    </div>
  );
}
