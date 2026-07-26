import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NavigationTab } from '../../types';
import { MINISTRY_INFO, EVENTS_DATA, MEMORABLE_MOMENTS, ACTS_OF_APOSTLES_QUOTE } from '../../data/content';
import QRCode from 'qrcode';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  Ticket, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Leaf, 
  QrCode, 
  Gift, 
  BookOpen, 
  CheckCircle2,
  Share2
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: NavigationTab) => void;
  onOpenTicketModal: (eventId?: string) => void;
  onSelectEventDetails: (eventId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  setActiveTab, 
  onOpenTicketModal,
  onSelectEventDetails 
}) => {
  // Memorable Moments Slide State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedQrUrl, setCopiedQrUrl] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  // QR Code data URL generation
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  React.useEffect(() => {
    QRCode.toDataURL('https://balmofgileadeire.org/donate', {
      width: 200,
      margin: 1,
      color: { dark: '#064e3b', light: '#ffffff' }
    }).then(url => setQrCodeDataUrl(url)).catch(err => console.error(err));
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % MEMORABLE_MOMENTS.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + MEMORABLE_MOMENTS.length) % MEMORABLE_MOMENTS.length);
  };

  const currentMoment = MEMORABLE_MOMENTS[currentSlideIndex];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[620px] bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/80 my-2 mx-4 sm:mx-6 lg:mx-8">
        
        {/* Background Image Layer with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80"
            alt="Balm of Gilead Peaceful Nature"
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center flex flex-col items-center justify-center min-h-[620px]">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-amber-400/30 mb-6 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Jeremiah 30:17 KJV</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
            Welcome to Balm of Gilead
          </h1>

          <div className="max-w-3xl bg-emerald-900/60 p-6 sm:p-8 rounded-2xl border border-emerald-700/60 backdrop-blur-md mb-8 shadow-xl">
            <p className="font-serif text-2xl sm:text-3xl text-amber-200 italic font-medium leading-snug">
              "{MINISTRY_INFO.jeremiah30_17}"
            </p>
            <span className="text-stone-300 text-sm font-sans tracking-widest uppercase block mt-3 font-semibold">
              — Declares the Lord
            </span>
          </div>

          <p className="text-stone-200 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed font-light">
            Restoring mind, body, and spirit through holistic health, natural remedies, and the living truth of Jesus Christ—the true Balm of Gilead.
          </p>

          {/* Primary CTA Button requested in prompt */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onOpenTicketModal('barbara-oneill-2026')}
              id="hero-book-tickets-cta"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-emerald-950 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 text-lg flex items-center justify-center gap-3 border border-amber-300/60"
            >
              <Ticket className="w-6 h-6 text-emerald-950" />
              <span>Book Your Tickets for Coming Seminar</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className="w-full sm:w-auto bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-semibold px-6 py-4 rounded-2xl transition-all border border-emerald-700 flex items-center justify-center gap-2 text-base"
            >
              <span>Explore Our Foundation</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. OUR FOUNDATION: FAITH, PURPOSE, AND HEALING VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" id="foundation-section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full">
            Our Spiritual & Health Core
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-3">
            Our Foundation: Faith, Purpose, and Healing Values
          </h2>
          <p className="text-stone-600 text-base mt-2">
            Guiding lives into physical vitality, emotional resilience, and eternal readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Vision Card */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6 group-hover:bg-emerald-900 group-hover:text-amber-400 transition-colors">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-3">
                Vision
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {MINISTRY_INFO.vision}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Restoration of Mind & Spirit</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-emerald-950 transition-colors">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-3">
                Mission
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {MINISTRY_INFO.mission}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>Christ-Centered Health Education</span>
            </div>
          </div>

          {/* Our Values Card */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6 group-hover:bg-emerald-900 group-hover:text-amber-400 transition-colors">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-3">
                Our Values
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {MINISTRY_INFO.values}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Natural Living & Love</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. EVENTS CALENDAR & PICTURE SHOWCASE */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200" id="events-calendar-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-amber-800 font-bold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                Events Calendar
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-2">
                Check What’s Happening Soon
              </h2>
            </div>
            <p className="text-stone-600 text-sm max-w-md">
              BALM OF GILEAD PRESENTS transformational programs and seminars designed for your health and spiritual journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* June 2026 – Dr. Ronald Robin */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="h-48 relative overflow-hidden bg-stone-200">
                  <img
                    src={EVENTS_DATA[0].imageUrl}
                    alt={EVENTS_DATA[0].speaker}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-900 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-md">
                    JUNE 2026
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-emerald-950">
                    JUNE 2026 – Dr. Ronald Robin
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                    A powerful and inspiring program designed to uplift and strengthen your spiritual journey.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenTicketModal(EVENTS_DATA[0].id)}
                  className="w-full bg-emerald-900 hover:bg-emerald-950 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Know More & Book</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>

            {/* October 2026 – Barbara O’Neill (Featured) */}
            <div className="bg-emerald-950 text-white rounded-3xl border-2 border-amber-400 overflow-hidden shadow-2xl transition-all flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                Must Attend
              </div>

              <div>
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={EVENTS_DATA[1].imageUrl}
                    alt="Barbara O'Neill Seminar"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-amber-400 text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-xl">
                    OCTOBER 2026
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-amber-300">
                    OCTOBER 2026 – Barbara O’Neill
                  </h3>
                  <p className="text-emerald-100 text-sm mt-2 leading-relaxed font-light">
                    A life-changing health and wellness seminar focusing on natural healing and holistic living.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-amber-200 bg-emerald-900/80 p-2.5 rounded-xl border border-emerald-800">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Near Dublin, Ireland (13–15 Oct 2026)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenTicketModal('barbara-oneill-2026')}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-emerald-950 font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Place with Barbara O’Neill</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events – 2027 */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="h-48 relative overflow-hidden bg-stone-200">
                  <img
                    src={EVENTS_DATA[2].imageUrl}
                    alt="2027 Health Retreat"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-900 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-md">
                    2027 RETREAT
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    Upcoming Events – 2027
                  </span>
                  <h3 className="font-serif text-xl font-bold text-emerald-950">
                    2027 – Health Retreat
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                    Looking ahead, we are preparing something truly refreshing: A rejuvenating experience focused on physical, mental, and spiritual well-being in a peaceful environment.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveTab('events')}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Mark Your Calendars!</span>
                  <Calendar className="w-4 h-4 text-emerald-700" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED EVENT DETAILS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-event-detail">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-400/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Special Event Spotlight</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                A Journey of Healing with Barbara O’Neill
              </h2>

              <p className="text-emerald-100 text-base leading-relaxed font-light">
                Join internationally recognized health educator and wellness advocate Barbara O’Neill for an inspiring three-day health retreat near Dublin. This special event is designed to help you discover practical, natural principles for restoring health and improving your quality of life.
              </p>

              <p className="text-emerald-200/90 text-sm leading-relaxed">
                Whether you are seeking better health, caring for a loved one, or simply interested in learning more about natural wellness, this event offers valuable knowledge and encouragement for every stage of life.
              </p>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-800/80">
                <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/60">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Date</span>
                  </div>
                  <p className="text-white text-sm font-semibold">13–15 October 2026</p>
                </div>

                <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/60">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <p className="text-white text-sm font-semibold">Near Dublin, Ireland</p>
                </div>

                <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/60">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase mb-1">
                    <User className="w-4 h-4" />
                    <span>Speaker</span>
                  </div>
                  <p className="text-white text-sm font-semibold">Barbara O’Neill</p>
                </div>
              </div>

              {/* Reserve CTA */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenTicketModal('barbara-oneill-2026')}
                  className="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center gap-3 text-base"
                >
                  <Ticket className="w-5 h-5 text-emerald-950" />
                  <span>Reserve Your Place Now</span>
                </button>
              </div>
            </div>

            {/* Poster Image Area */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-4 border-amber-400/40 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                  alt="A Journey of Healing with Barbara O'Neill"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="bg-amber-400 text-emerald-950 font-bold text-xs px-2.5 py-1 rounded-md uppercase">
                      Ireland 2026
                    </span>
                    <p className="text-sm font-serif font-semibold mt-2 text-amber-100">
                      3-Day Holistic Health Retreat
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. MEMORABLE MOMENTS IRELAND SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="memorable-moments-section">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full">
            Memorable Moments Ireland
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-3">
            A Memorable Event with Barbara in Ireland 2024
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Explore pictures from past retreats and wellness gatherings.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl relative border border-stone-800">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            
            {/* Image Slide Display */}
            <div className="lg:col-span-8 relative h-80 sm:h-[460px] bg-black">
              <img
                src={currentMoment.imageUrl}
                alt={currentMoment.title}
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-amber-300 font-semibold border border-white/10">
                {currentSlideIndex + 1} / {MEMORABLE_MOMENTS.length}
              </div>
            </div>

            {/* Caption & Controls Pane */}
            <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950">
              
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
                  {currentMoment.location} • {currentMoment.year}
                </span>

                <h3 className="font-serif text-2xl font-bold text-white mb-4 leading-snug">
                  {currentMoment.title}
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  {currentMoment.caption}
                </p>
              </div>

              {/* Slider Navigation Buttons */}
              <div className="pt-6 border-t border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400">Navigate Slides</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors border border-stone-700"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold flex items-center justify-center transition-colors shadow-md"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {MEMORABLE_MOMENTS.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        idx === currentSlideIndex ? 'border-amber-400 scale-105' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={m.imageUrl} alt={m.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. SUPPORT OUR MISSION & QR CODE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="support-mission-section">
        <div className="bg-gradient-to-br from-stone-50 to-emerald-50/60 rounded-3xl p-8 sm:p-12 border border-emerald-200/80 shadow-lg">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full">
                Support Our Mission
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
                Partner With Us to Spread Health & Divine Restoration
              </h2>

              <div className="bg-white p-6 rounded-2xl border-l-4 border-amber-500 shadow-sm space-y-2">
                <p className="font-serif text-lg text-emerald-950 italic font-semibold">
                  {ACTS_OF_APOSTLES_QUOTE.quote}
                </p>
                <div className="text-xs text-stone-500 font-sans">
                  — <span className="font-semibold text-stone-700">{ACTS_OF_APOSTLES_QUOTE.source}</span>, {ACTS_OF_APOSTLES_QUOTE.page}
                </div>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed">
                Your generous contributions enable Balm of Gilead to host community health seminars, offer free natural remedy resources, support prayer requests, and extend Christ’s healing love across Ireland and beyond.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setDonationSuccess(true)}
                  className="bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                >
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span>Give a Willing Heart Offering</span>
                </button>

                <button
                  onClick={() => setActiveTab('support')}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold px-5 py-3.5 rounded-xl transition-colors text-sm"
                >
                  <span>View Giving Options & IBAN</span>
                </button>
              </div>

              {donationSuccess && (
                <div className="p-4 bg-emerald-100 text-emerald-900 rounded-xl text-sm border border-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Thank you for supporting Balm of Gilead! "God loves a cheerful giver." May the Lord bless you abundantly.</span>
                </div>
              )}
            </div>

            {/* QR CODE CARD */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-800/20 shadow-xl text-center space-y-4 max-w-sm w-full">
                
                <div className="w-12 h-12 bg-emerald-900 text-amber-300 rounded-2xl flex items-center justify-center mx-auto">
                  <QrCode className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl font-bold text-emerald-950">
                  SCAN QR CODE TO GIVE
                </h3>
                <p className="text-xs text-stone-500">
                  Scan with your mobile camera to access giving options directly.
                </p>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-center">
                  {qrCodeDataUrl ? (
                    <img src={qrCodeDataUrl} alt="Balm of Gilead Giving QR Code" className="w-44 h-44 object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-44 h-44 bg-stone-200 animate-pulse rounded-xl" />
                  )}
                </div>

                <div className="text-xs text-emerald-900 font-mono font-semibold">
                  balmofgileadeire@gmail.com
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://balmofgileadeire.org/donate');
                    setCopiedQrUrl(true);
                    setTimeout(() => setCopiedQrUrl(false), 2500);
                  }}
                  className="text-xs text-emerald-800 hover:text-emerald-950 font-bold flex items-center justify-center gap-1 mx-auto"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedQrUrl ? 'Giving Link Copied!' : 'Copy Giving Link'}</span>
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
