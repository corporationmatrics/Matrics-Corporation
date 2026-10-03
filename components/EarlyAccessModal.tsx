import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Store, Building2, Factory, Truck, Landmark, Sparkles } from 'lucide-react';
import type { AppTheme } from '../App';
import { LEAD_CONSENT_LABEL, submitLead } from '../lib/api';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: AppTheme;
}

const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ isOpen, onClose, theme = 'orange' }) => {
  const isLight = theme === 'light';
  const isOrange = theme === 'orange';

  const [formData, setFormData] = useState({
    name: '',
    businessType: 'Kirana Store / Retailer',
    town: 'Raipur',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.town.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!consent) {
      setError('Please tick the consent box so we can contact you.');
      return;
    }
    setError('');
    setSending(true);
    const failure = await submitLead({
      kind: 'EARLY_ACCESS',
      name: formData.name,
      phone: formData.phone,
      town: formData.town,
      organisation: formData.businessType,
      consent,
      website: honeypot,
    });
    setSending(false);
    if (failure) setError(failure);
    else setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      businessType: 'Kirana Store / Retailer',
      town: 'Raipur',
      phone: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300 border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-900/20'
            : isOrange
              ? 'bg-stone-950/95 border-amber-500/30 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
              : 'bg-zinc-950 border-white/10 text-white'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isLight 
              ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' 
              : 'text-white/50 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight">Early Access Registered</h3>
            <p className={`text-sm max-w-sm mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
              Thank you, <span className="font-semibold">{formData.name}</span>. Your registration for the <span className="font-semibold">{formData.town}</span> pilot corridor has been received. Our corridor onboarding officer will reach out via WhatsApp / phone at <span className="font-mono">{formData.phone}</span> shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  isOrange
                    ? 'bg-[#db5319] text-white hover:bg-[#c24610]'
                    : isLight
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-white text-black hover:bg-slate-200'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-1.5 mb-6">
              <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#db5319] font-bold">
                Pilot Corridor Onboarding
              </div>
              <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight leading-none">
                Get Early Access
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-white/60'}`}>
                Join the inaugural Matrics transaction cohort in Chhattisgarh. Limited merchant and distributor allocations.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                  Your Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Agrawal"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-medium outline-none transition-all border ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319] focus:bg-white'
                      : 'bg-white/5 border-white/15 text-white focus:border-[#db5319] focus:bg-white/10'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                    Business Type *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-medium outline-none transition-all border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319]'
                        : 'bg-stone-900 border-white/15 text-white focus:border-[#db5319]'
                    }`}
                  >
                    <option value="Kirana Store / Retailer">Kirana Store / Retailer</option>
                    <option value="Wholesaler / Distributor">Wholesaler / Distributor</option>
                    <option value="FMCG / Goods Manufacturer">Manufacturer / Producer</option>
                    <option value="Transporter / Fleet Operator">Transporter / Fleet</option>
                    <option value="Bank / NBFC Financial Partner">Financial Institution</option>
                    <option value="Solar / Energy Partner">Solar / Energy Partner</option>
                    <option value="Other">Other Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                    Town / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Raipur, Bilaspur, Durg"
                    value={formData.town}
                    onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-medium outline-none transition-all border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319] focus:bg-white'
                        : 'bg-white/5 border-white/15 text-white focus:border-[#db5319] focus:bg-white/10'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                  Phone Number (+91) *
                </label>
                <div className="flex">
                  <span className={`inline-flex items-center px-3 rounded-l-lg border-y border-l text-xs font-mono font-bold ${
                    isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-white/10 border-white/15 text-white/70'
                  }`}>
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className={`flex-1 px-3.5 py-2.5 rounded-r-lg text-xs font-mono font-medium outline-none transition-all border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319] focus:bg-white'
                        : 'bg-white/5 border-white/15 text-white focus:border-[#db5319] focus:bg-white/10'
                    }`}
                  />
                </div>
                <p className={`text-[10px] mt-1 ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
                  We respect your privacy. No promotional spam; strictly for corridor pilot access.
                </p>
              </div>

              {/* Honeypot for bots — hidden from people and screen readers */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)} className="hidden" name="website" />

              <label className={`flex items-start gap-2 text-[11px] leading-snug ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#db5319]" />
                <span>{LEAD_CONSENT_LABEL}</span>
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full py-3.5 rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-60 ${
                    isOrange
                      ? 'bg-white text-[#d85104] hover:bg-white/95 shadow-orange-950/40'
                      : isLight
                        ? 'bg-[#db5319] text-white hover:bg-[#c24610]'
                        : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  <span>{sending ? 'Sending…' : 'Submit Early Access Request'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarlyAccessModal;
