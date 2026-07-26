import { MinistryEvent, MemorableMoment, ScriptureVerse, InspiringQuote } from '../types';

export const MINISTRY_INFO = {
  name: "Balm of Gilead",
  tagline: "Holistic Health, Inspired Truth & Divine Restoration",
  email: "balmofgileadeire@gmail.com",
  location: "Near Dublin, Ireland",
  country: "Ireland",
  jeremiah30_17: `"I will restore you to health and heal your wounds,” declares the Lord."`,
  jeremiah33_6: `"Behold, I will bring it health and healing; I will heal them and reveal to them the abundance of peace and truth."`,
  
  vision: "To restore body, mind, and spirit through holistic health, inspired truth, and a living relationship with Jesus Christ, the true Balm of Gilead—to bring the healing presence of God to broken lives.",
  
  mission: "Christ-centered health education, natural remedies, spiritual truth, and compassionate outreach are all part of our ministry's mission to spread God's healing message and enable people to experience holistic wellness and get ready for eternity.",
  
  values: "Faith-led, holistic healing for mind, body, and spirit—rooted in love, care, and natural living.",

  aboutMain: "At Balm of Gilead, we believe that true health comes from aligning the mind, body, and spirit with God’s divine plan. Inspired by Jesus’s teachings and healing ministry, our mission is to promote a holistic approach to wellness rooted in faith and biblical wisdom. We’re passionate about helping individuals embrace the abundant life God promises—one of physical vitality, spiritual peace, and emotional resilience. Whether through faith-based devotionals, nourishing recipes, or natural remedies, our goal is to empower you to care for your body as a temple of the Holy Spirit.",

  whyName: "The Balm of Gilead, referenced in scripture in Jeremiah 8:22 and 46:11, symbolizes God’s power to heal and restore. The balm of Gilead is a symbolic representation of Jesus Christ who is the ultimate healer and brings comfort, and provides healing that is physical, mental and spiritual. We aim to be the conduits who bring the comfort, restoration, and holistic health that only Jesus can provide to all who seek it. Join us on this journey of faith, health, and wholeness. Together, let’s honor the bodies God has entrusted to us and live fully in His grace.",

  socials: {
    facebook: "https://facebook.com/balmofgileadeire",
    instagram: "https://instagram.com/balmofgileadeire",
    youtube: "https://youtube.com/@balmofgilead",
    whatsapp: "https://wa.me/353870000000",
    telegram: "https://t.me/balmofgilead",
    spotify: "https://spotify.com/show/balmofgilead"
  }
};

export const EVENTS_DATA: MinistryEvent[] = [
  {
    id: "dr-ronald-robin-2026",
    title: "Spiritual Revival & Health Program",
    monthYear: "JUNE 2026",
    dateRange: "12–14 June 2026",
    speaker: "Dr. Ronald Robin",
    speakerTitle: "Spiritual Health Educator & Pastor",
    location: "Dublin Community Convention Centre",
    cityCountry: "Dublin, Ireland",
    description: "A powerful and inspiring program designed to uplift and strengthen your spiritual journey.",
    fullDetails: "Join Dr. Ronald Robin for a transformative weekend focusing on spiritual renewal, prayerful resilience, and Christ-centered living. Learn how spiritual peace influences physical longevity.",
    imageUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80",
    category: "Program",
    badgeText: "Uplifting & Inspiring",
    featured: false
  },
  {
    id: "barbara-oneill-2026",
    title: "A Journey of Healing with Barbara O’Neill",
    monthYear: "OCTOBER 2026",
    dateRange: "13–15 October 2026",
    speaker: "Barbara O’Neill",
    speakerTitle: "Internationally Recognized Health Educator & Wellness Advocate",
    location: "Retreat Sanctuary Near Dublin",
    cityCountry: "Near Dublin, Ireland",
    description: "A life-changing health and wellness seminar focusing on natural healing and holistic living.",
    fullDetails: "Join internationally recognized health educator and wellness advocate Barbara O’Neill for an inspiring three-day health retreat near Dublin. This special event is designed to help you discover practical, natural principles for restoring health and improving your quality of life. Whether you are seeking better health, caring for a loved one, or simply interested in learning more about natural wellness, this event offers valuable knowledge and encouragement for every stage of life.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    category: "Seminar",
    badgeText: "Featured Seminar",
    featured: true
  },
  {
    id: "health-retreat-2027",
    title: "Rejuvenating Health Retreat 2027",
    monthYear: "SPRING 2027",
    dateRange: "May 2027 (Dates to be announced)",
    speaker: "Balm of Gilead Wellness Team",
    speakerTitle: "Holistic Health Practitioners & Medical Missionaries",
    location: "Peaceful Irish Countryside Estate",
    cityCountry: "County Wicklow / Near Dublin, Ireland",
    description: "A rejuvenating experience focused on physical, mental, and spiritual well-being in a peaceful environment.",
    fullDetails: "Looking ahead to 2027, we are preparing something truly refreshing. Immerse yourself in practical herbal cooking, hydrotherapy workshops, morning reflection walks, and restorative fellowship.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    category: "Retreat",
    badgeText: "Upcoming 2027",
    featured: false
  }
];

export const MEMORABLE_MOMENTS: MemorableMoment[] = [
  {
    id: "moment-1",
    title: "A Memorable Seminar with Barbara O’Neill in Ireland",
    year: "2024",
    location: "Dublin, Ireland",
    caption: "Attendees discovering natural hydrotherapy remedies, cellular health, and biblical wellness principles with Barbara O'Neill.",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    category: "Seminars",
    tag: "FEATURED SEMINAR"
  },
  {
    id: "moment-2",
    title: "Holistic Health & Herbal Poultice Workshop",
    year: "2024",
    location: "County Kildare, Ireland",
    caption: "Hands-on workshop teaching activated charcoal, castor oil packs, and natural herbal remedies for home care.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
    category: "Workshops",
    tag: "PRACTICAL WELLNESS"
  },
  {
    id: "moment-3",
    title: "Morning Worship & Coastal Fellowship Walk",
    year: "2024",
    location: "Dublin Coast, Ireland",
    caption: "Connecting with God in nature through morning praise, prayer devotionals, and refreshing coastal walks.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    category: "Fellowship",
    tag: "SPIRITUAL RENEWAL"
  },
  {
    id: "moment-4",
    title: "Plant-Based Culinary Health Class",
    year: "2024",
    location: "Dublin, Ireland",
    caption: "Preparing wholesome, unrefined plant meals and sourdough loaves that honor the body as God's temple.",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    category: "Culinary",
    tag: "HEALTHY NUTRITION"
  },
  {
    id: "moment-5",
    title: "Hydrotherapy & Water Treatment Demonstration",
    year: "2024",
    location: "Wicklow Mountains, Ireland",
    caption: "Demonstrating the therapeutic application of hot and cold water treatments for immune system boosting.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    category: "Workshops",
    tag: "NATURAL REMEDIES"
  },
  {
    id: "moment-6",
    title: "Youth Health Mission & Fellowship Retreat",
    year: "2024",
    location: "Galway Countryside, Ireland",
    caption: "Inspiring the next generation with practical health evangelism, scripture memorization, and team building.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    category: "Fellowship",
    tag: "YOUTH & FAMILY"
  }
];

export const OFFERINGS_PRAYERS = [
  {
    number: "01",
    title: "Prayer for Physical Healing",
    prayer: "Lord, we come before You with grateful hearts, trusting in Your divine power to heal and restore. We ask for Your healing touch upon our bodies, that You may renew our strength and vitality. Grant us comfort and relief from pain, and help us honor our bodies as temples of Your Holy Spirit. In Jesus’ name, we pray. Amen."
  },
  {
    number: "02",
    title: "Prayer for Emotional Well-Being",
    prayer: "Heavenly Father, we pray for peace and emotional healing. Heal the wounds of our hearts and grant us the strength to overcome fear, anxiety, and stress. Fill us with Your peace that surpasses all understanding and help us to trust in Your perfect plan for our lives. In Your name, we pray. Amen."
  },
  {
    number: "03",
    title: "Prayer for Strength and Resilience",
    prayer: "Lord, we ask for Your strength to face the challenges ahead. In times of weakness, we rely on Your power to sustain us. Grant us resilience and courage to endure with faith and hope. May Your grace empower us to rise above trials and walk in health and wholeness. In Jesus’ name, Amen."
  }
];

export const SCRIPTURE_VERSES: ScriptureVerse[] = [
  {
    reference: "Jeremiah 30:17",
    text: "“But I will restore you to health and heal your wounds,’ declares the Lord, ‘because you are called an outcast, Zion for whom no one cares.”"
  },
  {
    reference: "1 Corinthians 6:19-20",
    text: "“Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.”"
  },
  {
    reference: "3 John 1:2",
    text: "“Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.”"
  }
];

export const ELLEN_WHITE_QUOTES: InspiringQuote[] = [
  {
    quote: "Prayer is the opening of the heart to God as to a friend. Not that it is necessary in order to make known to God what we are, but in order to enable us to receive Him. Prayer does not bring God down to us, but brings us up to Him.",
    author: "Ellen G. White",
    source: "Steps to Christ"
  },
  {
    quote: "The body is the only medium through which the mind and the soul are developed for the upbuilding of character. It is the only medium through which we can glorify God.",
    author: "Ellen G. White",
    source: "Ministry of Healing",
    page: "p. 143"
  },
  {
    quote: "Health is not only to be prized as a blessing in itself, but as a means of doing good in the world. We are to cherish our health, that we may live to the glory of God.",
    author: "Ellen G. White",
    source: "The Ministry of Healing",
    page: "p. 127"
  }
];

export const ACTS_OF_APOSTLES_QUOTE = {
  quote: "“God loves a cheerful giver, and those who give with a willing heart will be blessed.”",
  source: "The Acts of the Apostles",
  page: "Page 339"
};
