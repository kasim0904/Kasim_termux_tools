import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, PenTool } from 'lucide-react';

export default function DigitalContractModal({ car, user, onAccept, onClose }) {
  const [signature, setSignature] = useState(user?.name || '');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed || !signature.trim()) return;
    onAccept(signature);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">GoDrive Somalia Rental Agreement</h3>
              <p className="text-xs text-slate-400">Digital Contract for Vehicle: {car?.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Terms Content */}
        <div className="overflow-y-auto bg-slate-950 rounded-2xl p-5 border border-slate-800 text-xs space-y-3 text-slate-300 leading-relaxed max-h-[50vh]">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
            Standard Terms & Conditions (Mogadishu, Hargeisa, Garowe, Kismayo)
          </h4>
          
          <p>
            <strong>1. Vehicle Operation & Security:</strong> The Renter ({user?.name || 'Customer'}) agrees to operate the vehicle solely within designated security zones in Somalia unless authorized in writing by GoDrive Somalia Management.
          </p>

          <p>
            <strong>2. Evidence & Inspection:</strong> Pre-drive 360° photo and dashboard fuel evidence must be submitted prior to departure from parking bay. The company agrees to refund security deposit ($100) upon return inspection clear of damage.
          </p>

          <p>
            <strong>3. Insurance & Exclusions:</strong> Comprehensive insurance covers accident collisions. Mechanical abuse, off-road racing, or un-verified drivers are excluded from insurance protection.
          </p>

          <p>
            <strong>4. Renewal & Late Returns:</strong> Late returns without prior renewal app approval incur a daily rate plus 20% administrative late fee.
          </p>

          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>This digital agreement is legally binding under Federal Republic of Somalia Transport Commercial Code 2026.</span>
          </div>
        </div>

        {/* Signature & Confirmation Form */}
        <form onSubmit={handleSubmit} className="space-y-4 shrink-0 pt-2 border-t border-slate-800">
          
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block flex items-center">
              <PenTool className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Digital Signature (Full Legal Name)
            </label>
            <input
              type="text"
              required
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="e.g. Abdirahman Hassan"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500 bg-slate-950 border-slate-800"
            />
            <span className="text-xs text-slate-300">
              I have read, understood, and accept the rental contract terms above.
            </span>
          </label>

          <button
            type="submit"
            disabled={!agreed || !signature.trim()}
            className="w-full py-3.5 rounded-xl font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition shadow-glow-green flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Sign & Accept Rental Agreement</span>
          </button>
        </form>

      </div>
    </div>
  );
}
