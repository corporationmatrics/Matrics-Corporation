import React, { useState } from 'react';
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
import { submitLead, LEAD_CONSENT_TEXT } from '../lib/leads';

interface PartnersSolarProps {
  theme?: AppTheme;
  onOpenEarlyAccess: () => void;
}

const PartnersSolar: React.FC<PartnersSolarProps> = ({ theme = 'orange', onOpenEarlyAccess }) => {
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
  const [surveyConsent, setSurveyConsent] = useState(false);
  const [surveySending, setSurveySending] = useState(false);
  const [surveyError, setSurveyError] = useState('');

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

  const subsidyData = [
    {
      capacity: '1 kW System',
      cost: '₹65,000 – ₹75,000',
      subsidy: '₹45,000 (₹30k Central + ₹15k CG)',
      effectiveCost: '₹20,000 – ₹30,000',
      units: '~120 – 150 kWh',
      savings: '₹900 – ₹1,200 / mo',
    },
    {
      capacity: '2 kW System',
      cost: '₹1,25,000 – ₹1,40,000',
      subsidy: '₹90,000 (₹60k Central + ₹30k CG)',
      effectiveCost: '₹35,000 – ₹50,000',
      units: '~240 – 300 kWh',
      savings: '₹1,800 – ₹2,400 / mo',
    },
    {
      capacity: '3 kW System (Most Popular)',
      cost: '₹1,80,000 – ₹2,05,000',
      subsidy: '₹1,08,000 (₹78k Central + ₹30k CG)',
      effectiveCost: '₹72,000 – ₹97,000',
      units: '~360 – 450 kWh',
      savings: '₹2,800 – ₹3,600 / mo',
    },
    {
      capacity: 'Commercial & Industrial (>10 kW)',
      cost: 'Custom EPC Pricing',
      subsidy: '40% Accelerated Depreciation',
      effectiveCost: 'Tax Shield + CapEx Loan',
      units: '1,400+ kWh / 10 kW',
      savings: 'Up to 70% energy bill reduction',
    },
  ];

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (surveySending) return;
    if (!surveyData.name.trim() || !surveyData.phone.trim()) return;
    if (surveyData.phone.replace(/\D/g, '').length !== 10) {
      setSurveyError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!surveyConsent) {
      setSurveyError('Please tick the consent box so we can contact you.');
      return;
    }
    setSurveyError('');
    setSurveySending(true);
    try {
      await submitLead({
        kind: 'SOLAR_AUDIT',
        name: surveyData.name.trim(),
        phone: surveyData.phone,
        consentText: LEAD_CONSENT_TEXT,
        segment: surveyData.propertyType === 'Residential Rooftop' ? 'HOME' : 'BUSINESS',
        town: surveyData.town.trim(),
        billRange: surveyData.billRange,
        propertyType: surveyData.propertyType,
        source: 'website:tarang-solar',
      });
      setSurveySubmitted(true);
    } catch (err) {
      setSurveyError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSurveySending(false);
    }
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
          Accelerating rooftop solar adoption for warehouses, cold chains, small factories, and retail kirana networks across Central India with end-to-end subsidy processing and smart energy monitoring.
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
                By combining MNRE Tier-1 photovoltaic technology with direct National Portal subsidy liaison, Tarang enables kirana stores, cold storage facilities, and logistics depots to slash monthly electricity expenditures by up to 90% while locking in predictable energy tariffs for 25 years.
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
                  <div className="text-[9px] font-mono text-[#db5319] font-bold">DISCOM APPROVED</div>
                  <div className="text-sm font-black mt-0.5">100% Net-Metered</div>
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
                  <div className="text-[9px] uppercase tracking-widest font-bold opacity-60">Grid Outage Mitigation</div>
                  <div className="text-2xl sm:text-3xl font-black italic">Zero Spoilage</div>
                  <div className="text-[10px] opacity-60 mt-0.5">Hybrid battery storage keeps chillers running</div>
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

      {/* Subsidy Table (PM Surya Ghar) */}
      <section id="subsidy-breakdown" className="px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#db5319] font-black">
            Government Financial Support
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black italic uppercase tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Subsidy & Benchmark Pricing Table
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${
            isLight ? 'text-slate-500' : 'text-white/60'
          }`}>
            Central financial assistance under PM Surya Ghar: Muft Bijli Yojana plus the Chhattisgarh state top-up paid through CSPDCL (residential only).
          </p>
        </div>

        <div className={`rounded-xl border overflow-x-auto shadow-xl ${
          isLight ? 'bg-white border-slate-200' : 'bg-stone-950/80 border-white/10 text-white'
        }`}>
          <table className="w-full text-left text-xs border-collapse min-w-[640px]">
            <thead>
              <tr className={`border-b text-[10px] font-mono uppercase font-black tracking-widest ${
                isLight ? 'bg-slate-100/80 text-slate-700 border-slate-200' : 'bg-white/5 text-white/80 border-white/10'
              }`}>
                <th className="p-4">System Tier</th>
                <th className="p-4">Benchmark Cost</th>
                <th className="p-4 text-[#db5319]">Subsidy (Central + CG State)</th>
                <th className="p-4">Net Customer Cost</th>
                <th className="p-4">Est. Generation</th>
                <th className="p-4">Monthly Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-medium">
              {subsidyData.map((row, i) => (
                <tr 
                  key={i} 
                  className={`transition-colors ${
                    i === 2 
                      ? isLight ? 'bg-orange-50/50 font-semibold' : 'bg-[#db5319]/10 font-semibold'
                      : isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="p-4 font-bold">{row.capacity}</td>
                  <td className="p-4 font-mono text-xs">{row.cost}</td>
                  <td className="p-4 font-mono font-bold text-[#db5319]">{row.subsidy}</td>
                  <td className="p-4 font-mono text-xs">{row.effectiveCost}</td>
                  <td className="p-4 font-mono text-xs">{row.units}</td>
                  <td className="p-4 font-mono font-bold text-emerald-500">{row.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-400 px-2 gap-2">
          <span>* NOTE: FIGURES ARE ILLUSTRATIVE BASED ON MNRE GUIDELINES AND AVERAGE SOLAR IRRADIANCE IN CHHATTISGARH.</span>
          <span className="text-[#db5319] font-bold">100% SUBSIDY DISBURSAL ASSISTANCE INCLUDED</span>
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
            <div className="text-[10px] font-mono text-[#db5319]">0% Grid Drop Downtime</div>
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
                Matrics partner banks and NBFCs finance the net solar equipment CapEx with repayment auto-deducted in micro-instalments from verified retail sales volume, requiring zero external land or property collateral.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#db5319]">Cashflow Underwritten</div>
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
                <div className="text-lg font-black italic">100% Pass</div>
                <div className="text-[10px] opacity-60">Net-metering clearance rate across state utilities</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-mono uppercase text-[#db5319] font-bold">Component Standard</div>
                <div className="text-lg font-black italic">Tier-1 MNRE</div>
                <div className="text-[10px] opacity-60">BIS & IEC certified panels, inverters, and switchgear</div>
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
                onClick={() => {
                  setSurveySubmitted(false);
                  setSurveyConsent(false);
                  setSurveyData({ ...surveyData, name: '', phone: '' });
                }}
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

              <label className={`flex items-start gap-2.5 text-[11px] leading-relaxed cursor-pointer ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                <input
                  type="checkbox"
                  checked={surveyConsent}
                  onChange={(e) => setSurveyConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#db5319]"
                />
                <span>{LEAD_CONSENT_TEXT}</span>
              </label>

              {surveyError && (
                <div role="alert" className="text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {surveyError}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={surveySending}
                  className={`w-full py-3.5 rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-60 disabled:cursor-wait ${
                    isOrange
                      ? 'bg-white text-[#d85104] hover:bg-white/95'
                      : isLight
                        ? 'bg-[#db5319] text-white hover:bg-[#c24610]'
                        : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  <span>{surveySending ? 'Sending…' : 'Request Free Rooftop Assessment'}</span>
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
