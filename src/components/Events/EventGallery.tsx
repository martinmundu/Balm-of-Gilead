import React, { useState, useEffect, useRef } from 'react';
import { MEMORABLE_MOMENTS } from '../../data/content';
import { MemorableMoment } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Maximize2, 
  X, 
  MapPin, 
  Calendar, 
  Sparkles,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';

interface EventGalleryProps {
  moments?: MemorableMoment[];
  title?: string;
  subtitle?: string;
}

export const EventGallery: React.FC<EventGalleryProps> = ({
  moments = MEMORABLE_MOMENTS,
  title = "Past Seminar Memories & Photo Gallery",
  subtitle = "Capturing moments of spiritual renewal, natural remedy workshops, plant-based culinary classes, and outdoor fellowship across Ireland."
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Categories list
  const categories = ['All', 'Seminars', 'Workshops', 'Fellowship', 'Culinary'];

  // Filtered moments
  const filteredMoments = selectedCategory === 'All'
    ? moments
    : moments.filter(m => m.category === selectedCategory || m.tag?.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const activeMoment = filteredMoments[currentIndex] || filteredMoments[0];

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying || filteredMoments.length <= 1 || lightboxOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredMoments.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, filteredMoments.length, lightboxOpen]);

  const handleNext = () => {
    if (filteredMoments.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredMoments.length);
  };

  const handlePrev = () => {
    if (filteredMoments.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredMoments.length) % filteredMoments.length);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  if (!activeMoment) return null;

  return (
    <section className="bg-[#FDFCFB] border border-stone-200/80 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 my-8 relative overflow-hidden" id="past-events-gallery">
      
      {/* Background Subtle Accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3A5A40]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#7C4A32]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Category Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#3A5A40]/10 text-[#3A5A40] text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest border border-[#3A5A40]/20">
            <Camera className="w-3.5 h-3.5 text-[#3A5A40]" />
            <span>Interactive Gallery</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2E1D] tracking-tight">
            {title}
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 lg:pt-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#3A5A40] text-white border-[#3A5A40] shadow-md'
                  : 'bg-white text-stone-600 hover:text-[#1A2E1D] border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Carousel Card Container */}
      <div 
        className="relative bg-[#1A2E1D] rounded-3xl overflow-hidden shadow-2xl border border-stone-800 text-white min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-end group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            key={activeMoment.id}
            src={activeMoment.imageUrl}
            alt={activeMoment.title}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E1D] via-[#1A2E1D]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2E1D]/80 via-transparent to-transparent" />
        </div>

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {activeMoment.tag && (
              <span className="bg-[#C5A059] text-[#1A2E1D] text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-md">
                {activeMoment.tag}
              </span>
            )}
            <span className="bg-[#1A2E1D]/80 backdrop-blur-md text-stone-200 text-[11px] font-semibold px-3 py-1.5 rounded-xl border border-white/10 shadow-md">
              {currentIndex + 1} / {filteredMoments.length}
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-[#1A2E1D]/80 hover:bg-[#3A5A40] backdrop-blur-md text-white border border-white/10 transition-all shadow-md"
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#C5A059]" /> : <Play className="w-4 h-4 text-white" />}
            </button>

            <button
              onClick={() => setLightboxOpen(true)}
              className="p-2.5 rounded-xl bg-[#1A2E1D]/80 hover:bg-[#3A5A40] backdrop-blur-md text-white border border-white/10 transition-all shadow-md flex items-center gap-1.5 text-xs font-semibold"
              title="Expand Photo"
            >
              <Maximize2 className="w-4 h-4 text-[#C5A059]" />
              <span className="hidden sm:inline">Zoom</span>
            </button>
          </div>
        </div>

        {/* Center / Side Arrow Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-2xl bg-[#1A2E1D]/80 hover:bg-[#3A5A40] text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all opacity-90 group-hover:opacity-100 shadow-xl"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#C5A059]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-2xl bg-[#1A2E1D]/80 hover:bg-[#3A5A40] text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all opacity-90 group-hover:opacity-100 shadow-xl"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 text-[#C5A059]" />
        </button>

        {/* Bottom Details Content Overlay */}
        <div className="relative z-10 p-6 sm:p-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#C5A059] font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 bg-[#3A5A40]/80 px-2.5 py-1 rounded-lg border border-[#C5A059]/30 text-stone-100">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              {activeMoment.year}
            </span>
            <span className="flex items-center gap-1.5 bg-[#1A2E1D]/80 px-2.5 py-1 rounded-lg border border-white/10 text-stone-200">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              {activeMoment.location}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {activeMoment.title}
          </h3>

          <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
            {activeMoment.caption}
          </p>
        </div>

      </div>

      {/* Interactive Thumbnails Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-stone-500">
          <span>Moments Overview</span>
          <span>Click image to view</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {filteredMoments.map((moment, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={moment.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-20 rounded-2xl overflow-hidden border-2 transition-all text-left ${
                  isActive 
                    ? 'border-[#3A5A40] ring-4 ring-[#3A5A40]/20 shadow-lg scale-105' 
                    : 'border-stone-200 hover:border-stone-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={moment.imageUrl}
                  alt={moment.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 ${isActive ? 'bg-[#3A5A40]/10' : 'bg-black/30'}`} />
                <span className="absolute bottom-1.5 left-2 right-2 text-[9px] font-bold text-white truncate block drop-shadow-md">
                  {moment.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full bg-[#1A2E1D] text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-700 flex flex-col lg:flex-row max-h-[90vh]">
            <div className="lg:flex-1 relative bg-black flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
              <img
                src={activeMoment.imageUrl}
                alt={activeMoment.title}
                className="max-h-[70vh] w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-8 lg:w-80 flex flex-col justify-between space-y-6 bg-[#1A2E1D] border-t lg:border-t-0 lg:border-l border-stone-800">
              <div className="space-y-4">
                <span className="bg-[#7C4A32] text-amber-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                  {activeMoment.tag || 'GALLERY MOMENT'}
                </span>

                <h3 className="font-serif text-2xl font-bold text-white">
                  {activeMoment.title}
                </h3>

                <div className="space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C5A059]" />
                    <span>{activeMoment.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C5A059]" />
                    <span>{activeMoment.location}</span>
                  </div>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed border-t border-stone-800 pt-4">
                  {activeMoment.caption}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-800 text-xs">
                <button
                  onClick={handlePrev}
                  className="text-[#C5A059] hover:underline font-bold flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <span className="text-stone-400">
                  {currentIndex + 1} / {filteredMoments.length}
                </span>
                <button
                  onClick={handleNext}
                  className="text-[#C5A059] hover:underline font-bold flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
