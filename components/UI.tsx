import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Terminal, 
  Layers, 
  Radio, 
  ChevronRight, 
  ArrowUpRight, 
  Sun, 
  Moon, 
  Sparkles,
  Cpu,
  Truck,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Activity,
  ArrowDown,
  Store,
  CreditCard,
  FileCheck,
  Send,
  Boxes,
  Zap,
  Lock,
  Flame
} from 'lucide-react';
import type { AppTheme, AppView } from '../App';
import HowItWorks from './HowItWorks';
import PartnersSolar from './PartnersSolar';
import InvestorsView from './InvestorsView';
import Footer from './Footer';
import AppDownload from './AppDownload';
import EarlyAccessModal from './EarlyAccessModal';
import PartnerLoginModal from './PartnerLoginModal';
import LegalModal from './LegalModal';

interface UIProps {
  view: AppView;
  setView: (val: AppView) => void;
  theme?: AppTheme;
  setTheme?: React.Dispatch<React.SetStateAction<AppTheme>>;
}

interface AuditLog {
  id: string;
  time: string;
  type: 'ORDER_PLACED' | 'INVOICE_ISSUED' | 'DISPATCH_SENT' | 'DELIVERY_CONFIRMED' | 'PAYMENT_RECEIVED' | 'LEDGER_RECONCILED';
  description: string;
  actor: string;
  hash: string;
  color: string;
}

const UI: React.FC<UIProps> = ({ view, setView, theme = 'orange', setTheme }) => {
  const isLight = theme === 'light';
  const isOrange = theme === 'orange';
  const isDark = theme === 'dark';

  const [activePillar, setActivePillar] = useState(0);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const [partnerLoginOpen, setPartnerLoginOpen] = useState(false);
  const [partnerLoginFailure, setPartnerLoginFailure] = useState<string | null>(null);

  // The app sends a failed sign-in back here with ?partner_login=<reason>.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reason = params.get('partner_login');
    if (!reason) return;
    setPartnerLoginFailure(reason);
    setPartnerLoginOpen(true);
    params.delete('partner_login');
    const rest = params.toString();
    window.history.replaceState(window.history.state, '', window.location.pathname + (rest ? `?${rest}` : '') + window.location.hash);
  }, []);

  const openPartnerLogin = () => {
    setPartnerLoginFailure(null);
    setPartnerLoginOpen(true);
  };
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Demo data signal stream for Node Scan
  const [signals, setSignals] = useState<string[]>([
    "[DEMO] CORRIDOR_RAIPUR_01 · NODE_BOOTSTRAP_COMPLETE",
    "[DEMO] DISPATCH_HUB · E-WAY_BILL_VALIDATION_ACTIVE",
    "[DEMO] KIRANA_412 · SMART_KHATA_SYNCED",
    "[DEMO] BANK_GATEWAY · BBPS_SETTLEMENT_CLEARANCE_READY",
  ]);

  // Sample event stream for Network page
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const sampleEventsConfig = [
    {
      type: 'ORDER_PLACED' as const,
      description: 'Kirana #104 placed bulk purchase order for 24 FMCG crates',
      actor: 'Shree Sai Kirana (Raipur)',
      color: 'text-amber-400',
    },
    {
      type: 'INVOICE_ISSUED' as const,
      description: 'GST e-Invoice #INV-2026-9481 generated with digital seal',
      actor: 'Central CG Distributors (Durg)',
      color: 'text-blue-400',
    },
    {
      type: 'DISPATCH_SENT' as const,
      description: 'Vehicle CG-04-E-8819 loaded at Tatibandh warehouse hub',
      actor: 'Raipur Express Freight',
      color: 'text-[#db5319]',
    },
    {
      type: 'DELIVERY_CONFIRMED' as const,
      description: 'Store countertop e-POD authenticated via biometric OTP',
      actor: 'Kirana #104 Storefront',
      color: 'text-emerald-400',
    },
    {
      type: 'PAYMENT_RECEIVED' as const,
      description: 'UPI instant payment clearance into distributor escrow',
      actor: 'Partner Bank Rail (HDFC/ICICI)',
      color: 'text-cyan-400',
    },
    {
      type: 'LEDGER_RECONCILED' as const,
      description: 'Batch #8812 dual accounts balanced and zero-dispute sealed',
      actor: 'Matrics Reconciliation Engine',
      color: 'text-purple-400',
    },
  ];

  // Seed sample event stream
  useEffect(() => {
    const initialLogs: AuditLog[] = sampleEventsConfig.map((item, idx) => ({
      id: `evt-${Date.now()}-${idx}`,
      time: new Date(Date.now() - (5 - idx) * 35000).toLocaleTimeString([], { hour12: false }),
      hash: '0x' + Math.random().toString(16).substring(2, 10).toUpperCase() + '...',
      ...item,
    }));
    setAuditLogs(initialLogs);

    const interval = setInterval(() => {
      const randomEvent = sampleEventsConfig[Math.floor(Math.random() * sampleEventsConfig.length)];
      const newLog: AuditLog = {
        id: `evt-${Date.now()}-${Math.random()}`,
        time: new Date().toLocaleTimeString([], { hour12: false }),
        hash: '0x' + Math.random().toString(16).substring(2, 10).toUpperCase() + '...',
        ...randomEvent,
      };
      setAuditLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Update signals stream
  useEffect(() => {
    const signalTemplates = [
      "CORRIDOR_RAIPUR · TEMPO_FLEET_MANIFEST_LOCKED",
      "DISPATCH_HUB · E-POD_COUNTERTOP_SIGNATURE_CONFIRMED",
      "WHOLESALE_GRID · INVOICE_DISCOUNT_APPROVED_BY_PARTNER_BANK",
      "KIRANA_NETWORK · INVENTORY_REORDER_TRIGGERED",
      "LEDGER_RECONCILER · BATCH_SETTLEMENT_ZERO_DRIFT",
      "TARANG_SOLAR_NODE · 42.8_KWH_CLEAN_ENERGY_STREAMED"
    ];

    const interval = setInterval(() => {
      const newSignal = signalTemplates[Math.floor(Math.random() * signalTemplates.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour12: false });
      setSignals(prev => [...prev.slice(-8), `[${timestamp}] ${newSignal}`]);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Ecosystem modules (The 4 Layers of Matrics)
  const ecosystemPillars = [
    {
      title: "TRANSACTION LAYER",
      sub: "Single source of commercial truth",
      techTitle: "MATRICS UNIFIED TRANSACTION LAYER",
      desc: "Captures every trade event across manufacturers, distributors, and kirana stores into a single verifiable ledger. Replaces disparate paper challans, phone orders, and reconciliation delays with instant, verifiable commercial state.",
      Icon: Cpu,
      stats: [
        { label: "Settlement Latency", value: "<1.2s Verification", note: "ILLUSTRATIVE" },
        { label: "Ledger Integrity", value: "100% Cryptographic", note: "SECURED" },
        { label: "Reconciliation Drift", value: "0% Leakage", note: "BALANCED" }
      ],
    },
    {
      title: "PHYSICAL GRID",
      sub: "Zero-leakage transit & dispatch",
      techTitle: "REGIONAL LOGISTICS & DISPATCH MESH",
      desc: "Orchestrates regional fleet operators, tempo drivers, and hub runners into an intelligent delivery mesh. Tracks custody from warehouse loading docks directly to the retail counter with tamper-proof electronic Proof of Delivery (e-POD).",
      Icon: Truck,
      stats: [
        { label: "Empty Miles", value: "Minimised Hub Routing", note: "OPTIMIZED" },
        { label: "Delivery Assurance", value: "Digital e-POD", note: "VERIFIED" },
        { label: "Corridor Telemetry", value: "Live Route Checkpoints", note: "ILLUSTRATIVE" }
      ],
    },
    {
      title: "VALUE STREAM",
      sub: "Flow-based working capital",
      techTitle: "EMBEDDED TRADE FINANCE & CREDIT STREAM",
      desc: "Converts daily inventory velocity and verified invoices into instant creditworthiness. Kiranas and wholesalers access short-term working capital and inventory financing directly from regulated banking partners without real estate collateral.",
      Icon: Building2,
      stats: [
        { label: "Underwriting Basis", value: "Real-time Ledger Cashflow", note: "VERIFIED" },
        { label: "Working Capital Access", value: "On-Demand Credit Line", note: "PARTNER RAILS" },
        { label: "Settlement Rail", value: "Automated Bank Escrow", note: "SUB-SECOND" }
      ],
    },
    {
      title: "TRUST LAYER",
      sub: "Verifiable commercial reputation",
      techTitle: "CRYPTOGRAPHIC MERCHANT IDENTITY & AUDIT REGISTRY",
      desc: "Establishes a unified, verifiable digital identity for every kirana merchant, distributor, and transporter. Generates a transparent track record of fulfilled orders and on-time settlements, eliminating informal counterparty risk.",
      Icon: ShieldCheck,
      stats: [
        { label: "Identity Standard", value: "Multi-tier KYC / GST", note: "STANDARDIZED" },
        { label: "Audit Trace", value: "100% Immutable Lineage", note: "TAMPER-PROOF" },
        { label: "Merchant Score", value: "Corridor Trust Index", note: "OBJECTIVE" }
      ],
    }
  ];

  // Rollout stages for Network view
  const rolloutStages = [
    {
      stage: 'Stage 01',
      name: 'Core Corridor Pilot',
      region: 'Raipur & Durg Industrial-Retail Cluster',
      target: '150 Kiranas + 20 Wholesale Distributors',
      status: 'Current Deployment',
      badgeColor: 'text-[#db5319] border-[#db5319]',
    },
    {
      stage: 'Stage 02',
      name: 'State Grid Expansion',
      region: 'Bilaspur, Korba & Rajnandgaon Hubs',
      target: '1,200+ Retailers & Multi-Category Transporters',
      status: 'Q1 Corridor Phase',
      badgeColor: 'text-amber-400 border-amber-400/40',
    },
    {
      stage: 'Stage 03',
      name: 'Central India Transit Mesh',
      region: 'Inter-State Corridors (MP, Odisha, Maharashtra)',
      target: 'Cross-Border FMCG & Cement Freight Clusters',
      status: 'Expansion Phase',
      badgeColor: 'text-blue-400 border-blue-400/40',
    },
    {
      stage: 'Stage 04',
      name: 'Pan-Bharat Commerce Mesh',
      region: 'National Multi-Modal Freight & Bank Syndicates',
      target: 'Open Tier-2/3 Retail & Institutional Liquidity',
      status: 'Strategic Horizon',
      badgeColor: 'text-emerald-400 border-emerald-400/40',
    },
  ];

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative z-[100] w-full min-h-screen flex flex-col font-light transition-colors duration-500 ${
      isLight ? 'text-slate-900' : 'text-white'
    }`}>
      
      {/* ========================================================================= */}
      {/* GLOBAL HEADER: Clean 3-Zone Contract */}
      {/* Zone 1: Brand title | Zone 2: Nav links | Zone 3: Actions */}
      {/* ========================================================================= */}
      <header className={`sticky top-0 w-full z-[300] backdrop-blur-xl border-b transition-all duration-300 ${
        isLight 
          ? 'bg-white/90 border-slate-200/90 shadow-sm' 
          : isOrange
            ? 'bg-stone-950/70 border-white/10 shadow-lg'
            : 'bg-[#0a0500]/80 border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center justify-between">
          
          {/* Zone 1: Single Brand Element */}
          <button 
            onClick={() => setView('landing')} 
            className="flex items-center space-x-3 text-left group"
          >
            <span className={`text-2xl sm:text-3xl font-black italic tracking-tighter transition-transform duration-300 group-hover:scale-105 ${
              isOrange ? 'text-white' : 'text-[#db5319]'
            }`}>
              Matrics
            </span>
            <span className={`hidden sm:inline text-[10px] font-mono uppercase tracking-[0.3em] font-bold ${
              isLight ? 'text-slate-500' : 'text-white/60'
            }`}>
              Tarang
            </span>
          </button>

          {/* Zone 2: 4 Clean Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10 text-[10px] uppercase font-bold tracking-[0.25em]">
            <button 
              onClick={() => setView('ecosystem')} 
              className={`transition-all pb-1 ${
                view === 'ecosystem' 
                  ? 'text-[#db5319] border-b-2 border-[#db5319]' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
              }`}
            >
              Ecosystem
            </button>
            <button 
              onClick={() => setView('network')} 
              className={`transition-all pb-1 ${
                view === 'network' 
                  ? 'text-[#db5319] border-b-2 border-[#db5319]' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
              }`}
            >
              Network
            </button>
            <button 
              onClick={() => setView('partners')} 
              className={`transition-all pb-1 ${
                view === 'partners' 
                  ? 'text-[#db5319] border-b-2 border-[#db5319]' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
              }`}
            >
              Partners
            </button>
            <button 
              onClick={() => setView('investors')} 
              className={`transition-all pb-1 ${
                view === 'investors' 
                  ? 'text-[#db5319] border-b-2 border-[#db5319]' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
              }`}
            >
              Investors
            </button>
            <button 
              onClick={() => setView('app')} 
              className={`transition-all pb-1 ${
                view === 'app' 
                  ? 'text-[#db5319] border-b-2 border-[#db5319]' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
              }`}
            >
              App
            </button>
          </nav>

          {/* Zone 3: Actions (Theme switcher + GET EARLY ACCESS button) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Staff & channel-partner login (case-management app) */}
            <button
              onClick={openPartnerLogin}
              className={`hidden lg:inline whitespace-nowrap text-[10px] uppercase tracking-[0.2em] font-bold ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'}`}
            >
              Partner login
            </button>
            {setTheme && (
              <div className={`flex items-center p-1 rounded-full border ${
                isLight 
                  ? 'border-slate-200 bg-slate-100/80' 
                  : isOrange
                    ? 'border-white/20 bg-black/40'
                    : 'border-white/15 bg-white/5'
              }`}>
                <button
                  onClick={() => setTheme('orange')}
                  title="Orange Studio Theme"
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                    isOrange 
                      ? 'bg-white text-[#d85104] shadow-sm' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Sparkles size={10} className={isOrange ? 'text-[#d85104]' : 'text-amber-300'} />
                  <span className="hidden sm:inline">Studio</span>
                </button>
                <button
                  onClick={() => setTheme('light')}
                  title="Light Theme"
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                    isLight 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Sun size={10} className={isLight ? 'text-amber-400' : ''} />
                  <span className="hidden sm:inline">Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  title="Dark Theme"
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                    isDark 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Moon size={10} className={isDark ? 'text-amber-400' : ''} />
                  <span className="hidden sm:inline">Dark</span>
                </button>
              </div>
            )}

            {/* GET EARLY ACCESS Button */}
            <button 
              onClick={() => setEarlyAccessOpen(true)}
              className={`px-4 sm:px-5 py-2 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-black transition-all shadow-md whitespace-nowrap ${
                isOrange
                  ? 'bg-white text-[#d85104] hover:bg-white/90'
                  : isLight
                    ? 'bg-[#db5319] text-white hover:bg-[#c44510]'
                    : 'bg-white text-black hover:bg-slate-200'
              }`}
            >
              Get Early Access
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-white/10 text-[9px] uppercase font-bold tracking-widest">
          <button 
            onClick={() => setView('ecosystem')} 
            className={view === 'ecosystem' ? 'text-[#db5319]' : isLight ? 'text-slate-600' : 'text-white/70'}
          >
            Ecosystem
          </button>
          <button 
            onClick={() => setView('network')} 
            className={view === 'network' ? 'text-[#db5319]' : isLight ? 'text-slate-600' : 'text-white/70'}
          >
            Network
          </button>
          <button 
            onClick={() => setView('partners')} 
            className={view === 'partners' ? 'text-[#db5319]' : isLight ? 'text-slate-600' : 'text-white/70'}
          >
            Partners
          </button>
          <button 
            onClick={() => setView('investors')} 
            className={view === 'investors' ? 'text-[#db5319]' : isLight ? 'text-slate-600' : 'text-white/70'}
          >
            Investors
          </button>
          <button 
            onClick={() => setView('app')} 
            className={view === 'app' ? 'text-[#db5319]' : isLight ? 'text-slate-600' : 'text-white/70'}
          >
            App
          </button>
          <button onClick={openPartnerLogin} className={isLight ? 'text-slate-600' : 'text-white/70'}>Partner login</button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTENT CONTAINER */}
      {/* ========================================================================= */}
      <main className="relative flex-1 flex flex-col">
        
        {/* ======================================================================= */}
        {/* VIEW 1: LANDING HERO + HOW IT WORKS */}
        {/* ======================================================================= */}
        {view === 'landing' && (
          <div className="w-full flex flex-col pointer-events-none">
            {/* HERO SECTION */}
            <section className="min-h-[85vh] flex items-end xl:items-center justify-center xl:justify-end px-4 sm:px-8 xl:px-24 pt-[44vh] pb-12 xl:py-12">
              <div className="w-full max-w-3xl space-y-6 sm:space-y-8 text-center xl:text-right flex flex-col items-center xl:items-end z-20 pointer-events-auto">
                
                {/* Title */}
                <h1 className="font-black tracking-tighter leading-[0.95] italic uppercase flex flex-col items-center xl:items-end">
                  <span className={`text-2xl sm:text-3xl xl:text-[2.2vw] ${
                    isLight ? 'text-slate-900' : 'text-white font-semibold'
                  }`}>
                    Recoding The DNA Of
                  </span>
                  <span className={`text-3xl sm:text-4xl xl:text-[3vw] ${
                    isLight ? 'text-slate-400 font-bold' : isOrange ? 'text-white/85' : 'text-white/40'
                  }`}>
                    Global Commerce
                  </span>
                  <span className={`text-[2.6rem] sm:text-6xl xl:text-[4.5vw] sm:whitespace-nowrap mt-1 ${
                    isOrange 
                      ? 'text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.3)]' 
                      : 'text-[#db5319]'
                  }`}>
                    Matrics Corporation
                  </span>
                </h1>

                {/* Subhead exactly as required */}
                <p className={`text-base sm:text-lg lg:text-xl font-bold max-w-xl leading-snug ${
                  isLight ? 'text-slate-800' : isOrange ? 'text-white' : 'text-white'
                }`}>
                  The unified transaction layer and logistics nervous system for Indian commerce.
                </p>

                {/* Support line exactly as required */}
                <p className={`text-xs sm:text-sm lg:text-base max-w-lg font-normal leading-relaxed ${
                  isLight ? 'text-slate-600' : isOrange ? 'text-white/90' : 'text-white/70'
                }`}>
                  Built for real commerce across tier-2, tier-3, and rural India — turning daily order, delivery, and payment flows into verified digital trust.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                  {/* Secondary Link: SEE HOW IT WORKS */}
                  <button 
                    onClick={handleScrollToHowItWorks}
                    className={`flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-black transition-colors group cursor-pointer ${
                      isLight ? 'text-slate-700 hover:text-[#db5319]' : isOrange ? 'text-white hover:text-amber-200' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>See How It Works</span>
                    <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                  </button>

                  {/* Primary CTA */}
                  <button 
                    onClick={() => setView('ecosystem')} 
                    className={`px-8 lg:px-10 py-4 font-black uppercase tracking-[0.25em] text-xs transition-all shadow-xl hover:scale-105 active:scale-95 ${
                      isOrange
                        ? 'bg-white text-[#d85104] hover:bg-white/95 shadow-orange-950/40'
                        : 'bg-[#db5319] text-white hover:bg-[#c44510] shadow-[0_15px_35px_rgba(219,83,25,0.35)]'
                    }`}
                  >
                    Discover Ecosystem
                  </button>
                  <button 
                    onClick={() => setView('app')} 
                    className={`px-8 lg:px-10 py-4 font-black uppercase tracking-[0.25em] text-xs transition-all shadow-xl hover:scale-105 active:scale-95 border ${
                      isOrange
                        ? 'border-white/60 text-white hover:bg-white/10'
                        : 'border-[#db5319] text-[#db5319] hover:bg-[#db5319]/10'
                    }`}
                  >
                    Get the app
                  </button>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS SECTION (Item 3) */}
            <HowItWorks 
              theme={theme} 
              onOpenEarlyAccess={() => setEarlyAccessOpen(true)} 
            />
          </div>
        )}

        {/* ======================================================================= */}
        {/* VIEW 2: ECOSYSTEM (Item 4) */}
        {/* ======================================================================= */}
        {view === 'ecosystem' && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-6 pointer-events-auto">
            
            {/* View Header */}
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setView('landing')} 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isLight 
                      ? 'border-slate-300 bg-white text-slate-700 hover:bg-[#db5319] hover:text-white' 
                      : 'border-white/15 text-white hover:bg-[#db5319] hover:text-white'
                  }`}
                  aria-label="Back to home"
                >
                  <ArrowLeft size={15} />
                </button>
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-black italic uppercase tracking-tighter leading-none ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Commercial Ecosystem
                  </h2>
                  {/* Replaced with exact required label */}
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#db5319] font-black mt-1">
                    FOUR LAYERS · ONE NERVOUS SYSTEM FOR COMMERCE
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-[9px] font-mono text-[#db5319] font-bold">
                CENTRAL CHHATTISGARH CORRIDOR ARCHITECTURE
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Sidebar: Module Selectors */}
              <div className="lg:col-span-4 flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  {ecosystemPillars.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePillar(i)}
                      className={`relative w-full text-left transition-all duration-300 flex flex-col rounded-xl p-3.5 sm:p-4 border ${
                        activePillar === i 
                          ? 'bg-[#db5319] border-[#db5319] text-white shadow-lg' 
                          : isLight 
                            ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800' 
                            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center space-x-3">
                          {React.createElement(p.Icon, { 
                            size: 16, 
                            className: activePillar === i ? 'text-white' : 'text-[#db5319]' 
                          })}
                          <div>
                            <div className="text-[10px] sm:text-xs uppercase tracking-wider font-black leading-tight">
                              {p.title}
                            </div>
                            <div className={`text-[9px] uppercase mt-0.5 ${
                              activePillar === i ? 'text-white/90 font-medium' : isLight ? 'text-slate-500' : 'text-white/60'
                            }`}>
                              {p.sub}
                            </div>
                          </div>
                        </div>
                        {activePillar === i && <ChevronRight size={14} className="animate-pulse" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Node Scan Panel: Labeled DEMO DATA · ILLUSTRATIVE (Item 4) */}
                <div className={`p-4 rounded-xl border flex flex-col space-y-2 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-stone-950/60 border-white/10 text-white'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center space-x-2 text-[8px] font-mono font-bold uppercase tracking-widest text-[#db5319]">
                      <Radio size={10} className="animate-ping" />
                      <span>Node Scan</span>
                    </div>
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-[#db5319]/15 text-[#db5319] font-bold">
                      DEMO DATA · ILLUSTRATIVE
                    </span>
                  </div>
                  <div className={`font-mono text-[8px] space-y-1.5 overflow-hidden ${
                    isLight ? 'text-slate-600' : 'text-white/60'
                  }`}>
                    {signals.map((sig, idx) => (
                      <div key={idx} className="truncate border-l-2 border-[#db5319]/50 pl-2 py-0.5">
                        {sig}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detail Panel */}
              <div className={`lg:col-span-8 p-6 sm:p-10 rounded-2xl border flex flex-col justify-between space-y-6 shadow-2xl relative ${
                isLight 
                  ? 'bg-white border-slate-200 text-slate-900' 
                  : isOrange
                    ? 'bg-stone-950/80 border-white/15 text-white'
                    : 'bg-zinc-950/80 border-white/10 text-white'
              }`}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#db5319]/15 text-[#db5319] font-bold">
                      LAYER 0{activePillar + 1} SPECIFICATION
                    </span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-[9px] font-mono opacity-50 uppercase">
                      ENTERPRISE READY
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tight leading-tight">
                      {ecosystemPillars[activePillar].techTitle}
                    </h3>
                    <p className={`text-xs sm:text-base leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-white/80'
                    }`}>
                      {ecosystemPillars[activePillar].desc}
                    </p>
                  </div>

                  {/* Bullet Stats with ILLUSTRATIVE labels */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    {ecosystemPillars[activePillar].stats.map((s, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[8px] uppercase tracking-wider font-bold ${
                            isLight ? 'text-slate-500' : 'text-white/50'
                          }`}>
                            {s.label}
                          </span>
                          <span className="text-[7px] font-mono text-[#db5319] font-bold">
                            {s.note}
                          </span>
                        </div>
                        <div className="text-lg sm:text-xl font-black italic">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button 
                    onClick={() => setEarlyAccessOpen(true)}
                    className={`px-8 py-3.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                      isOrange
                        ? 'bg-white text-[#d85104] hover:bg-white/95'
                        : isLight
                          ? 'bg-[#db5319] text-white hover:bg-[#c24610]'
                          : 'bg-white text-black hover:bg-slate-200'
                    }`}
                  >
                    Request Corridor Integration
                  </button>

                  <button 
                    onClick={() => setView('network')}
                    className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#db5319] hover:underline"
                  >
                    <span>View Network Telemetry →</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* VIEW 3: NETWORK (Item 5 - Renamed from Quantum) */}
        {/* ======================================================================= */}
        {view === 'network' && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-6 pointer-events-auto">
            
            {/* View Header */}
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setView('landing')} 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isLight 
                      ? 'border-slate-300 bg-white text-slate-700 hover:bg-[#db5319] hover:text-white' 
                      : 'border-white/15 text-white hover:bg-[#db5319] hover:text-white'
                  }`}
                  aria-label="Back to home"
                >
                  <ArrowLeft size={15} />
                </button>
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-black italic uppercase tracking-tighter leading-none ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Network Pulse & Audit
                  </h2>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#db5319] font-black mt-1">
                    CORRIDOR TELEMETRY · CHHATTISGARH PILOT
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-[9px] font-mono text-[#db5319] font-bold">
                EVENT SPECIFICATION v4.2
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: NETWORK PULSE PANEL (Item 5) */}
              <div className="lg:col-span-4 flex flex-col space-y-4">
                
                {/* NETWORK PULSE with three counters showing "Pilot opening soon" */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 shadow-xl ${
                  isLight ? 'bg-white border-slate-200' : 'bg-stone-950/80 border-white/15 text-white'
                }`}>
                  <div className="flex items-center justify-between border-b pb-3 border-white/10">
                    <div className="flex items-center space-x-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#db5319]">
                      <Activity size={14} className="animate-pulse" />
                      <span>Network Pulse</span>
                    </div>
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                      LIVE RADAR
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Counter 1: Businesses Connected */}
                    <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className={`text-[9px] uppercase tracking-wider font-bold mb-1 ${
                        isLight ? 'text-slate-500' : 'text-white/60'
                      }`}>
                        Businesses Connected
                      </div>
                      <div className="text-xl sm:text-2xl font-black italic text-[#db5319]">
                        Pilot opening soon
                      </div>
                      <div className={`text-[9px] mt-0.5 ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
                        Raipur & Durg pilot allocations in progress
                      </div>
                    </div>

                    {/* Counter 2: Transactions This Month */}
                    <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className={`text-[9px] uppercase tracking-wider font-bold mb-1 ${
                        isLight ? 'text-slate-500' : 'text-white/60'
                      }`}>
                        Transactions This Month
                      </div>
                      <div className="text-xl sm:text-2xl font-black italic text-[#db5319]">
                        Pilot opening soon
                      </div>
                      <div className={`text-[9px] mt-0.5 ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
                        Sandbox test run complete (SAMPLE STREAM AT RIGHT)
                      </div>
                    </div>

                    {/* Counter 3: Towns Covered */}
                    <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className={`text-[9px] uppercase tracking-wider font-bold mb-1 ${
                        isLight ? 'text-slate-500' : 'text-white/60'
                      }`}>
                        Towns Covered
                      </div>
                      <div className="text-xl sm:text-2xl font-black italic text-[#db5319]">
                        Pilot opening soon
                      </div>
                      <div className={`text-[9px] mt-0.5 ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
                        Initial launch corridor: Raipur, Durg, Bhilai
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setEarlyAccessOpen(true)}
                      className={`w-full py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                        isOrange
                          ? 'bg-white text-[#d85104] hover:bg-white/95'
                          : isLight
                            ? 'bg-[#db5319] text-white hover:bg-[#c24610]'
                            : 'bg-white text-black hover:bg-slate-200'
                      }`}
                    >
                      Apply For Pilot Corridor
                    </button>
                  </div>
                </div>

                {/* Corridor Status Card */}
                <div className={`p-4 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-black/40 border-white/10 text-white'
                }`}>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-[#db5319] font-bold mb-1">
                    Corridor Anchor
                  </div>
                  <div className="text-xs font-bold">Raipur Central Wholesale Market</div>
                  <p className={`text-[10px] mt-1 leading-snug ${isLight ? 'text-slate-500' : 'text-white/60'}`}>
                    High-density FMCG, grain, and building materials corridor linking 1,500+ local retail outlets to 40 primary distributors.
                  </p>
                </div>
              </div>

              {/* Center Column: SAMPLE EVENT STREAM · ILLUSTRATIVE (Item 5) */}
              <div className={`lg:col-span-5 rounded-2xl border flex flex-col shadow-2xl overflow-hidden ${
                isLight ? 'bg-slate-950 text-white border-slate-800' : 'bg-black/90 text-white border-white/15'
              }`}>
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center space-x-2.5">
                    <Terminal size={14} className="text-[#db5319]" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#db5319]">
                      SAMPLE EVENT STREAM · ILLUSTRATIVE
                    </span>
                  </div>
                  <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                    6 EVENT TYPES
                  </span>
                </div>

                {/* Audit Stream List */}
                <div className="flex-1 p-4 sm:p-6 font-mono text-[10px] space-y-3 overflow-y-auto max-h-[520px]">
                  {auditLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="p-3 rounded-lg border border-white/5 bg-white/[0.02] space-y-1.5 transition-all hover:border-[#db5319]/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-black text-xs ${log.color}`}>
                          {log.type}
                        </span>
                        <span className="text-white/40 text-[9px]">{log.time}</span>
                      </div>
                      <div className="text-white/80 text-[10px] leading-snug">
                        {log.description}
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[8px] text-white/40">
                        <span>Actor: {log.actor}</span>
                        <span className="text-white/30">{log.hash}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-white/10 bg-white/[0.01] text-center text-[9px] font-mono text-white/40">
                  ALL STREAM DATA GENERATED FOR ILLUSTRATIVE CORRIDOR DEMO
                </div>
              </div>

              {/* Right Column: Four Rollout Stages & Investor Enquiries (Item 5) */}
              <div className="lg:col-span-3 flex flex-col space-y-4">
                
                {/* Four Rollout Stages */}
                <div className={`p-6 rounded-2xl border flex flex-col space-y-4 shadow-xl ${
                  isLight ? 'bg-white border-slate-200' : 'bg-stone-950/80 border-white/15 text-white'
                }`}>
                  <div className="flex items-center justify-between border-b pb-2 border-white/10">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#db5319]">
                      Corridor Rollout Stages
                    </span>
                    <span className="text-[8px] font-mono opacity-50">ROADMAP</span>
                  </div>

                  <div className="space-y-3.5">
                    {rolloutStages.map((stage, i) => (
                      <div 
                        key={i}
                        className={`p-3 rounded-lg border transition-all ${
                          i === 0 
                            ? 'border-[#db5319]/50 bg-[#db5319]/5' 
                            : 'border-white/10 bg-white/[0.01]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-black text-[#db5319]">
                            {stage.stage}
                          </span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${stage.badgeColor}`}>
                            {stage.status}
                          </span>
                        </div>
                        <div className="text-xs font-black uppercase tracking-tight">
                          {stage.name}
                        </div>
                        <div className={`text-[10px] font-medium mt-0.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                          {stage.region}
                        </div>
                        <div className={`text-[9px] mt-1 ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
                          {stage.target}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Replaced "INVEST IN PROTOCOL" with "INVESTOR ENQUIRIES" linking to Investors page */}
                <button
                  onClick={() => setView('investors')}
                  className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 ${
                    isOrange
                      ? 'bg-white text-[#d85104] hover:bg-white/95'
                      : isLight
                        ? 'bg-[#db5319] text-white hover:bg-[#c24610]'
                        : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  <span>Investor Enquiries</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* VIEW 4: PARTNERS (TARANG SOLAR) (Item 7) */}
        {/* ======================================================================= */}
        {view === 'partners' && (
          <PartnersSolar 
            theme={theme} 
            onOpenEarlyAccess={() => setEarlyAccessOpen(true)} 
            onOpenPartnerLogin={openPartnerLogin}
          />
        )}

        {/* ======================================================================= */}
        {/* VIEW 5: INVESTORS (Item 6) */}
        {/* ======================================================================= */}
        {view === 'investors' && (
          <InvestorsView 
            theme={theme} 
          />
        )}

        {/* VIEW 6: THE APP (download page for shops and reviewers) */}
        {view === 'app' && (
          <AppDownload theme={theme} />
        )}

      </main>

      {/* ========================================================================= */}
      {/* UNIVERSAL FOOTER ON EVERY PAGE (Item 8) */}
      {/* ========================================================================= */}
      <Footer 
        theme={theme}
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
        onOpenEarlyAccess={() => setEarlyAccessOpen(true)}
      />

      {/* Early Access Modal Form (Item 1) */}
      <EarlyAccessModal 
        isOpen={earlyAccessOpen}
        onClose={() => setEarlyAccessOpen(false)}
        theme={theme}
      />

      {/* Tarang Solar workspace sign-in (posts to the app's /login/gateway) */}
      <PartnerLoginModal
        isOpen={partnerLoginOpen}
        onClose={() => setPartnerLoginOpen(false)}
        theme={theme}
        failure={partnerLoginFailure}
      />

      {/* Privacy Policy / Terms Modal (Item 8) */}
      <LegalModal 
        type={legalModal}
        onClose={() => setLegalModal(null)}
        theme={theme}
      />

    </div>
  );
};

export default UI;
