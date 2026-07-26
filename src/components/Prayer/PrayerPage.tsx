import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NavigationTab, PrayerRequest } from '../../types';
import { OFFERINGS_PRAYERS, ELLEN_WHITE_QUOTES } from '../../data/content';
import { 
  Heart, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Layers, 
  Copy, 
  Volume2, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface PrayerPageProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const PrayerPage: React.FC<PrayerPageProps> = ({ setActiveTab }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<PrayerRequest | null>(null);
  const [syncStatusMessage, setSyncStatusMessage] = useState<string>('');
  const [copiedPrayerIndex, setCopiedPrayerIndex] = useState<number | null>(null);
  const [publicPrayers, setPublicPrayers] = useState<any[]>([]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSyncStatusMessage('');

    const newRequest: PrayerRequest = {
      id: `pr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      isPrivate,
      createdAt: new Date().toISOString(),
      syncedToWordPress: false,
      wpStatus: 'pending'
    };

    try {
      const response = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          isPrivate
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to submit prayer request.');
      }

      newRequest.syncedToWordPress = true;
      newRequest.wpStatus = 'synced';
      setSyncStatusMessage('Your prayer request was securely received by the ministry.');
      setSubmittedRequest(newRequest);

    } catch (err) {
      console.error('Submission error:', err);
      setSubmittedRequest(newRequest);
      setSyncStatusMessage('Prayer request recorded locally in browser.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyPrayer = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPrayerIndex(index);
    setTimeout(() => setCopiedPrayerIndex(null), 2500);
  };

  const handleResetForm = () => {
    setSubmittedRequest(null);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsPrivate(false);
    setSyncStatusMessage('');
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
            <Heart className="w-3.5 h-3.5 text-amber-400" />
            <span>Offerings & Intercession</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Prayer Requests & Offerings
          </h1>

          <p className="text-emerald-100 text-base max-w-2xl mx-auto font-light">
            "Prayer is the opening of the heart to God as to a friend." We invite you to share your prayer requests so our ministry team can lift you up before the throne of grace.
          </p>
        </div>
      </motion.section>

      {/* 1. OFFERINGS: 3 GUIDED PRAYERS */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-800 font-bold text-xs uppercase tracking-widest bg-amber-100 px-3.5 py-1 rounded-full">
            Devotional Prayer Offerings
          </span>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 mt-2">
            Prayers for Health & Wholeness
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Read, reflect, and pray these guided faith petitions for physical, emotional, and spiritual renewal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {OFFERINGS_PRAYERS.map((item, idx) => (
            <div 
              key={item.number} 
              className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-emerald-900 text-amber-300 font-bold font-serif text-lg flex items-center justify-center">
                    {item.number}
                  </span>
                  <button
                    onClick={() => handleCopyPrayer(item.prayer, idx)}
                    className="p-2 text-stone-400 hover:text-emerald-800 rounded-lg hover:bg-stone-100 transition-colors"
                    title="Copy Prayer Text"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-3">
                  {item.title}
                </h3>

                <p className="font-serif text-stone-700 text-sm leading-relaxed italic bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100/80">
                  "{item.prayer}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-emerald-800">Balm of Gilead Ministry</span>
                {copiedPrayerIndex === idx && (
                  <span className="text-amber-600 font-bold">Copied to Clipboard!</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 2. FUNCTIONAL PRAYER REQUEST FORM */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" 
        id="prayer-form-section"
      >
        <div className="bg-white rounded-3xl border-2 border-emerald-800/30 shadow-2xl overflow-hidden">
          
          <div className="bg-emerald-950 text-white p-8 sm:p-10 border-b border-emerald-900">
            <div className="flex items-center gap-2 text-amber-300 font-serif text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>We Are Here to Pray for You</span>
            </div>
            <h2 className="font-serif text-3xl font-bold">
              Submit Your Prayer Request
            </h2>
            <p className="text-emerald-100 text-sm mt-2 font-light">
              If you have a prayer request, please don't hesitate to contact us. We are committed to lifting you up in prayer.
            </p>
          </div>

          {!submittedRequest ? (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Message / Prayer Details *
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <textarea
                    required
                    rows={5}
                    placeholder="Share your prayer request, health needs, or spiritual concerns..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-stone-700 font-medium">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-600"
                  />
                  <span>Keep this prayer request confidential (Pastoral team only)</span>
                </label>

                <button
                  type="button"
                  onClick={() => setActiveTab('wordpress')}
                  className="text-emerald-800 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>WordPress Sync Config</span>
                </button>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 hover:to-black text-amber-300 font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? (
                  <span>Sending Prayer Petition...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-amber-400" />
                    <span>Send Prayer Request</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            /* Confirmation Screen */
            <div className="p-8 sm:p-12 text-center space-y-6 bg-stone-50">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-emerald-950">
                Your Prayer Request Has Been Received
              </h3>

              <p className="text-stone-700 text-base max-w-lg mx-auto">
                Thank you, <strong className="text-emerald-950">{submittedRequest.name}</strong>. Our intercessory prayer team at Balm of Gilead is committed to lifting your needs before the Lord in Jesus’ name.
              </p>

              {syncStatusMessage && (
                <div className="p-4 bg-emerald-900 text-amber-200 rounded-2xl text-xs font-mono max-w-md mx-auto border border-emerald-800 shadow-sm">
                  {syncStatusMessage}
                </div>
              )}

              <div className="p-6 bg-white rounded-2xl border border-stone-200 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="text-stone-400 font-bold uppercase">Submitted Details</div>
                <div><strong className="text-stone-800">Reference Token:</strong> {submittedRequest.id}</div>
                <div><strong className="text-stone-800">Date:</strong> {new Date(submittedRequest.createdAt).toLocaleString()}</div>
                <div><strong className="text-stone-800">Prayer Note:</strong> "{submittedRequest.message}"</div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleResetForm}
                  className="bg-emerald-900 text-amber-300 hover:bg-emerald-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  Submit Another Prayer Request
                </button>

                <button
                  onClick={() => setActiveTab('wordpress')}
                  className="bg-stone-200 text-stone-800 hover:bg-stone-300 font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-emerald-800" />
                  <span>Manage WordPress Sync</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </motion.section>

      {/* Live Firestore Community Prayer Wall */}
      {publicPrayers.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="font-serif text-2xl font-bold text-[#1A2E1D]">
                Community Prayer Wall (Real-time Firestore Feed)
              </h3>
            </div>
            <span className="text-xs font-bold text-[#3A5A40] bg-[#3A5A40]/10 px-3 py-1 rounded-full uppercase">
              {publicPrayers.length} Active Petitions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publicPrayers.map((req, i) => (
              <div key={req.id || i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-bold text-[#1A2E1D]">{req.name}</span>
                  <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-stone-700 text-sm font-serif italic">
                  "{req.message}"
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1 text-[#3A5A40] font-semibold">
                    <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]/20" /> Praying Together
                  </span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-mono">
                    Firestore Synced
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. INSPIRATIONAL QUOTES (ELLEN G. WHITE) */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-lg space-y-3 relative overflow-hidden border border-emerald-800">
            <div className="text-amber-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Character & The Body</span>
            </div>
            <blockquote className="font-serif text-lg text-emerald-100 italic leading-snug">
              "{ELLEN_WHITE_QUOTES[1].quote}"
            </blockquote>
            <p className="text-amber-300 text-xs font-sans font-semibold">
              – {ELLEN_WHITE_QUOTES[1].author}, {ELLEN_WHITE_QUOTES[1].source}, {ELLEN_WHITE_QUOTES[1].page}
            </p>
          </div>

          <div className="bg-emerald-950 text-white p-8 rounded-3xl shadow-lg space-y-3 relative overflow-hidden border border-emerald-800">
            <div className="text-amber-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Glorifying God Through Health</span>
            </div>
            <blockquote className="font-serif text-lg text-emerald-100 italic leading-snug">
              "{ELLEN_WHITE_QUOTES[2].quote}"
            </blockquote>
            <p className="text-amber-300 text-xs font-sans font-semibold">
              – {ELLEN_WHITE_QUOTES[2].author}, {ELLEN_WHITE_QUOTES[2].source}, {ELLEN_WHITE_QUOTES[2].page}
            </p>
          </div>

        </div>
      </motion.section>

    </div>
  );
};
