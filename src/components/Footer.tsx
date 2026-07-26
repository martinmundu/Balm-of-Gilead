import React from 'react';
import { NavigationTab } from '../types';
import { MINISTRY_INFO } from '../data/content';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Heart, 
  Layers, 
  ArrowUpRight,
  Shield,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
  onOpenTicketModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenTicketModal }) => {
  return (
    <footer className="bg-[#1A2E1D] text-stone-200 border-t border-[#2D4532] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059] text-[#1A2E1D] flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Balm of Gilead
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Restoring body, mind, and spirit through holistic health, inspired biblical truth, and the divine healing presence of Jesus Christ.
            </p>
            <div className="p-3.5 bg-[#2D4532]/60 rounded-xl border border-[#3A5A40]/60 text-xs text-[#C5A059] font-serif italic">
              "{MINISTRY_INFO.jeremiah30_17}" <br />
              <span className="text-stone-400 not-italic font-sans text-[11px] block mt-1">— Jeremiah 30:17 KJV</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C5A059]" />
              <span>Ministry Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Balm of Gilead' },
                { id: 'events', label: 'Upcoming Seminars & Retreats' },
                { id: 'prayer', label: 'Prayer Request Form' },
                { id: 'support', label: 'Support & Giving' },
                { id: 'contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveTab(link.id as NavigationTab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-300 hover:text-[#C5A059] transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span className="text-[#C5A059] text-xs">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Seminars & Programs */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C5A059]" />
              <span>Seminars & Retreats</span>
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-[#2D4532]/40 rounded-xl border border-[#3A5A40]/50">
                <span className="text-xs font-bold text-[#C5A059] block uppercase">JUNE 2026</span>
                <p className="text-white font-medium">Dr. Ronald Robin Program</p>
                <p className="text-xs text-stone-400 mt-0.5">Spiritual Revival & Journey</p>
              </div>

              <div className="p-3 bg-[#2D4532]/70 rounded-xl border border-[#C5A059]/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C5A059] uppercase">OCTOBER 2026</span>
                  <span className="text-[10px] bg-[#C5A059] text-[#1A2E1D] font-bold px-1.5 py-0.5 rounded">Featured</span>
                </div>
                <p className="text-white font-medium mt-1">Barbara O’Neill Seminar</p>
                <p className="text-xs text-stone-300">3-Day Health Retreat (Near Dublin)</p>
                <button
                  onClick={onOpenTicketModal}
                  className="mt-2 text-xs text-[#C5A059] hover:text-white font-semibold flex items-center gap-1"
                >
                  <span>Book Tickets Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Get in Touch & Socials */}
          <div>
            <h4 className="text-white font-serif text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5A059]" />
              <span>Contact Ministry</span>
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Location</span>
                  <span className="text-stone-300 text-xs">Near Dublin, Ireland</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Official Email</span>
                  <a href={`mailto:${MINISTRY_INFO.email}`} className="text-[#C5A059] hover:underline text-xs">
                    {MINISTRY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block mb-2">
                  Follow & Connect
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Facebook', 'Instagram', 'YouTube', 'WhatsApp', 'Telegram', 'Spotify'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('contact');
                      }}
                      className="bg-[#2D4532] hover:bg-[#C5A059] hover:text-[#1A2E1D] text-stone-300 px-2.5 py-1.5 rounded-lg transition-colors border border-[#3A5A40]"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2D4532]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Balm of Gilead Ministry. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('prayer')} className="hover:text-[#C5A059]">
              Submit Prayer Request
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('wordpress')} className="hover:text-[#C5A059] flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>WordPress API</span>
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('about')} className="hover:text-[#C5A059]">
              Faith & Wellness
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
