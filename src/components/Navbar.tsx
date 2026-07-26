import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { MINISTRY_INFO } from '../data/content';
import { auth, signInWithGoogle, signOutUser } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  Heart, 
  Calendar, 
  Sparkles, 
  Globe, 
  Mail, 
  Menu, 
  X, 
  Ticket, 
  ShieldCheck, 
  Layers,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenTicketModal: (eventId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenTicketModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'prayer', label: 'Prayer Requests', icon: <Heart className="w-4 h-4" />, badge: 'Active' },
    { id: 'support', label: 'Support Us', icon: <Globe className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCFB]/95 backdrop-blur-md shadow-sm border-b border-stone-200/80">
      {/* Top Banner with Scripture */}
      <div className="bg-[#1A2E1D] text-stone-200 text-xs py-2 px-4 border-b border-[#2D4532]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-300 text-center md:text-left">
            <span className="bg-[#3A5A40] text-[#C5A059] px-2.5 py-0.5 rounded font-serif text-[11px] font-bold tracking-wider border border-[#C5A059]/20">
              JEREMIAH 30:17
            </span>
            <span className="italic font-serif">"{MINISTRY_INFO.jeremiah30_17}"</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-300">
            <a 
              href={`mailto:${MINISTRY_INFO.email}`} 
              className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{MINISTRY_INFO.email}</span>
            </a>
            <span className="hidden sm:inline text-stone-600">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{MINISTRY_INFO.location}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            id="brand-logo-btn"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1A2E1D] p-2.5 flex items-center justify-center text-[#C5A059] shadow-md group-hover:scale-105 transition-transform border border-[#3A5A40]">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A2E1D] block leading-none">
                Balm of Gilead
              </span>
              <span className="text-xs text-stone-500 tracking-wide font-medium block mt-1">
                Faith • Purpose • Holistic Healing
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F4F1ED] p-1.5 rounded-2xl border border-stone-200/80" id="desktop-navbar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-tab-${item.id}`}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#1A2E1D] text-white shadow-sm font-semibold'
                      : 'text-stone-700 hover:text-[#1A2E1D] hover:bg-stone-200/60'
                  }`}
                >
                  <span className={isActive ? 'text-[#C5A059]' : 'text-stone-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isActive ? 'bg-[#C5A059] text-[#1A2E1D]' : 'bg-[#3A5A40]/10 text-[#3A5A40]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Ticket Action Button & Firebase Google Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="flex items-center gap-2 bg-[#1A2E1D] text-white pl-3 pr-2 py-1.5 rounded-xl border border-[#3A5A40] text-xs">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon className="w-4 h-4 text-[#C5A059]" />
                )}
                <span className="hidden md:inline font-semibold text-stone-200">{user.displayName?.split(' ')[0]}</span>
                <button
                  onClick={() => signOutUser()}
                  className="p-1 hover:bg-[#3A5A40] rounded-lg text-amber-300 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                  } catch (err) {
                    // Suppress unhandled rejections
                  }
                }}
                className="flex items-center gap-1.5 bg-[#1A2E1D] hover:bg-[#2D4532] text-[#C5A059] font-semibold px-3 py-2 rounded-xl text-xs border border-[#3A5A40] shadow-sm transition-all"
                title="Sign in with Google"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            <button
              onClick={() => onOpenTicketModal('barbara-oneill-2026')}
              id="header-book-tickets-btn"
              className="hidden sm:flex items-center gap-2 bg-[#3A5A40] hover:bg-[#2D4532] text-white font-semibold px-4.5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all border border-[#3A5A40] text-sm"
            >
              <Ticket className="w-4 h-4 text-[#C5A059]" />
              <span>Book Seminar</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="lg:hidden p-2.5 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-2" id="mobile-menu-drawer">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-3 py-1">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1A2E1D] text-white font-semibold'
                    : 'text-stone-800 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#C5A059]' : 'text-[#3A5A40]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[#C5A059] text-[#1A2E1D]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-stone-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTicketModal('barbara-oneill-2026');
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#3A5A40] hover:bg-[#2D4532] text-white font-semibold py-3 px-4 rounded-xl shadow-sm text-base"
            >
              <Ticket className="w-5 h-5 text-[#C5A059]" />
              <span>Book Seminar Tickets</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
