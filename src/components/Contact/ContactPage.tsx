import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MINISTRY_INFO } from '../../data/content';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  MessageSquare, 
  Share2,
  Heart
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSentSuccess(true);
    }, 800);
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl border border-emerald-800 my-2"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-amber-300 text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-widest border border-amber-400/30">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Get In Touch</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Contact Us
          </h1>

          <p className="text-emerald-100 text-base max-w-2xl mx-auto font-light">
            We would love to hear from you! Whether you have questions, need prayer, or want to host a health seminar in your community, reach out today.
          </p>
        </div>
      </motion.section>

      {/* Main Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-emerald-950 text-white p-8 sm:p-10 rounded-3xl border border-emerald-800 shadow-xl space-y-8">
          
          <div>
            <span className="text-amber-300 text-xs font-bold uppercase tracking-widest block mb-1">
              Ministry Touchpoint
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Get in Touch
            </h2>
            <p className="text-emerald-100 text-sm mt-2 font-light">
              Feel free to reach out to us directly or through social channels.
            </p>
          </div>

          <div className="space-y-6 text-sm">
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center shrink-0 border border-emerald-800">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-stone-400 font-bold uppercase text-xs block">Ministry Headquarters</span>
                <span className="font-semibold text-white">Near Dublin, Ireland</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center shrink-0 border border-emerald-800">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-stone-400 font-bold uppercase text-xs block">Email Address</span>
                <a href={`mailto:${MINISTRY_INFO.email}`} className="font-bold text-amber-300 hover:underline">
                  {MINISTRY_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-3">
                Follow Us
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Facebook', handle: '@balmofgileadeire' },
                  { name: 'Instagram', handle: '@balmofgileadeire' },
                  { name: 'YouTube', handle: '@balmofgilead' },
                  { name: 'WhatsApp', handle: 'Ireland Ministry' },
                  { name: 'Telegram', handle: 'Balm of Gilead Channel' },
                  { name: 'Spotify', handle: 'Faith & Health Podcast' }
                ].map(item => (
                  <div key={item.name} className="p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-800/80">
                    <span className="font-bold text-amber-300 block">{item.name}</span>
                    <span className="text-[10px] text-stone-300">{item.handle}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl">
          
          {!sentSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Seminar Inquiry / General Question"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 hover:to-black text-amber-300 font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-amber-400" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-emerald-950">
                Message Sent Successfully!
              </h3>

              <p className="text-stone-600 text-sm">
                Thank you for reaching out to Balm of Gilead Ministry. We will reply to <strong className="text-stone-900">{email}</strong> promptly.
              </p>

              <button
                onClick={() => {
                  setSentSuccess(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="bg-emerald-900 text-amber-300 font-bold px-6 py-2.5 rounded-xl text-sm"
              >
                Send Another Message
              </button>
            </div>
          )}

        </div>

      </motion.section>

    </div>
  );
};
