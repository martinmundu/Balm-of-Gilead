import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ACTS_OF_APOSTLES_QUOTE, MINISTRY_INFO } from '../../data/content';
import QRCode from 'qrcode';
import { 
  Gift, 
  QrCode, 
  Copy, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Globe, 
  CreditCard, 
  Sparkles,
  Share2
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [copiedIban, setCopiedIban] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  React.useEffect(() => {
    QRCode.toDataURL('https://balmofgileadeire.org/donate', {
      width: 260,
      margin: 1,
      color: { dark: '#064e3b', light: '#ffffff' }
    }).then(url => setQrCodeDataUrl(url)).catch(err => console.error(err));
  }, []);

  const handleCopyIban = () => {
    navigator.clipboard.writeText('IE89 BALM 9302 1100 8829 01');
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2500);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl border border-emerald-800 my-2 mx-4 sm:mx-6 lg:mx-8"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-amber-300 text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-widest border border-amber-400/30">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Support Our Mission</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Partner With Balm of Gilead
          </h1>

          <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-700/60 italic font-serif text-xl text-amber-200 max-w-2xl mx-auto">
            {ACTS_OF_APOSTLES_QUOTE.quote}
            <span className="not-italic font-sans text-xs text-stone-300 block mt-2">
              — {ACTS_OF_APOSTLES_QUOTE.source}, {ACTS_OF_APOSTLES_QUOTE.page}
            </span>
          </div>
        </div>
      </motion.section>

      {/* Main Support & QR Code Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Bank & Donation details */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg space-y-4">
              <h2 className="font-serif text-2xl font-bold text-emerald-950">
                Direct Bank Transfer (Ireland & Europe)
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                You can support the ongoing health seminars, natural remedy distribution, and prayer ministry directly through SEPA / IBAN bank transfer:
              </p>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-400 font-bold uppercase">Account Name</span>
                  <span className="text-stone-900 font-bold">Balm of Gilead Ministry</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-400 font-bold uppercase">Bank</span>
                  <span className="text-stone-900 font-bold">Bank of Ireland (Dublin)</span>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <span className="text-stone-400 font-bold uppercase block">IBAN Number</span>
                    <span className="text-emerald-900 font-bold text-sm">IE89 BALM 9302 1100 8829 01</span>
                  </div>
                  <button
                    onClick={handleCopyIban}
                    className="p-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copiedIban && (
                  <p className="text-amber-600 text-[11px] font-sans font-bold text-right">
                    IBAN Copied to Clipboard!
                  </p>
                )}
              </div>
            </div>

            {/* Simulated Online Offering */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg space-y-6">
              <h2 className="font-serif text-2xl font-bold text-emerald-950">
                Online Willing Heart Offering
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {['€25', '€50', '€100'].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setShowThankYou(true)}
                    className="py-4 bg-emerald-50 hover:bg-emerald-900 hover:text-amber-300 text-emerald-900 font-bold rounded-2xl text-lg border border-emerald-200 transition-all text-center"
                  >
                    {amount}
                  </button>
                ))}
              </div>

              {showThankYou && (
                <div className="p-4 bg-emerald-100 text-emerald-900 rounded-xl text-sm border border-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Thank you! "God loves a cheerful giver." Your willingness to support Balm of Gilead brings healing to many lives.</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: QR CODE CARD */}
          <div className="lg:col-span-5">
            <div className="bg-emerald-950 text-white p-8 rounded-3xl border-2 border-amber-400/40 shadow-2xl text-center space-y-6 sticky top-28">
              
              <div className="w-14 h-14 bg-amber-400 text-emerald-950 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <QrCode className="w-8 h-8" />
              </div>

              <div>
                <span className="text-amber-300 text-xs font-bold uppercase tracking-widest block mb-1">
                  OFFICIAL QR CODE
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Scan to Give
                </h3>
              </div>

              <div className="p-4 bg-white rounded-2xl flex justify-center shadow-inner">
                {qrCodeDataUrl ? (
                  <img src={qrCodeDataUrl} alt="Balm of Gilead Donation QR Code" className="w-52 h-52 object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-52 h-52 bg-stone-200 animate-pulse rounded-xl" />
                )}
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Scan this official Balm of Gilead QR Code with your smartphone camera to access instant giving.
              </p>

              <div className="pt-2 border-t border-emerald-800 text-xs text-amber-200">
                Official Ministry Email: <br />
                <a href={`mailto:${MINISTRY_INFO.email}`} className="font-bold underline text-white">
                  {MINISTRY_INFO.email}
                </a>
              </div>

            </div>
          </div>

        </div>
      </motion.section>

    </div>
  );
};
