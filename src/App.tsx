import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/Home/HomePage';
import { AboutPage } from './components/About/AboutPage';
import { EventsPage } from './components/Events/EventsPage';
import { PrayerPage } from './components/Prayer/PrayerPage';
import { SupportPage } from './components/Support/SupportPage';
import { ContactPage } from './components/Contact/ContactPage';
import { TicketModal } from './components/Modals/TicketModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<string>('barbara-oneill-2026');

  const handleOpenTicketModal = (eventId?: string) => {
    if (eventId) {
      setSelectedEventForModal(eventId);
    }
    setTicketModalOpen(true);
  };

  const handleCloseTicketModal = () => {
    setTicketModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col selection:bg-amber-300 selection:text-emerald-950">
      
      {/* Navigation Bar with Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTicketModal={handleOpenTicketModal}
      />

      {/* Main Page View Area with Motion Tab Transition */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-6 px-2 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <HomePage
                setActiveTab={setActiveTab}
                onOpenTicketModal={handleOpenTicketModal}
                onSelectEventDetails={(evtId) => {
                  setSelectedEventForModal(evtId);
                  setActiveTab('events');
                }}
              />
            )}

            {activeTab === 'about' && (
              <AboutPage setActiveTab={setActiveTab} />
            )}

            {activeTab === 'events' && (
              <EventsPage onOpenTicketModal={handleOpenTicketModal} />
            )}

            {activeTab === 'prayer' && (
              <PrayerPage setActiveTab={setActiveTab} />
            )}

            {activeTab === 'support' && (
              <SupportPage />
            )}

            {activeTab === 'contact' && (
              <ContactPage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenTicketModal={() => handleOpenTicketModal('barbara-oneill-2026')}
      />

      {/* Ticket Reservation Modal */}
      <TicketModal
        isOpen={ticketModalOpen}
        onClose={handleCloseTicketModal}
        selectedEventId={selectedEventForModal}
      />

    </div>
  );
}
