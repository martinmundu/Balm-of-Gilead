import React from 'react';
import { motion } from 'motion/react';
import { NavigationTab } from '../../types';
import { MINISTRY_INFO, SCRIPTURE_VERSES, ELLEN_WHITE_QUOTES } from '../../data/content';
import { 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Leaf, 
  Sun, 
  Flame, 
  Compass, 
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
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
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Jeremiah 33:6</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            About Balm of Gilead
          </h1>

          <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-700/60 italic font-serif text-xl sm:text-2xl text-amber-200">
            "{MINISTRY_INFO.jeremiah33_6}"
          </div>
        </div>
      </motion.section>

      {/* Main About Description & Prayer Quote */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-lg space-y-8">
          
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
              About Balm of Gilead
            </h2>
            <p className="text-stone-700 text-base leading-relaxed">
              {MINISTRY_INFO.aboutMain}
            </p>
            <div className="p-4 bg-emerald-50 rounded-xl text-emerald-900 text-sm font-semibold border-l-4 border-emerald-700">
              Strengthen your spirit with our Faith & Wellness Devotionals.
            </div>
          </div>

          {/* Ellen G. White Steps to Christ Quote Box */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-8 rounded-2xl shadow-md space-y-3 relative overflow-hidden">
            <div className="text-amber-300 font-serif text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Reflections on Prayer</span>
            </div>
            <blockquote className="font-serif text-lg sm:text-xl text-amber-100 italic leading-snug">
              "{ELLEN_WHITE_QUOTES[0].quote}"
            </blockquote>
            <p className="text-stone-300 text-xs font-sans font-semibold">
              — {ELLEN_WHITE_QUOTES[0].author}, <span className="text-amber-300">{ELLEN_WHITE_QUOTES[0].source}</span>
            </p>
          </div>

        </div>
      </motion.section>

      {/* 3 Core Pillars */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Our Approach
          </span>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 mt-2">
            Holistic Healing Through Faith
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 bg-emerald-800 text-amber-300 rounded-2xl flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-emerald-950">
              Holistic Healing Through Faith
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              We combine biblical wisdom with natural remedies to promote whole-body wellness—mind, body, and spirit—guided by God's healing power.
            </p>
          </div>

          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 bg-amber-500 text-emerald-950 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-emerald-950">
              Wellness Rooted in Scripture
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              Our approach integrates the teachings of Jesus, offering a faith-driven path to physical, emotional, and spiritual well-being.
            </p>
          </div>

          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 bg-emerald-800 text-amber-300 rounded-2xl flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-emerald-950">
              Empowering You to Live Abundantly
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              We help you care for your body as God's temple, providing resources and support to live a vibrant, purpose-filled life.
            </p>
          </div>

        </div>
      </motion.section>

      {/* Why "Balm of Gilead" */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-emerald-950 text-white p-8 sm:p-12 rounded-3xl border border-emerald-800 shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-md uppercase">
            Scriptural Symbolism
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">
            Why "Balm of Gilead"
          </h2>
          <p className="text-emerald-100 text-base leading-relaxed font-light">
            {MINISTRY_INFO.whyName}
          </p>

          <div className="p-6 bg-emerald-900/80 rounded-2xl border border-emerald-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Begin Your Journey of Wholeness
              </h3>
              <p className="text-xs text-stone-300">
                At Balm of Gilead, we believe in nurturing the mind, body, and spirit. Explore our resources, embrace healing, and live in God's grace.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('prayer')}
              className="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-6 py-3 rounded-xl text-sm shrink-0 transition-all flex items-center gap-2"
            >
              <span>Submit Prayer Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Scripture Foundation Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Scripture Guidance
          </span>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 mt-2">
            Our Healing is Rooted in God’s Word
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCRIPTURE_VERSES.map((verse, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
              <p className="font-serif text-stone-800 italic text-sm leading-relaxed">
                {verse.text}
              </p>
              <div className="pt-3 border-t border-stone-100 text-xs font-bold text-emerald-800 font-sans">
                – {verse.reference}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Inspirational Quotes by Ellen G. White */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ELLEN_WHITE_QUOTES.slice(1).map((item, idx) => (
            <div key={idx} className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 space-y-3">
              <p className="font-serif text-stone-800 text-sm italic leading-relaxed">
                "{item.quote}"
              </p>
              <p className="text-xs font-semibold text-emerald-900 font-sans">
                – {item.author}, {item.source}, {item.page}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
};
