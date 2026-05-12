import { getDb } from "../src/db/mongo";

const defaultIceExhibition = {
  key: "default",
  hero: {
    chip: "ICE Exhibitions Legacy",
    title: "India's exhibition legacy, rebuilt for the next generation.",
    subtitle:
      "From landmark consumer expos to a hybrid experience platform, ICE brings brands, buyers, leaders, and communities into one high-impact marketplace.",
    backgroundImage: "/assets/hero-expo-1.jpg",
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
    image: "/assets/expo-entrance.jpg",
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
      image: "/assets/expo-stage.jpg",
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
    image: "/assets/expo-vr-zone.jpg",
    imageAlt: "Digital experience zone at exhibition",
  },
  inaugurations: [],
  testimonials: [],
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

const run = async () => {
  try {
    const db = await getDb();
    const col = db.collection("ice-exhibition-content");
    await col.updateOne({ key: "default" }, { $set: defaultIceExhibition }, { upsert: true });
    console.log("ICE Exhibition seed applied.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

run();
