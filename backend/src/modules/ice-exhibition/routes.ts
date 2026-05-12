import { FastifyInstance } from "fastify";
import { z } from "zod";
import { getDb } from "../../db/mongo";

const imageSchema = z.string().min(1);

const ctaSchema = z.object({
  label: z.string().default(""),
  href: z.string().default(""),
});

const heroSchema = z.object({
  chip: z.string().default(""),
  title: z.string().default(""),
  subtitle: z.string().default(""),
  backgroundImage: imageSchema,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
});

const introSchema = z.object({
  label: z.string().default(""),
  title: z.string().default(""),
  paragraphs: z.array(z.string()).default([]),
  image: imageSchema,
  imageAlt: z.string().default(""),
  statOneValue: z.string().default(""),
  statOneLabel: z.string().default(""),
  statTwoValue: z.string().default(""),
  statTwoLabel: z.string().default(""),
});

const statSchema = z.object({
  value: z.string().default(""),
  label: z.string().default(""),
});

const originRowSchema = z.object({
  chip: z.string().default(""),
  title: z.string().default(""),
  paragraphs: z.array(z.string()).default([]),
  image: imageSchema,
  imageAlt: z.string().default(""),
});

const pillarSchema = z.object({
  title: z.string().default(""),
  body: z.string().default(""),
});

const currentStatusSchema = z.object({
  label: z.string().default(""),
  title: z.string().default(""),
  bullets: z.array(z.string()).default([]),
  cta: ctaSchema,
  image: imageSchema,
  imageAlt: z.string().default(""),
});

const inaugurationSchema = z.object({
  name: z.string().default(""),
  title: z.string().default(""),
  year: z.string().default(""),
  image: imageSchema,
});

const testimonialSchema = z.object({
  name: z.string().default(""),
  designation: z.string().default(""),
  quote: z.string().default(""),
  image: imageSchema,
  rating: z.number().min(1).max(5).default(5),
});

const logoStripSchema = z.object({
  title: z.string().default(""),
  logos: z.array(z.string()).default([]),
});

const closingCtaSchema = z.object({
  title: z.string().default(""),
  subtitle: z.string().default(""),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
});

const iceExhibitionSchema = z.object({
  hero: heroSchema,
  intro: introSchema,
  stats: z.array(statSchema),
  originRows: z.array(originRowSchema),
  pillars: z.array(pillarSchema),
  currentStatus: currentStatusSchema,
  inaugurations: z.array(inaugurationSchema),
  testimonials: z.array(testimonialSchema),
  logoStrip: logoStripSchema,
  closingCta: closingCtaSchema,
});

const defaultIceExhibition = {
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

export default async function iceExhibitionRoutes(app: FastifyInstance) {
  app.get("/ice-exhibition-content", async () => {
    const db = await getDb();
    const col = db.collection("ice-exhibition-content");
    const stored = await col.findOne({ key: "default" });
    if (!stored) return defaultIceExhibition;
    const { _id, key, ...content } = stored;
    return { ...defaultIceExhibition, ...content };
  });

  app.put("/ice-exhibition-content", { preHandler: [app.authenticate] }, async (request, reply) => {
    const parse = iceExhibitionSchema.safeParse(request.body);
    if (!parse.success) {
      request.log.warn({ issues: parse.error.issues }, "iceExhibition.update validation failed");
      return reply.code(400).send({ message: "Invalid payload" });
    }

    const db = await getDb();
    const col = db.collection("ice-exhibition-content");
    await col.updateOne({ key: "default" }, { $set: { ...parse.data, key: "default" } }, { upsert: true });
    request.log.info("iceExhibition.update success");
    return parse.data;
  });

  app.post("/ice-exhibition-content/restore", { preHandler: [app.authenticate] }, async () => {
    const db = await getDb();
    const col = db.collection("ice-exhibition-content");
    await col.updateOne({ key: "default" }, { $set: { ...defaultIceExhibition, key: "default" } }, { upsert: true });
    return defaultIceExhibition;
  });
}
