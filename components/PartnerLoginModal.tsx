import React, { useState } from 'react';
import { X, Lock, Sun, ArrowRight } from 'lucide-react';
import type { AppTheme } from '../App';
import { APP_URL } from '../lib/api';

interface PartnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: AppTheme;
  /** Reason code sent back by the app after a failed sign-in (?partner_login=…). */
  failure?: string | null;
}

const FAILURES: Record<string, string> = {
  invalid: 'Wrong email or password.',
  missing: 'Enter your email and password.',
  busy: 'Too many attempts — wait a minute and try again.',
};

// A normal form post (not fetch) so the app sets its own session cookies and
// the browser lands straight inside the Tarang workspace.
const PartnerLoginModal: React.FC<PartnerLoginModalProps> = ({ isOpen, onClose, theme = 'orange', failure }) => {
  const isLight = theme === 'light';
  const isOrange = theme === 'orange';
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const returnTo = typeof window !== 'undefined' ? `${window.location.origin}/partners/tarang-solar` : '';
  const error = failure ? FAILURES[failure] ?? 'Sign-in failed — please try again.' : '';

  const inputClass = `w-full px-3.5 py-2.5 rounded-lg text-xs font-medium outline-none transition-all border ${
    isLight
      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319] focus:bg-white'
      : 'bg-white/5 border-white/15 text-white focus:border-[#db5319] focus:bg-white/10'
  }`;
  const labelClass = `block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300 border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-900/20'
            : isOrange
              ? 'bg-stone-950/95 border-amber-500/30 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
              : 'bg-zinc-950 border-white/10 text-white'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isLight ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' : 'text-white/50 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Close sign-in"
        >
          <X size={18} />
        </button>

        <div className="space-y-1.5 mb-6">
          <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#db5319] font-bold">
            <Sun size={12} />
            <span>Tarang Solar Workspace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight leading-none">Partner Login</h2>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-white/60'}`}>
            For Tarang Solar staff, channel partners and their executives. Use the account your office created for you.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">{error}</div>
        )}

        <form method="post" action={`${APP_URL}/login/gateway`} onSubmit={() => setSending(true)} className="space-y-4 text-left">
          <input type="hidden" name="return_to" value={returnTo} />
          <div>
            <label htmlFor="pl-email" className={labelClass}>Email</label>
            <input id="pl-email" name="email" type="email" required autoComplete="username" className={inputClass} />
          </div>
          <div>
            <label htmlFor="pl-password" className={labelClass}>Password</label>
            <input id="pl-password" name="password" type="password" required autoComplete="current-password" className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={sending}
            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all disabled:opacity-60 ${
              isOrange ? 'bg-[#db5319] text-white hover:bg-[#c24610]' : isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-black hover:bg-slate-200'
            }`}
          >
            <Lock size={12} />
            <span>{sending ? 'Signing in…' : 'Sign in'}</span>
            {!sending && <ArrowRight size={12} />}
          </button>
        </form>

        <p className={`mt-4 text-[10px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-white/50'}`}>
          No account yet? Accounts are issued by the Tarang Solar office — ask your owner or admin.
        </p>
      </div>
    </div>
  );
};

export default PartnerLoginModal;
