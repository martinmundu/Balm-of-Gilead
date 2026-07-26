import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENTS_DATA } from '../../data/content';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { 
  X, 
  Ticket, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle2, 
  QrCode, 
  Download, 
  Printer, 
  Sparkles,
  Phone,
  Mail,
  Users
} from 'lucide-react';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEventId?: string;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, selectedEventId }) => {
  const [eventId, setEventId] = useState(selectedEventId || 'barbara-oneill-2026');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (selectedEventId) {
      setEventId(selectedEventId);
    }
  }, [selectedEventId]);

  if (!isOpen) return null;

  const currentEvent = EVENTS_DATA.find(e => e.id === eventId) || EVENTS_DATA[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: currentEvent.id,
          eventTitle: currentEvent.title,
          eventDate: currentEvent.dateRange,
          attendeeName: name.trim(),
          attendeeEmail: email.trim(),
          attendeePhone: phone.trim(),
          ticketsCount: seats
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !data.booking?.ticketCode) {
        throw new Error(data.message || 'Unable to reserve the ticket.');
      }

      const ticketCode = data.booking.ticketCode;
      const qrData = await QRCode.toDataURL(
        `https://balmofgilead.org/verify-ticket?code=${encodeURIComponent(ticketCode)}`,
        { width: 250, margin: 1, color: { dark: '#064e3b', light: '#ffffff' } }
      );

      setQrCodeUrl(qrData);
      setBookingSuccess({
        ticketCode,
        attendeeName: name,
        attendeeEmail: email,
        attendeePhone: phone,
        eventTitle: currentEvent.title,
        speaker: currentEvent.speaker,
        dateRange: currentEvent.dateRange,
        location: currentEvent.location,
        seats,
        bookingDate: new Date().toLocaleDateString()
      });

      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Error booking ticket:', err);
      alert(err instanceof Error ? err.message : 'Unable to complete the reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setBookingSuccess(null);
    setName('');
    setEmail('');
    setPhone('');
    setSeats(1);
    setNotes('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-sm overflow-y-auto" 
          id="ticket-modal-overlay"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden my-8 relative" 
            id="ticket-modal-content"
          >
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

        {!bookingSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white p-6 sm:p-8">
              <div className="flex items-center gap-2 text-amber-300 font-serif text-sm font-semibold uppercase tracking-wider mb-2">
                <Ticket className="w-4 h-4" />
                <span>Reserve Event Seat & Tickets</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {currentEvent.title}
              </h3>
              <p className="text-emerald-100 text-sm mt-1">
                With {currentEvent.speaker} ({currentEvent.speakerTitle})
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-emerald-200 bg-emerald-900/60 p-3 rounded-xl border border-emerald-700/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{currentEvent.dateRange}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{currentEvent.location}</span>
                </span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              
              {/* Event Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Select Event / Seminar
                </label>
                <select
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                >
                  {EVENTS_DATA.map(evt => (
                    <option key={evt.id} value={evt.id}>
                      {evt.monthYear} – {evt.speaker} ({evt.title})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mary O'Connor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. mary@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Seats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="+353 87 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Number of Attendees
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <select
                      value={seats}
                      onChange={(e) => setSeats(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Person / Ticket' : 'People / Tickets'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Special Health Requirements / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention dietary requests or mobility needs..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 hover:to-black text-amber-300 font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base border border-amber-400/30"
              >
                {isSubmitting ? (
                  <span>Generating Official Event Pass...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Confirm Reservation & Generate Ticket</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-stone-500">
                🔒 Free reservation sponsored by Balm of Gilead Ministry. Check-in pass generated instantly.
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation & Ticket Pass View */
          <div className="p-6 sm:p-8 bg-stone-50">
            <div className="text-center max-w-md mx-auto mb-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-950">
                Reservation Confirmed!
              </h3>
              <p className="text-stone-600 text-sm mt-1">
                Your ticket pass for <strong className="text-stone-900">{bookingSuccess.eventTitle}</strong> is ready.
              </p>
            </div>

            {/* Printable Event Pass Card */}
            <div className="bg-white rounded-2xl border-2 border-emerald-800 shadow-xl p-6 relative overflow-hidden print:border-black" id="printable-ticket-pass">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-emerald-950 text-base block">Balm of Gilead</span>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold block">Official Event Pass</span>
                  </div>
                </div>

                <span className="bg-emerald-100 text-emerald-800 font-mono text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                  {bookingSuccess.ticketCode}
                </span>
              </div>

              {/* Ticket Content */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5 items-center">
                
                <div className="sm:col-span-2 space-y-2 text-sm">
                  <div>
                    <span className="text-xs text-stone-400 font-bold uppercase block">Attendee Name</span>
                    <span className="font-bold text-stone-900 text-base">{bookingSuccess.attendeeName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-stone-400 font-semibold block">Date</span>
                      <span className="text-stone-800 font-medium">{bookingSuccess.dateRange}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-semibold block">Seats</span>
                      <span className="text-stone-800 font-medium">{bookingSuccess.seats} Ticket(s)</span>
                    </div>
                  </div>

                  <div className="text-xs">
                    <span className="text-stone-400 font-semibold block">Speaker</span>
                    <span className="text-emerald-900 font-bold">{bookingSuccess.speaker}</span>
                  </div>

                  <div className="text-xs">
                    <span className="text-stone-400 font-semibold block">Location</span>
                    <span className="text-stone-800">{bookingSuccess.location}</span>
                  </div>
                </div>

                {/* QR Code Display */}
                <div className="flex flex-col items-center justify-center p-2 bg-stone-50 rounded-xl border border-stone-200">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="Ticket QR Code" className="w-32 h-32 object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <QrCode className="w-24 h-24 text-emerald-900" />
                  )}
                  <span className="text-[10px] text-stone-500 font-mono mt-1">Scan at Entrance</span>
                </div>

              </div>

              {/* Footer text */}
              <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex justify-between items-center">
                <span>Confirmation sent to: {bookingSuccess.attendeeEmail}</span>
                <span>Ireland 2026</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-emerald-900 text-white hover:bg-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Print Pass</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-stone-200 text-stone-800 hover:bg-stone-300 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <span>Book Another Ticket</span>
              </button>

              <button
                onClick={onClose}
                className="bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <span>Done</span>
              </button>
            </div>

          </div>
        )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
