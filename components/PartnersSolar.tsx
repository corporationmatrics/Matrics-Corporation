import React, { useEffect, useState } from 'react';
import { 
  Sun, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  TrendingDown, 
  Sparkles, 
  Building2, 
  Store, 
  FileCheck, 
  Gauge, 
  BatteryCharging, 
  Award,
  Calendar,
  PhoneCall,
  Clock
} from 'lucide-react';
import type { AppTheme } from '../App';
import { FALLBACK_SUBSIDY, fetchSubsidy, inr, LEAD_CONSENT_LABEL, submitLead, type SubsidyRow } from '../lib/api';

interface PartnersSolarProps {
  theme?: AppTheme;
  onOpenEarlyAccess: () => void;
  onOpenPartnerLogin?: () => void;
}

const PartnersSolar: React.FC<PartnersSolarProps> = ({ theme = 'orange', onOpenEarlyAccess, onOpenPartnerLogin }) => {
  const isLight = theme === 'light';
  const isOrange = theme === 'orange';

  const [showProofStrip, setShowProofStrip] = useState(false);
  const [surveyData, setSurveyData] = useState({
    name: '',
    phone: '',
    billRange: '₹3,000 – ₹7,000 / month',
    town: 'Raipur',
    propertyType: 'Commercial Kirana / Warehouse',
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);
  const [surveyError, setSurveyError] = useState('');
  // Live PM Surya Ghar + CG top-up figures from the Tarang app's settings.
  const [homeSubsidy, setHomeSubsidy] = useState<SubsidyRow[]>(FALLBACK_SUBSIDY);
  useEffect(() => { fetchSubsidy().then(setHomeSubsidy); }, []);

  const solarJourney = [
    {
      num: '01',
      title: 'Site Assessment & Shadow Audit',
      desc: 'High-precision 3D rooftop shadow modeling, structural load analysis, and historical electricity bill evaluation to size optimal capacity.',
    },
    {
      num: '02',
      title: 'Custom Engineering & System Design',
      desc: 'Engineered with Tier-1 Monocrystalline half-cut TOPCon modules and high-efficiency smart on-grid/hybrid inverters tuned for Indian grid heat cycles.',
    },
    {
      num: '03',
      title: 'Subsidy Documentation & DISCOM Liaison',
      desc: 'Seamless direct application on the National PM Surya Ghar Portal and end-to-end CSPDCL electricity board liaison for sanctioned load approvals.',
    },
    {
      num: '04',
      title: 'MNRE Installation & Surge Protection',
      desc: 'Certified EPC installation adhering to strict MNRE benchmarks, incorporating chemical earthing, Class-II SPD surge protectors, and lightning arrestors.',
    },
    {
      num: '05',
      title: 'Net Metering & Grid Interconnection',
      desc: 'Bi-directional net meter installation and inspection by state electrical authorities to ensure automated monthly solar export unit adjustments.',
    },
    {
      num: '06',
      title: 'Commissioning & Performance Testing',
      desc: 'Live synchronization test, safety sign-off, inverter parameter locking, and handover of 25-year manufacturer performance guarantee certificates.',
    },
    {
      num: '07',
      title: '24/7 Remote Monitoring & Lifetime Support',
      desc: 'Continuous IoT inverter telemetry streaming generation data to the merchant app, backed by dedicated quarterly preventive maintenance visits.',
    },
  ];

  // Illustrative benchmark costs and generation for homes (PM Surya Ghar applies to residential only).
  const homeBenchmarks: Record<number, { cost: [number, number]; units: string; savings: string }> = {
    1: { cost: [65000, 75000], units: '~120 – 150 kWh', savings: '₹900 – ₹1,200 / mo' },
    2: { cost: [125000, 140000], units: '~240 – 300 kWh', savings: '₹1,800 – ₹2,400 / mo' },
    3: { cost: [180000, 205000], units: '~360 – 450 kWh', savings: '₹2,800 – ₹3,600 / mo' },
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyData.name.trim() || !surveyData.phone.trim()) return;
    if (!consent) { setSurveyError('Please tick the consent box so our engineer can call you.'); return; }
    setSurveyError('');
    setSending(true);
    const failure = await submitLead({
      kind: 'SOLAR_AUDIT',
      name: surveyData.name,
      phone: surveyData.phone,
      town: surveyData.town,
      billRange: surveyData.billRange,
      propertyType: surveyData.propertyType,
      consent,
      website: honeypot,
    });
    setSending(false);
    if (failure) setSurveyError(failure);
    else setSurveySubmitted(true);
  };

  return (
    <div className="relative w-full space-y-20 py-8 lg:py-12 pointer-events-auto">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 lg:px-16 text-center max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-center space-x-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[#db5319] font-black">
          <Sun size={14} className="text-[#db5319]" />
          <span>Strategic Infrastructure Partner</span>
        </div>

        <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-[0.95] ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          Tarang Solar <span className="text-[#db5319]">×</span> Matrics
        </h1>

        <p className={`text-lg sm:text-2xl font-bold uppercase tracking-tight max-w-3xl mx-auto ${
          isLight ? 'text-slate-700' : isOrange ? 'text-white/90' : 'text-white/80'
        }`}>
          Powering India&apos;s Commercial Grid & Retail Infrastructure with Clean, Verifiable Solar Energy.
        </p>

        <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
          isLight ? 'text-slate-500' : 'text-white/70'
        }`}>
          Rooftop solar for homes (with the PM Surya Ghar subsidy and the Chhattisgarh state top-up) and for shops, warehouses, cold rooms and small factories across Central India — with end-to-end paperwork and DISCOM liaison.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#solar-audit"
            className={`px-8 py-3.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
              isOrange
                ? 'bg-white text-[#d85104] hover:bg-white/95'
                : isLight
                  ? 'bg-[#db5319] text-white hover:bg-[#c24610]'
                  : 'bg-white text-black hover:bg-slate-100'
            }`}
          >
            Schedule Free Solar Site Audit
          </a>
          <a
            href="#subsidy-breakdown"
            className={`px-6 py-3.5 rounded-lg text-xs font-black uppercase tracking-widest border transition-all ${
              isLight
                ? 'border-slate-300 text-slate-700 hover:border-slate-900'
                : 'border-white/20 text-white hover:border-white hover:bg-white/5'
            }`}
          >
            View Subsidy Table
          </a>
        </div>

        {onOpenPartnerLogin && (
          <div className={`mx-auto max-w-xl flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border text-left ${
            isLight
              ? 'bg-white/90 border-slate-200 shadow-lg'
              : isOrange
                ? 'bg-stone-950/75 border-amber-500/30 shadow-2xl'
                : 'bg-zinc-950/80 border-white/10'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#db5319] font-bold">
                <ShieldCheck size={12} />
                <span>Tarang Solar Web Portal · Trial</span>
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                Staff, channel partners and their executives — sign in to manage cases, documents and follow-ups.
              </p>
            </div>
            <button
              onClick={onOpenPartnerLogin}
              className={`shrink-0 inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-md ${
                isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-[#db5319] text-white hover:bg-[#c24610]'
              }`}
            >
              <span>Partner Login</span>
              <ArrowRight size={12} />
            </button>
          </div>
        )}
      </section>

      {/* About Tarang Solar */}
      <section className="px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <div className={`p-6 sm:p-10 rounded-2xl border transition-all ${
          isLight
            ? 'bg-white/90 border-slate-200 shadow-xl'
            : isOrange
              ? 'bg-stone-950/75 border-white/15 shadow-2xl text-white'
              : 'bg-zinc-950/80 border-white/10 text-white'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#db5319] font-bold">
                About The Partner
              </div>
              <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight">
                Central India&apos;s High-Precision Rooftop Solar EPC Specialist
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/75'}`}>
                Tarang Solar is an engineering-driven solar solution provider operating extensively across Chhattisgarh and Central India. Dedicated to decarbonizing commercial supply chains, Tarang designs, permits, installs, and maintains high-yield rooftop solar power plants.
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/75'}`}>
                Using ALMM-listed (MNRE-approved) modules and handling the National Portal and CSPDCL paperwork for you, Tarang helps homes and businesses cut monthly electricity bills substantially and lock in predictable energy costs for the 25-year life of the panels.
              </p>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                <div className={`p-3 rounded-lg border ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'}`}>
                  <div className="text-[9px] font-mono text-[#db5319] font-bold">SUBSIDY READY</div>
                  <div className="text-sm font-black mt-0.5">PM Surya Ghar</div>
                </div>
                <div className={`p-3 rounded-lg border ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'}`}>
                  <div className="text-[9px] font-mono text-[#db5319] font-bold">MODULE LIFETIME</div>
                  <div className="text-sm font-black mt-0.5">25-Yr Performance</div>
                </div>
                <div className={`p-3 rounded-lg border ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'}`}>
                  <div className="text-[9px] font-mono text-[#db5319] font-bold">DISCOM LIAISON</div>
                  <div className="text-sm font-black mt-0.5">Net-metering handled</div>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-5 p-6 rounded-xl border flex flex-col justify-between space-y-4 ${
              isLight ? 'bg-orange-50/60 border-orange-200/70' : 'bg-black/40 border-[#db5319]/30'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-white/10">
                <span className="text-[10px] font-mono font-bold uppercase text-[#db5319]">Impact Spotlight</span>
                <span className="text-[9px] font-mono opacity-50">ESTIMATED · ILLUSTRATIVE</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-[9px] uppercase tracking-widest font-bold opacity-60">Avg Commercial Monthly Savings</div>
                  <div className="text-2xl sm:text-3xl font-black italic text-[#db5319]">₹12,500 – ₹45,000</div>
                  <div className="text-[10px] opacity-60 mt-0.5">On cold room & grocery refrigeration loads</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest font-bold opacity-60">Payback Period</div>
                  <div className="text-2xl sm:text-3xl font-black italic text-emerald-500">2.5 – 3.8 Years</div>
                  <div className="text-[10px] opacity-60 mt-0.5">After central subsidies & tax incentives</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest font-bold opacity-60">Grid Outage Backup</div>
                  <div className="text-2xl sm:text-3xl font-black italic">Optional Hybrid</div>
                  <div className="text-[10px] opacity-60 mt-0.5">Battery-backed systems can keep essential loads such as chillers running during outages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 7-Step Solar Journey */}
      <section className="px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#db5319] font-black">
            End-To-End Execution
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black italic uppercase tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            The 7-Step Solar Journey
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${
            isLight ? 'text-slate-500' : 'text-white/60'
          }`}>
            From initial roof analysis to net-meter commissioning and lifetime app tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {solarJourney.map((step, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                isLight
                  ? 'bg-white border-slate-200/80 hover:border-[#db5319]/40 shadow-sm'
                  : 'bg-stone-950/60 border-white/10 hover:border-[#db5319]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black italic font-mono text-[#db5319]">
                    {step.num}.
                  </span>
                  <span className="text-[9px] font-mono uppercase opacity-40">Step {step.num} of 07</span>
                </div>
                <h3 className={`text-sm sm:text-base font-black uppercase tracking-tight mb-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center text-[10px] font-mono text-[#db5319]">
                <CheckCircle2 size={12} className="mr-1.5" />
                <span>Quality Inspected</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subsidy: homes (PM Surya Ghar + CG top-up, live) and businesses (no PMSG subsidy) */}
      <section id="subsidy-breakdown" className="px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#db5319] font-black">
            Government Financial Support
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black italic uppercase tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Subsidy & Benchmark Pricing
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${
            isLight ? 'text-slate-500' : 'text-white/60'
          }`}>
            PM Surya Ghar: Muft Bijli Yojana subsidy is for homes (residential connections). In Chhattisgarh the state adds a top-up on top of the central amount.
          </p>
        </div>

        <h3 className={`text-sm font-black uppercase tracking-widest ${isLight ? 'text-slate-800' : 'text-white'}`}>For homes — central + Chhattisgarh subsidy</h3>
        <div className={`rounded-xl border overflow-x-auto shadow-xl ${
          isLight ? 'bg-white border-slate-200' : 'bg-stone-950/80 border-white/10 text-white'
        }`}>
          <table className="w-full text-left text-xs border-collapse min-w-[720px]">
            <thead>
              <tr className={`border-b text-[10px] font-mono uppercase font-black tracking-widest ${
                isLight ? 'bg-slate-100/80 text-slate-700 border-slate-200' : 'bg-white/5 text-white/80 border-white/10'
              }`}>
                <th className="p-4">System</th>
                <th className="p-4">Benchmark cost*</th>
                <th className="p-4 text-[#db5319]">Central subsidy</th>
                <th className="p-4 text-[#db5319]">CG state top-up</th>
                <th className="p-4 text-[#db5319]">Total subsidy</th>
                <th className="p-4">Net cost after subsidy*</th>
                <th className="p-4">Est. monthly savings*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-medium">
              {homeSubsidy.map((row) => {
                const b = homeBenchmarks[row.kw];
                const popular = row.kw === 3;
                return (
                  <tr key={row.kw} className={popular ? (isLight ? 'bg-orange-50/50 font-semibold' : 'bg-[#db5319]/10 font-semibold') : ''}>
                    <td className="p-4 font-bold">{row.kw} kW{popular ? ' (most popular)' : ''}</td>
                    <td className="p-4 font-mono">{b ? `${inr(b.cost[0])} – ${inr(b.cost[1])}` : '—'}</td>
                    <td className="p-4 font-mono font-bold text-[#db5319]">{inr(row.central)}</td>
                    <td className="p-4 font-mono font-bold text-[#db5319]">{inr(row.state)}</td>
                    <td className="p-4 font-mono font-black text-[#db5319]">{inr(row.total)}</td>
                    <td className="p-4 font-mono">{b ? `${inr(Math.max(0, b.cost[0] - row.total))} – ${inr(Math.max(0, b.cost[1] - row.total))}` : '—'}</td>
                    <td className="p-4 font-mono font-bold text-emerald-500">{b?.savings ?? '—'}</td>
                  </tr>
                );
              })}
              <tr>
                <td className="p-4 font-bold">Above 3 kW (up to 10 kW)</td>
                <td className="p-4 font-mono">On quotation</td>
                <td className="p-4 font-mono font-bold text-[#db5319]" colSpan={3}>Capped at the 3 kW amount ({inr(homeSubsidy[homeSubsidy.length - 1]?.total ?? 108000)} in total)</td>
                <td className="p-4 font-mono">—</td>
                <td className="p-4 font-mono">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={`pt-4 text-sm font-black uppercase tracking-widest ${isLight ? 'text-slate-800' : 'text-white'}`}>For shops, warehouses, cold rooms & factories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ['No PM Surya Ghar subsidy', 'Commercial and industrial connections are not covered by the residential scheme — pricing is on a custom quotation.'],
            ['Tax benefit', 'Businesses may claim accelerated depreciation on solar assets under the Income-tax Act. Confirm the rate applicable to you with your CA.'],
            ['Payback', 'Depends on your load pattern and tariff; typically a few years for daytime-heavy loads. We size it from your last 12 months of bills.'],
          ].map(([title, body]) => (
            <div key={title} className={`p-5 rounded-xl border ${isLight ? 'bg-white border-slate-200' : 'bg-stone-950/70 border-white/10'}`}>
              <div className="text-sm font-black uppercase tracking-tight mb-1">{title}</div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>{body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-400 px-2 gap-2">
          <span>* COSTS, NET COSTS AND SAVINGS ARE ILLUSTRATIVE (CHHATTISGARH IRRADIANCE, TYPICAL TARIFFS). SUBSIDY AMOUNTS ARE THE CURRENT SCHEME RATES.</span>
          <span className="text-[#db5319] font-bold">SUBSIDY PAPERWORK ASSISTANCE INCLUDED</span>
        </div>
      </section>

      {/* How Tarang Works With Matrics */}
      <section className="px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#db5319] font-black">
            Synergy & Integration
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black italic uppercase tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            How Tarang Works with Matrics
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${
            isLight ? 'text-slate-500' : 'text-white/60'
          }`}>
            Merging decentralized solar infrastructure with the verifiable transaction layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl border flex flex-col justify-between space-y-4 ${
            isLight ? 'bg-white border-slate-200' : 'bg-stone-950/70 border-white/10'
          }`}>
            <div>
              <div className="p-2.5 w-fit rounded-lg bg-[#db5319]/10 text-[#db5319] mb-4">
                <Store size={20} />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight mb-2">
                1. Powering Trade Nodes
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                Warehouse cold storages, FMCG distribution depots, and corner kiranas are equipped with dependable captive solar arrays. Perishable inventory spoilage during regional grid fluctuations drops to zero.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#db5319]">Backup-ready with hybrid storage</div>
          </div>

          <div className={`p-6 rounded-xl border flex flex-col justify-between space-y-4 ${
            isLight ? 'bg-white border-slate-200' : 'bg-stone-950/70 border-white/10'
          }`}>
            <div>
              <div className="p-2.5 w-fit rounded-lg bg-[#db5319]/10 text-[#db5319] mb-4">
                <Gauge size={20} />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight mb-2">
                2. Verifiable Energy Accounting
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                Tarang inverter telemetry streams real-time generated kilowatt-hours directly into the merchant&apos;s Matrics ledger profile. Clean energy certificates and lower cost structures directly bolster creditworthiness.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#db5319]">Proof of Green Kilowatt</div>
          </div>

          <div className={`p-6 rounded-xl border flex flex-col justify-between space-y-4 ${
            isLight ? 'bg-white border-slate-200' : 'bg-stone-950/70 border-white/10'
          }`}>
            <div>
              <div className="p-2.5 w-fit rounded-lg bg-[#db5319]/10 text-[#db5319] mb-4">
                <BatteryCharging size={20} />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight mb-2">
                3. Flow-Backed Equipment Loans
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                Planned: partner banks and NBFCs could finance solar equipment with repayments linked to verified sales flows. Subject to lender approval, credit assessment and RBI digital-lending norms — not yet available.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#db5319]">Coming soon</div>
          </div>
        </div>
      </section>

      {/* Hidden Proof Strip (Toggleable) */}
      <section className="px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <div className={`rounded-xl border transition-all overflow-hidden ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-stone-950/50 border-white/10'
        }`}>
          <button
            onClick={() => setShowProofStrip(!showProofStrip)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors hover:bg-white/5"
          >
            <div className="flex items-center space-x-3">
              <Award size={18} className="text-[#db5319]" />
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                  Partner Credentials & Technical Benchmark Compliance
                </span>
                <span className="text-[10px] block opacity-50 font-mono mt-0.5">
                  Click to {showProofStrip ? 'collapse' : 'reveal'} EPC certifications, warranties, and regional track record
                </span>
              </div>
            </div>
            <div className="p-1 rounded-full border border-white/15">
              {showProofStrip ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {showProofStrip && (
            <div className="p-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <div className="text-[9px] font-mono uppercase text-[#db5319] font-bold">Corridor Volume</div>
                <div className="text-lg font-black italic">500+ kW</div>
                <div className="text-[10px] opacity-60">Installed capacity across Central India (ILLUSTRATIVE)</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-mono uppercase text-[#db5319] font-bold">Module Assurance</div>
                <div className="text-lg font-black italic">25 Years</div>
                <div className="text-[10px] opacity-60">Linear power degradation warranty on monocrystalline modules</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-mono uppercase text-[#db5319] font-bold">Discom Liaison</div>
                <div className="text-lg font-black italic">End to end</div>
                <div className="text-[10px] opacity-60">Portal application, feasibility, net-meter and inspection follow-up</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-mono uppercase text-[#db5319] font-bold">Component Standard</div>
                <div className="text-lg font-black italic">ALMM-listed</div>
                <div className="text-[10px] opacity-60">MNRE ALMM modules (DCR for subsidy cases), BIS/IEC-certified inverters and switchgear</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Closing Call to Action: Schedule Free Solar Site Audit */}
      <section id="solar-audit" className="px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto pb-12">
        <div className={`p-8 sm:p-10 rounded-2xl border transition-all shadow-2xl relative ${
          isLight
            ? 'bg-white border-slate-200'
            : isOrange
              ? 'bg-stone-950/85 border-amber-500/30 text-white'
              : 'bg-zinc-950 border-white/15 text-white'
        }`}>
          <div className="text-center space-y-2 mb-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#db5319] font-black">
              Direct Engineering Consultation
            </div>
            <h2 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tight">
              Schedule Your Free Rooftop Solar Audit
            </h2>
            <p className={`text-xs sm:text-sm max-w-lg mx-auto ${isLight ? 'text-slate-500' : 'text-white/70'}`}>
              Our Central India solar engineering team will visit your warehouse, factory, or commercial storefront to conduct a comprehensive structural and shadow audit.
            </p>
          </div>

          {surveySubmitted ? (
            <div className="text-center py-8 space-y-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
              <CheckCircle size={36} className="mx-auto text-emerald-400" />
              <h3 className="text-xl font-black uppercase">Audit Scheduled</h3>
              <p className="text-xs max-w-sm mx-auto opacity-80 leading-relaxed">
                Thank you, <span className="font-bold">{surveyData.name}</span>. An engineer from Tarang Solar will contact you at <span className="font-mono">{surveyData.phone}</span> within 24 hours to confirm your site inspection in <span className="font-bold">{surveyData.town}</span>.
              </p>
              <button
                onClick={() => setSurveySubmitted(false)}
                className="mt-3 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider bg-white text-black"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSurveySubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                    Your Name / Representative *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Agrawal"
                    value={surveyData.name}
                    onChange={(e) => setSurveyData({ ...surveyData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-medium outline-none transition-all border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319]'
                        : 'bg-white/5 border-white/15 text-white focus:border-[#db5319]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                    Phone Number (+91) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98271 23456"
                    value={surveyData.phone}
                    onChange={(e) => setSurveyData({ ...surveyData, phone: e.target.value.replace(/\D/g, '') })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-mono font-medium outline-none transition-all border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319]'
                        : 'bg-white/5 border-white/15 text-white focus:border-[#db5319]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                    Monthly Power Bill
                  </label>
                  <select
                    value={surveyData.billRange}
                    onChange={(e) => setSurveyData({ ...surveyData, billRange: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-medium outline-none transition-all border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319]'
                        : 'bg-stone-900 border-white/15 text-white focus:border-[#db5319]'
                    }`}
                  >
                    <option value="₹1,500 – ₹3,000 / month">₹1,500 – ₹3,000 / month</option>
                    <option value="₹3,000 – ₹7,000 / month">₹3,000 – ₹7,000 / month</option>
                    <option value="₹7,000 – ₹15,000 / month">₹7,000 – ₹15,000 / month</option>
                    <option value="₹15,000+ / month">₹15,000+ / month (Commercial)</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                    Town / City in CG *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Raipur, Bilaspur, Durg"
                    value={surveyData.town}
                    onChange={(e) => setSurveyData({ ...surveyData, town: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-medium outline-none transition-all border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319]'
                        : 'bg-white/5 border-white/15 text-white focus:border-[#db5319]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1.5 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                    Property Type
                  </label>
                  <select
                    value={surveyData.propertyType}
                    onChange={(e) => setSurveyData({ ...surveyData, propertyType: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-medium outline-none transition-all border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#db5319]'
                        : 'bg-stone-900 border-white/15 text-white focus:border-[#db5319]'
                    }`}
                  >
                    <option value="Commercial Kirana / Warehouse">Commercial Kirana / Warehouse</option>
                    <option value="Industrial Factory / Cold Room">Industrial Factory / Cold Room</option>
                    <option value="Residential Rooftop">Residential Rooftop</option>
                  </select>
                </div>
              </div>

              {/* Honeypot for bots — hidden from people and screen readers */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)} className="hidden" name="website" />

              <label className={`flex items-start gap-2 text-[11px] leading-snug ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#db5319]" />
                <span>{LEAD_CONSENT_LABEL}</span>
              </label>

              {surveyError && (
                <p className="text-xs font-semibold text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{surveyError}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full py-3.5 rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg ${
                    isOrange
                      ? 'bg-white text-[#d85104] hover:bg-white/95'
                      : isLight
                        ? 'bg-[#db5319] text-white hover:bg-[#c24610]'
                        : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  <span>{sending ? 'Sending…' : 'Request Free Rooftop Assessment'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};

export default PartnersSolar;
