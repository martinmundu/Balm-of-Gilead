import React from 'react';
import { motion } from 'motion/react';
import { EVENTS_DATA } from '../../data/content';
import { EventGallery } from './EventGallery';
import { 
  Calendar, 
  MapPin, 
  User, 
  Ticket, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  Clock, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface EventsPageProps {
  onOpenTicketModal: (eventId?: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onOpenTicketModal }) => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-r from-[#1A2E1D] via-[#2D4532] to-[#1A2E1D] text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl border border-emerald-800/50 my-2 mx-4 sm:mx-6 lg:mx-8"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#3A5A40] text-[#C5A059] text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-widest border border-[#C5A059]/30">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>BALM OF GILEAD PRESENTS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Upcoming Seminars & Health Retreats
          </h1>

          <p className="text-stone-200 text-base max-w-2xl mx-auto font-light">
            Check what’s happening soon. Join world-renowned health educators and spiritual leaders for life-changing events in Ireland.
          </p>
        </div>
      </motion.section>

      {/* Events List */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-12">
          {EVENTS_DATA.map((evt) => (
            <div 
              key={evt.id} 
              className={`bg-white rounded-3xl border ${
                evt.featured ? 'border-2 border-[#C5A059] shadow-2xl' : 'border-stone-200 shadow-lg'
              } overflow-hidden transition-all grid grid-cols-1 lg:grid-cols-12`}
            >
              {/* Event Image */}
              <div className="lg:col-span-5 relative min-h-[320px] bg-stone-100">
                <img
                  src={evt.imageUrl}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#1A2E1D] text-[#C5A059] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md uppercase">
                  {evt.monthYear}
                </div>
                {evt.featured && (
                  <div className="absolute top-4 right-4 bg-[#C5A059] text-[#1A2E1D] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider">
                    Featured Seminar
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3A5A40] uppercase tracking-widest">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>{evt.category} • {evt.badgeText}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A2E1D]">
                    {evt.title}
                  </h2>

                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                    {evt.fullDetails || evt.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-700 bg-[#F4F1ED] p-4 rounded-2xl border border-stone-200/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#3A5A40]" />
                      <div>
                        <span className="font-bold block text-stone-900">Dates</span>
                        <span>{evt.dateRange}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#3A5A40]" />
                      <div>
                        <span className="font-bold block text-stone-900">Location</span>
                        <span>{evt.location} ({evt.cityCountry})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-2 pt-1 border-t border-stone-200">
                      <User className="w-4 h-4 text-[#7C4A32]" />
                      <div>
                        <span className="font-bold text-stone-900">{evt.speaker}</span> – <span className="text-stone-500">{evt.speakerTitle}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenTicketModal(evt.id)}
                    className="bg-[#3A5A40] hover:bg-[#2D4532] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
                  >
                    <Ticket className="w-4 h-4 text-[#C5A059]" />
                    <span>Book Your Tickets</span>
                  </button>

                  <button
                    onClick={() => onOpenTicketModal(evt.id)}
                    className="text-[#3A5A40] hover:text-[#1A2E1D] font-bold text-sm flex items-center gap-1"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Event Gallery Component */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <EventGallery />
      </motion.section>

    </div>
  );
};
