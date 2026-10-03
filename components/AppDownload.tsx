import React from 'react';
import { Download, ShieldCheck, Smartphone, Wifi, Truck, Printer, FileCheck } from 'lucide-react';
import type { AppTheme } from '../App';

/** Where the signed trial build lives (served by the Matrics server next to its checksum). */
export const APK_URL = 'https://m.matricscorporation.com/app.apk';
export const APK_SHA256_URL = 'https://m.matricscorporation.com/app.apk.sha256';

interface AppDownloadProps {
  theme?: AppTheme;
}

/**
 * The app page: what the trial app is, one button to download it, and the three install steps in Hindi and
 * English. Reviewers are sent here; the APK itself is hosted with the server, so this page never goes stale.
 */
const AppDownload: React.FC<AppDownloadProps> = ({ theme = 'orange' }) => {
  const isLight = theme === 'light';
  const isOrange = theme === 'orange';

  const card = isLight
    ? 'bg-white/90 border-slate-200 text-slate-900 shadow-xl'
    : isOrange
      ? 'bg-stone-950/70 border-white/10 text-white shadow-2xl backdrop-blur'
      : 'bg-[#0a0500]/80 border-white/10 text-white shadow-2xl';
  const muted = isLight ? 'text-slate-600' : 'text-white/70';
  const accent = isLight ? 'text-[#db5319]' : isOrange ? 'text-amber-200' : 'text-[#db5319]';
  const button = isOrange
    ? 'bg-white text-[#d85104] hover:bg-white/95 shadow-orange-950/40'
    : 'bg-[#db5319] text-white hover:bg-[#c44510] shadow-[0_15px_35px_rgba(219,83,25,0.35)]';

  const features = [
    { icon: Wifi, hi: 'बिना इंटरनेट के बिल और उधार खाता', en: 'Bills and party khata, fully offline' },
    { icon: Truck, hi: 'हर बिल पर गाड़ी और डिलीवरी का WhatsApp लिंक', en: 'Dispatch on every bill with a WhatsApp delivery link' },
    { icon: Printer, hi: '58 mm ब्लूटूथ प्रिंटर पर हिंदी रसीद', en: 'Hindi receipts on 58 mm Bluetooth printers' },
  ];

  const steps = [
    { hi: 'नीचे वाला बटन दबाएँ; फ़ाइल डाउनलोड होगी।', en: 'Tap the button below; the file downloads.' },
    { hi: 'फ़ाइल खोलें। फ़ोन पूछे तो इस ब्राउज़र को "अनजान ऐप इंस्टॉल करने" की अनुमति दें।', en: 'Open the file. If the phone asks, allow this browser to install unknown apps.' },
    { hi: 'Matrics खोलें, दुकान का नाम और मोबाइल नंबर भरें, बिल बनाना शुरू करें।', en: 'Open Matrics, enter the shop name and mobile number, and start billing.' },
  ];

  return (
    <section id="app" className="w-full px-4 sm:px-8 xl:px-24 pt-28 sm:pt-32 pb-16 pointer-events-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-3 text-center sm:text-left">
          <p className={`text-[10px] font-mono uppercase tracking-[0.3em] font-bold ${muted}`}>Matrics Hub · trial build</p>
          <h2 className={`text-3xl sm:text-5xl font-black italic uppercase tracking-tighter leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
            व्यापारी डेस्क
            <span className={`block text-xl sm:text-2xl not-italic font-bold tracking-tight mt-2 ${accent}`}>The Wholesaler Desk app, for Android</span>
          </h2>
          <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${muted}`}>
            थोक और किराना दुकानों के लिए बहीखाता: बिल, उधार, डिस्पैच और प्रिंट, सब एक ऐप में, सिग्नल के बिना भी।
            One app for the shop's books: billing, khata, dispatch and printing, working all day without signal.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, hi, en }) => (
            <div key={en} className={`rounded-2xl border p-5 space-y-2 ${card}`}>
              <Icon size={22} className={accent} />
              <p className="font-bold leading-snug">{hi}</p>
              <p className={`text-xs ${muted}`}>{en}</p>
            </div>
          ))}
        </div>

        <div className={`rounded-3xl border p-6 sm:p-10 space-y-6 ${card}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-1">
              <p className="text-lg sm:text-xl font-black uppercase tracking-tight flex items-center gap-2">
                <Smartphone size={20} className={accent} /> ऐप डाउनलोड करें · Download the app
              </p>
              <p className={`text-xs sm:text-sm ${muted}`}>Android 8.1 या नया · लगभग 2 MB · APK फ़ाइल &nbsp;|&nbsp; Android 8.1 or newer · about 2 MB · APK file</p>
            </div>
            <a
              href={APK_URL}
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl hover:scale-105 active:scale-95 ${button}`}
            >
              <Download size={16} /> Download APK
            </a>
          </div>

          <ol className="space-y-3">
            {steps.map(({ hi, en }, i) => (
              <li key={en} className="flex gap-4">
                <span className={`flex-none w-7 h-7 rounded-full border flex items-center justify-center text-xs font-black ${isLight ? 'border-slate-300' : 'border-white/30'}`}>{i + 1}</span>
                <div>
                  <p className="font-semibold leading-snug">{hi}</p>
                  <p className={`text-xs ${muted}`}>{en}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={`flex flex-col sm:flex-row sm:items-center gap-3 text-xs ${muted}`}>
            <span className="inline-flex items-center gap-2"><ShieldCheck size={14} className={accent} /> Signed by Matrics Corporation. Not on the Play Store during the trial.</span>
            <a href={APK_SHA256_URL} className={`inline-flex items-center gap-1 underline underline-offset-4 ${accent}`}>
              <FileCheck size={14} /> checksum (SHA-256)
            </a>
          </div>
        </div>

        <p className={`text-xs sm:text-sm text-center sm:text-left ${muted}`}>
          समीक्षा के लिए भेजा गया ऐप: बिल बनाकर देखें, और जो अटके वह हमें बताएँ। &nbsp;
          Sent for review: make a few bills and tell us what gets in the way.
        </p>
      </div>
    </section>
  );
};

export default AppDownload;
