import { expoImages } from "@/data/expo-data";

export type Cta = {
  label: string;
  href: string;
};

export type IceExhibitionContent = {
  hero: {
    chip: string;
    title: string;
    subtitle: string;
    backgroundImage: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  intro: {
    label: string;
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    statOneValue: string;
    statOneLabel: string;
    statTwoValue: string;
    statTwoLabel: string;
  };
  stats: { value: string; label: string }[];
  originRows: {
    chip: string;
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  }[];
  pillars: { title: string; body: string }[];
  currentStatus: {
    label: string;
    title: string;
    bullets: string[];
    cta: Cta;
    image: string;
    imageAlt: string;
  };
  inaugurations: {
    name: string;
    title: string;
    year: string;
    image: string;
  }[];
  testimonials: {
    name: string;
    designation: string;
    quote: string;
    image: string;
    rating: number;
  }[];
  logoStrip: {
    title: string;
    logos: string[];
  };
  closingCta: {
    title: string;
    subtitle: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
};

export const defaultIceExhibitionContent: IceExhibitionContent = {
  hero: {
    chip: "ICE Exhibitions Legacy",
    title: "India's exhibition legacy, rebuilt for the next generation.",
    subtitle:
      "From landmark consumer expos to a hybrid experience platform, ICE brings brands, buyers, leaders, and communities into one high-impact marketplace.",
    backgroundImage: expoImages.hero,
    primaryCta: { label: "Partner with ICE", href: "/contact" },
    secondaryCta: { label: "Explore legacy", href: "/gallery" },
  },
  intro: {
    label: "What is ICE",
    title: "A legacy exhibition platform where commerce meets culture.",
    paragraphs: [
      "ICE stands for large-scale exhibitions that connect people with products, technologies, lifestyle ideas, and brand experiences in a memorable physical environment.",
      "The original format made the expo floor a powerful discovery engine, with grand entrances, product launches, demo zones, consumer offers, and crowded halls that created real market momentum.",
      "Today, ICE is evolving into a wider ecosystem that combines on-ground exhibitions with digital storytelling, media visibility, data-led engagement, and stronger partner journeys.",
      "It is built for brands that need attention, buyers who want discovery, and communities that value experiences they can see, touch, test, and remember.",
    ],
    image: expoImages.entrance,
    imageAlt: "ICE exhibition entrance",
    statOneValue: "1995",
    statOneLabel: "first landmark era",
    statTwoValue: "2.0",
    statTwoLabel: "digital expansion",
  },
  stats: [
    { value: "30+", label: "years of exhibition legacy" },
    { value: "10+", label: "cities activated" },
    { value: "10K+", label: "brands showcased" },
    { value: "20M+", label: "buyers and visitors reached" },
  ],
  originRows: [
    {
      chip: "ICE 1.0",
      title: "A physical marketplace built for discovery",
      paragraphs: [
        "ICE began as a high-energy consumer exhibition where families, trade buyers, retailers, and brands could meet under one roof.",
        "Its signature entrances, large-format halls, and live product moments helped make the expo feel like both a market and a city festival.",
      ],
      image: "https://i.ibb.co/7NbRjS1s/Colorful-entrance-to-ICE-1995.png",
      imageAlt: "ICE 1995 entrance",
    },
    {
      chip: "ICE 2.0",
      title: "A modern platform for hybrid growth",
      paragraphs: [
        "The new ICE vision expands that physical strength into media, data, digital content, creator-led launches, and year-round brand engagement.",
        "It keeps the crowd energy of the original exhibitions while giving partners sharper storytelling, better lead capture, and stronger national reach.",
      ],
      image: expoImages.stage,
      imageAlt: "Modern ICE stage",
    },
  ],
  pillars: [
    {
      title: "Experience First",
      body: "Every zone is planned around how people arrive, move, pause, try, compare, and remember the brand moment.",
    },
    {
      title: "Brand Growth",
      body: "ICE gives exhibitors visibility, qualified conversations, launch theatre, and a sharper path from attention to conversion.",
    },
    {
      title: "Community Scale",
      body: "The platform connects consumers, retailers, innovators, creators, and partners across cities and generations.",
    },
  ],
  currentStatus: {
    label: "Current status",
    title: "ICE is being shaped into a modern growth ecosystem.",
    bullets: [
      "ICE legacy content is being organized into dedicated digital sections.",
      "iGEN, IGN, and IGE extensions are shaping the next phase of the platform.",
      "Brand, buyer, gallery, founder, and VVIP stories are being prepared for richer browsing.",
      "The website now supports a stronger pathway for partners, sponsors, sellers, and visitors.",
    ],
    cta: { label: "View sponsor options", href: "/sponsor" },
    image: expoImages.vrZone,
    imageAlt: "Digital experience zone at exhibition",
  },
  inaugurations: [
    {
      name: "Dr. Anika Sharma",
      title: "Union Minister",
      year: "1995",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
    },
    {
      name: "Raj Malhotra",
      title: "Industry Leader",
      year: "2001",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
    },
    {
      name: "Justice Kavya Rao",
      title: "Guest of Honour",
      year: "2010",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=800&fit=crop",
    },
    {
      name: "Meera Joshi",
      title: "Global Investor",
      year: "2024",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop",
    },
  ],
  testimonials: [
    {
      name: "Priya Menon",
      designation: "Founder, Studio Meridian",
      quote:
        "ICE gave our launch the kind of visibility we usually associate with national campaigns. The crowd stayed engaged from opening hour to closing night.",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&h=800&fit=crop",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      designation: "Electronics Buyer",
      quote:
        "I came for product deals and left with vendor contacts, live demos, and a shortlist of brands I could trust immediately.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      rating: 5,
    },
    {
      name: "Nisha Kapoor",
      designation: "COO, Arka Living",
      quote:
        "The exhibition felt carefully directed. Buyers knew where to go, the booth teams stayed busy, and every key moment felt planned.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
      rating: 5,
    },
  ],
  logoStrip: {
    title: "Brands that have shaped the ICE story.",
    logos: ["Godrej", "LG", "Samsung", "Philips", "Sharp", "Tata Sky", "Reliance", "Electrolux", "Next", "VITS", "Radio Indigo", "Home World"],
  },
  closingCta: {
    title: "Build your next brand moment with ICE.",
    subtitle:
      "Partner, exhibit, sponsor, or explore the archive as ICE moves from exhibition legacy into a future-ready experience network.",
    primaryCta: { label: "Start a conversation", href: "/contact" },
    secondaryCta: { label: "View brands", href: "/brands" },
  },
};

export const mergeIceExhibitionContent = (payload?: Partial<IceExhibitionContent> | null): IceExhibitionContent => ({
  ...defaultIceExhibitionContent,
  ...(payload || {}),
  hero: { ...defaultIceExhibitionContent.hero, ...(payload?.hero || {}) },
  intro: { ...defaultIceExhibitionContent.intro, ...(payload?.intro || {}) },
  currentStatus: { ...defaultIceExhibitionContent.currentStatus, ...(payload?.currentStatus || {}) },
  logoStrip: { ...defaultIceExhibitionContent.logoStrip, ...(payload?.logoStrip || {}) },
  closingCta: { ...defaultIceExhibitionContent.closingCta, ...(payload?.closingCta || {}) },
});
