export type NavigationTab = 
  | 'home' 
  | 'about' 
  | 'events' 
  | 'prayer' 
  | 'support' 
  | 'wordpress' 
  | 'contact';

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  category?: string;
  isPrivate: boolean;
  createdAt: string;
  syncedToWordPress: boolean;
  wpPostId?: number | string;
  wpStatus?: 'synced' | 'pending' | 'failed';
}

export interface MinistryEvent {
  id: string;
  title: string;
  monthYear: string;
  dateRange: string;
  speaker: string;
  speakerTitle: string;
  location: string;
  cityCountry: string;
  description: string;
  fullDetails?: string;
  imageUrl: string;
  category: 'Seminar' | 'Program' | 'Retreat';
  badgeText: string;
  featured?: boolean;
}

export interface TicketBooking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  location: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  ticketsCount: number;
  dietaryOrNotes?: string;
  bookingDate: string;
  qrCodeDataUrl?: string;
  ticketCode: string;
}

export interface WordPressConfig {
  siteUrl: string;
  username: string;
  applicationPassword?: string;
  webhookUrl?: string;
  autoSync: boolean;
  isConnected: boolean;
  lastTestedAt?: string;
  wpSiteName?: string;
}

export interface MemorableMoment {
  id: string;
  title: string;
  year: string;
  location: string;
  caption: string;
  imageUrl: string;
  category?: string;
  tag?: string;
}

export interface ScriptureVerse {
  reference: string;
  text: string;
  context?: string;
}

export interface InspiringQuote {
  quote: string;
  author: string;
  source: string;
  page?: string;
}
