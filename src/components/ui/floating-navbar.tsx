"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, LogIn, UserCircle2, Sun, Moon, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navItems as defaultNavItems } from "@/data/expo-data";

interface DropdownItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
  description?: string;
}

interface FloatingNavbarProps {
  // navItems?: NavItem[];
  className?: string;
}

type Branding = {
  logoUrl: string;
  darkLogoUrl: string;
  navLogoUrl: string;
  navDarkLogoUrl: string;
  navWidth: number;
  navHeight: number;
  faviconUrl: string;
  logoType: string;
  width: number;
  height: number;
  padding: string;
  background: string;
  href: string;
  alt: string;
};

// ─── Full Mega Menu Data ───────────────────────────────────────────────────────
const MEGA_MENUS: Record<string, { description: string; items: DropdownItem[] }> = {
  "Ice Legacy": {
    description: "30 years of trust, legacy and marketplace leadership.",
    items: [
      { name: "About ICE Exhibitions",          href: "/ice-exihibition" },
      { name: "Founder Vision",                  href: "/ice-legacy/founder-vision" },
      { name: "Our Marketplace Philosophy",      href: "/ice-legacy/philosophy" },
      { name: "Mission & Vision",                href: "/ice-legacy/mission-vision" },
      { name: "Our 30-Year Journey",             href: "/ice-legacy/30-year-journey" },
      { name: "ICE Timeline (Year by Year)",     href: "/ice-legacy/timeline" },
      { name: "ICE Milestones",                  href: "/ice-legacy/milestones" },
      { name: "ICE Across Generations",          href: "/ice-legacy/generations" },
      { name: "Building Buyer Trust Since 1994", href: "/ice-legacy/buyer-trust" },
      { name: "Legacy of Marketplace Leadership",href: "/ice-legacy/marketplace-leadership" },
      { name: "Why India Trusts ICE",            href: "/ice-legacy/why-india-trusts" },
      { name: "ICE Brand Evolution",             href: "/ice-legacy/brand-evolution" },
      { name: "Historic Exhibitions Archive",    href: "/ice-legacy/historic-archive" },
      { name: "Historic Brand Participation",    href: "/ice-legacy/historic-brands" },
      { name: "ICE Through The Decades",         href: "/ice-legacy/through-decades" },
      { name: "Old Exhibition Photos",           href: "/gallery" },
      { name: "Historic Newspaper Coverage",     href: "/ice-legacy/newspaper-coverage" },
      { name: "The Sushil Mantri Story",         href: "/ice-legacy/sushil-mantri-story" },
      { name: "ICE 1.0 to iGEN 2.0",            href: "/ice-legacy/ice-to-igen" },
      { name: "ICE Economic Contribution",       href: "/ice-legacy/economic-contribution" },
    ],
  },
  "Exhibit At Ice": {
    description: "Book your stall, launch your brand, grow your business.",
    items: [
      { name: "Why Exhibit at ICE",         href: "/exhibit/why-exhibit" },
      { name: "Exhibitor Benefits",         href: "/exhibit/benefits" },
      { name: "Why Brands Choose ICE",      href: "/exhibit/why-brands" },
      { name: "Visibility Creates Sales",   href: "/exhibit/visibility-sales" },
      { name: "Live Buyer Engagement",      href: "/exhibit/buyer-engagement" },
      { name: "Lead Generation at ICE",     href: "/exhibit/lead-generation" },
      { name: "Product Launch Platform",    href: "/exhibit/product-launch" },
      { name: "Trust Transfer Effect",      href: "/exhibit/trust-transfer" },
      { name: "Exhibition ROI",             href: "/exhibit/roi" },
      { name: "Why Startups Should Exhibit",href: "/exhibit/startups" },
      { name: "Why SMEs Should Exhibit",    href: "/exhibit/smes" },
      { name: "Why Large Brands Exhibit",   href: "/exhibit/large-brands" },
      { name: "Stall Booking",              href: "/exhibit/stall-booking" },
      { name: "Sponsorship Packages",       href: "/sponsor" },
      { name: "Pavilion Booking",           href: "/exhibit/pavilion-booking" },
      { name: "Premium Branding Zones",     href: "/exhibit/branding-zones" },
      { name: "LED & Digital Promotions",   href: "/exhibit/led-digital" },
      { name: "Custom Stall Design",        href: "/exhibit/stall-design" },
      { name: "Multi-City Participation",   href: "/exhibit/multi-city" },
      { name: "First-Time Exhibitor Guide", href: "/exhibit/first-time-guide" },
      { name: "Exhibitor FAQ",              href: "/exhibit/faq" },
    ],
  },
  "Visit Ice": {
    description: "Discover, compare and connect — all under one roof.",
    items: [
      { name: "Why Visit ICE",                href: "/visit/why-visit" },
      { name: "Visitor Benefits",             href: "/visit/benefits" },
      { name: "Product Discovery",            href: "/visit/product-discovery" },
      { name: "New Brand Discovery",          href: "/visit/new-brands" },
      { name: "Innovation Showcase",          href: "/visit/innovation" },
      { name: "Live Demonstrations",          href: "/visit/live-demos" },
      { name: "Exclusive Exhibition Deals",   href: "/visit/deals" },
      { name: "Family Entertainment & Shopping", href: "/visit/family" },
      { name: "Compare Products Live",        href: "/visit/compare-products" },
      { name: "Meet Brand Founders Directly", href: "/visit/meet-founders" },
      { name: "Business Networking",          href: "/visit/networking" },
      { name: "Buyer-Seller Meetings",        href: "/visit/buyer-seller-meetings" },
      { name: "Distributor & Retailer Connect", href: "/visit/distributor-connect" },
      { name: "B2B Marketplace Opportunities",href: "/visit/b2b-marketplace" },
      { name: "Visitor FAQ",                  href: "/visit/faq" },
      { name: "Exhibition Experience Guide",  href: "/visit/experience-guide" },
    ],
  },
  "Industries @ Ice": {
    description: "15 high-impact sectors under the ICE ecosystem.",
    items: [
      { name: "Real Estate Expo",           href: "/industries/real-estate" },
      { name: "EV & Mobility Expo",         href: "/industries/ev-mobility" },
      { name: "FMCG Expo",                  href: "/industries/fmcg" },
      { name: "Electronics Expo",           href: "/industries/electronics" },
      { name: "Home Appliances Expo",       href: "/industries/home-appliances" },
      { name: "Fashion & Lifestyle Expo",   href: "/industries/fashion-lifestyle" },
      { name: "Food & Beverage Expo",       href: "/industries/food-beverage" },
      { name: "Ayurveda & Organic Expo",    href: "/industries/ayurveda-organic" },
      { name: "Healthcare & Wellness Expo", href: "/industries/healthcare-wellness" },
      { name: "Startup Expo",               href: "/industries/startup" },
      { name: "Made In India Expo",         href: "/industries/made-in-india" },
      { name: "Smart Home & Technology Expo",href: "/industries/smart-home-tech" },
      { name: "Education Expo",             href: "/industries/education" },
      { name: "Luxury Products Expo",       href: "/industries/luxury" },
      { name: "Financial Services Expo",    href: "/industries/financial-services" },
    ],
  },
  "Brands & Success": {
    description: "Real brands. Real results. Real proof.",
    items: [
      { name: "Top Brands at ICE",          href: "/brands" },
      { name: "Historic Brand Participation",href: "/brands/historic" },
      { name: "Emerging Brands at ICE",     href: "/brands/emerging" },
      { name: "Brand Success Stories",      href: "/brands/success-stories" },
      { name: "Marketplace Leaders",        href: "/brands/marketplace-leaders" },
      { name: "Startup Success Stories",    href: "/brands/startups" },
      { name: "Seller Success Stories",     href: "/sellers" },
      { name: "Buyer Success Stories",      href: "/buyers" },
      { name: "Business Expansion Stories", href: "/brands/expansion" },
      { name: "Product Launch Stories",     href: "/brands/product-launches" },
      { name: "Video Testimonials",         href: "/brands/video-testimonials" },
      { name: "ICE Across India",           href: "/brands/across-india" },
      { name: "City-Wise Exhibitions",      href: "/brands/city-exhibitions" },
      { name: "National Exhibition Network",href: "/brands/national-network" },
    ],
  },
  "Upcoming Expos": {
    description: "Book your stall or register as a visitor today.",
    items: [
      { name: "Upcoming Events & Calendar",  href: "/expos/calendar" },
      { name: "Mega Expo Events",            href: "/expos/mega-events" },
      { name: "Industry-Specific Expos",     href: "/expos/industry-specific" },
      { name: "Multi-City Event Schedule",   href: "/expos/multi-city" },
      { name: "Exhibitor Registration",      href: "/expos/exhibitor-registration" },
      { name: "Visitor Registration",        href: "/expos/visitor-registration" },
      { name: "Sponsorship Registration",    href: "/sponsor" },
      { name: "VIP Access Registration",     href: "/expos/vip-access" },
      { name: "Early Bird Booking",          href: "/expos/early-bird" },
      { name: "Launch Events",               href: "/expos/launch-events" },
      { name: "B2B Trade Events",            href: "/expos/b2b-trade" },
    ],
  },
  "Media Center": {
    description: "Photo gallery, press coverage, blogs and more.",
    items: [
      { name: "Photo Gallery",               href: "/gallery" },
      { name: "Video Gallery",               href: "/media/videos" },
      { name: "Historic Archives",           href: "/media/archives" },
      { name: "Celebrities @ ICE",           href: "/media/celebrities" },
      { name: "VVIPs @ ICE",                href: "/media/vvips" },
      { name: "Political Leaders at ICE",    href: "/media/political-leaders" },
      { name: "Industry Icons at ICE",       href: "/media/industry-icons" },
      { name: "Press Releases",              href: "/media/press-releases" },
      { name: "Media Coverage",              href: "/media/coverage" },
      { name: "ICE In The News",             href: "/media/in-the-news" },
      { name: "TV & Digital Media Coverage", href: "/media/tv-digital" },
      { name: "Press Kit Download",          href: "/media/press-kit" },
      { name: "Exhibition Trends Blog",      href: "/media/blog/exhibition-trends" },
      { name: "Consumer Trends Blog",        href: "/media/blog/consumer-trends" },
      { name: "Marketplace Insights Blog",   href: "/media/blog/marketplace-insights" },
      { name: "Physical vs Digital Marketing",href: "/media/blog/physical-vs-digital" },
      { name: "Brand Growth Articles",       href: "/media/blog/brand-growth" },
      { name: "Future of Exhibitions",       href: "/media/blog/future-exhibitions" },
    ],
  },
  "Ice To Igen": {
    description: "The bridge from 30 years of legacy to the future of trust platforms.",
    items: [
      { name: "What Is iGEN",                           href: "/IgenWorld" },
      { name: "ICE 1.0 to iGEN 2.0",                   href: "/igen/ice-to-igen" },
      { name: "What ICE Did Physically — iGEN Digitally",href: "/igen/physical-to-digital" },
      { name: "The Future of Trust Platforms",          href: "/igen/trust-platforms" },
      { name: "India Global Expo News",                 href: "/igenNews" },
      { name: "Recognition Economy",                    href: "/igen/recognition-economy" },
      { name: "Reputation Economy",                     href: "/igen/reputation-economy" },
      { name: "Global Buyer Discovery",                 href: "/igen/global-buyer-discovery" },
      { name: "Export Marketplace",                     href: "/igen/export-marketplace" },
      { name: "Future of B2B Trust",                    href: "/igen/b2b-trust" },
      { name: "SME Ecosystem",                          href: "/igen/sme-ecosystem" },
      { name: "Mission 2047",                           href: "/igen/mission-2047" },
      { name: "Building 1000 Business Leaders",         href: "/igen/1000-leaders" },
      { name: "The Future of Marketplace Platforms",    href: "/igen/future-marketplace" },
    ],
  },
  "Investor & Partnership": {
    description: "Invest, partner, collaborate or join the ICE team.",
    items: [
      { name: "Partnership Opportunities",      href: "/partner" },
      { name: "Investor Relations",             href: "/invest/investor-relations" },
      { name: "Strategic Alliances",            href: "/invest/strategic-alliances" },
      { name: "International Trade Partnerships",href: "/invest/international-trade" },
      { name: "Global Marketplace Vision",      href: "/invest/global-vision" },
      { name: "India Expansion Strategy",       href: "/invest/india-expansion" },
      { name: "Brand Collaborations",           href: "/invest/brand-collaborations" },
      { name: "Joint Ventures",                 href: "/invest/joint-ventures" },
      { name: "Industry Associations",          href: "/invest/industry-associations" },
      { name: "Government Collaboration",       href: "/invest/government" },
      { name: "Franchise Inquiry",              href: "/invest/franchise" },
      { name: "Join ICE — Careers",             href: "/invest/careers" },
      { name: "Career Opportunities",           href: "/invest/openings" },
      { name: "Internship Opportunities",       href: "/invest/internships" },
      { name: "Why Work With ICE",              href: "/invest/why-work-with-ice" },
    ],
  },
};

// ─── Theme engine ──────────────────────────────────────────────────────────────
const STYLE_ID = "ice-theme-override";

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = dark
    ? `:root{color-scheme:dark;--background:0 0% 5%;--foreground:0 0% 98%;--card:0 0% 8%;--card-foreground:0 0% 98%;--popover:0 0% 5%;--popover-foreground:0 0% 98%;--primary:217 91% 60%;--primary-foreground:0 0% 5%;--secondary:0 0% 12%;--secondary-foreground:0 0% 98%;--muted:0 0% 12%;--muted-foreground:0 0% 60%;--accent:0 0% 12%;--accent-foreground:0 0% 98%;--border:0 0% 15%;--input:0 0% 15%;--ring:217 91% 60%;}body,#root{background-color:hsl(0,0%,5%)!important;color:hsl(0,0%,98%)!important;}`
    : `:root{color-scheme:light;--background:0 0% 100%;--foreground:0 0% 5%;--card:0 0% 100%;--card-foreground:0 0% 5%;--popover:0 0% 100%;--popover-foreground:0 0% 5%;--primary:217 91% 60%;--primary-foreground:0 0% 100%;--secondary:210 40% 96%;--secondary-foreground:0 0% 5%;--muted:210 40% 96%;--muted-foreground:215 16% 47%;--accent:210 40% 96%;--accent-foreground:0 0% 5%;--border:214 32% 91%;--input:214 32% 91%;--ring:217 91% 60%;}body,#root{background-color:hsl(0,0%,100%)!important;color:hsl(0,0%,5%)!important;}`;
  localStorage.setItem("theme", dark ? "dark" : "light");
}

// ─── Theme Toggle ──────────────────────────────────────────────────────────────
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => { applyTheme(isDark); }, []); // eslint-disable-line

  const toggle = () => { const next = !isDark; setIsDark(next); applyTheme(next); };

  return (
    <button onClick={toggle} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{ position:"relative", display:"inline-flex", alignItems:"center", width:52, height:28,
        borderRadius:9999, backgroundColor:isDark?"#3b82f6":"#e2e8f0",
        border:isDark?"1px solid #2563eb":"1px solid #cbd5e1",
        cursor:"pointer", flexShrink:0, transition:"background-color 0.25s ease", outline:"none", padding:0 }}>
      <Sun size={11} strokeWidth={2.5} style={{ position:"absolute", left:7, color:isDark?"#93c5fd":"#eab308", pointerEvents:"none" }} />
      <Moon size={11} strokeWidth={2.5} style={{ position:"absolute", right:7, color:isDark?"#ffffff":"#94a3b8", pointerEvents:"none" }} />
      <motion.span animate={{ x: isDark ? 26 : 2 }} transition={{ type:"spring", stiffness:500, damping:35 }}
        style={{ position:"absolute", left:0, width:22, height:22, borderRadius:"50%", backgroundColor:"#ffffff",
          boxShadow:"0 1px 3px rgba(0,0,0,0.25)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1 }}>
        {isDark ? <Moon size={11} style={{ color:"#3b82f6" }} strokeWidth={2.5} /> : <Sun size={11} style={{ color:"#eab308" }} strokeWidth={2.5} />}
      </motion.span>
    </button>
  );
};

// ─── Mega Menu Dropdown ────────────────────────────────────────────────────────
const MegaDropdown = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaData = MEGA_MENUS[item.name];

  const onEnter = () => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(true); };
  const onLeave = () => { timerRef.current = setTimeout(() => setOpen(false), 180); };

  // Split dropdown items into 3 columns
  const cols = megaData ? [
    megaData.items.slice(0, Math.ceil(megaData.items.length / 3)),
    megaData.items.slice(Math.ceil(megaData.items.length / 3), Math.ceil(megaData.items.length * 2 / 3)),
    megaData.items.slice(Math.ceil(megaData.items.length * 2 / 3)),
  ] : [];

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        to={item.href}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
          isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-card"
        )}
      >
        {item.name}
        {megaData && (
          <ChevronDown size={13} className={cn("transition-transform duration-200 flex-shrink-0", open ? "rotate-180" : "")} />
        )}
      </Link>

      <AnimatePresence>
        {open && megaData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            className="fixed left-0 right-0 mt-2 z-50 px-4"
            style={{ top: "60px" }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <div className="max-w-6xl mx-auto rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="grid grid-cols-4 divide-x divide-border">
                {/* Left — title + description + CTA */}
                <div className="p-6 bg-primary/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{megaData.description}</p>
                  </div>
                  <Link
                    to={item.href}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    See all →
                  </Link>
                </div>

                {/* Centre — 3 columns of links */}
                {cols.map((col, ci) => (
                  <div key={ci} className="p-6 flex flex-col gap-1">
                    {col.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-colors group"
                      >
                        <span className="text-primary text-xs opacity-60 group-hover:opacity-100">→</span>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── FloatingNavbar ────────────────────────────────────────────────────────────
export const FloatingNavbar = ({
  // navItems = defaultNavItems,
  className,
}: FloatingNavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null);
  const [items, setItems] = useState<NavItem[]>( defaultNavItems);
  const [branding, setBranding] = useState<Branding | null>(null);
  const [showMe, setShowMe] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL || "";
    const loadNav = async () => {
      try {
        const res = await fetch(`${base}/hero`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setItems(Array.isArray(data.navItems) && data.navItems.length ? data.navItems :  defaultNavItems);
      } catch {
        setItems(defaultNavItems);
      }
    };
    loadNav();

    const syncAuth = () => {
      const token = localStorage.getItem("user_access_token");
      setShowMe(!!token);
      setShowLogin(!token);
    };
    syncAuth();
    const handleStorage = (e: StorageEvent) => { if (e.key === "user_access_token" || e.key === "user_email") syncAuth(); };
    const handleAuthChange = () => syncAuth();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("auth-change", handleAuthChange as EventListener);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("auth-change", handleAuthChange as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL || "";
    fetch(`${base}/branding`)
      .then((r) => r.ok ? r.json() : null)
      .then((p) => {
        if (!p) return;
        setBranding(p);
        if (p?.faviconUrl) {
          const l = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
          if (l) { l.href = p.faviconUrl; } else {
            const nl = document.createElement("link"); nl.rel = "icon"; nl.href = p.faviconUrl; document.head.appendChild(nl);
          }
        }
      })
      .catch(() => {});
  }, []);

  // useEffect(() => { setItems(navItems ?? defaultNavItems); }, [navItems]);
  useEffect(() => { setIsMobileMenuOpen(false); setMobileOpenItem(null); }, [location.pathname]);

  return (
    <>
      {/* ── Desktop nav ── */}
      <motion.nav
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className={cn(
    "fixed top-0 inset-x-0 z-50 px-1 md:px-2 py-3 transition-all duration-300",
    isScrolled
      ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-xl"
      : "bg-transparent",
    className
  )}
>
         <div className="flex items-center justify-between w-full max-w-[1600px] mx-auto top-0">
          {/* Logo */}
          <Link
            to={branding?.href || "/"}
            className="flex items-center gap-2 font-display font-bold text-xl text-foreground hover:text-primary transition-colors flex-shrink-0 mr-4"
            style={{ padding: branding?.padding || undefined, background: branding?.background || undefined }}
          >
            {branding?.navLogoUrl || branding?.logoUrl ? (
              <img
                src={branding.navLogoUrl || branding.logoUrl}
                alt={branding.alt || "ICE Exhibitions"}
                style={{
                  width: branding.navWidth || branding.width ? `${branding.navWidth || branding.width}px` : undefined,
                  height: branding.navHeight || branding.height ? `${branding.navHeight || branding.height}px` : undefined,
                  objectFit: "contain",
                }}
              />
            ) : (
              <>ICE <span className="text-primary"> GLOBAL </span></>
            )}
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 flex-wrap">
            {items.map((item) => (
              <MegaDropdown key={item.name} item={item} isActive={location.pathname === item.href} />
            ))}

            {/* Auth */}
            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
              {showMe ? (
                <Link to="/me" className={cn("px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap", location.pathname === "/me" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-card")}>
                  <span className="inline-flex items-center gap-1"><UserCircle2 className="w-4 h-4" /> Me</span>
                </Link>
              ) : showLogin ? (
                <Link to="/me" className={cn("px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap", location.pathname === "/me" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-card")}>
                  <span className="inline-flex items-center gap-1"><LogIn className="w-4 h-4" /> Login</span>
                </Link>
              ) : null}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden ml-auto flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen((p) => !p)} className="p-2 text-foreground" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl pt-20 overflow-y-auto"
          >
            <div className="flex flex-col px-6 pb-10">
              {items.map((item, index) => {
                const megaData = MEGA_MENUS[item.name];
                const isOpen = mobileOpenItem === item.name;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border/40"
                  >
                    {megaData ? (
                      <>
                        <button
                          onClick={() => setMobileOpenItem(isOpen ? null : item.name)}
                          className="w-full flex items-center justify-between py-4 text-lg font-semibold text-foreground"
                        >
                          {item.name}
                          <ChevronDown size={18} className={cn("transition-transform duration-200 text-muted-foreground", isOpen ? "rotate-180" : "")} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 flex flex-col gap-0.5">
                                {megaData.items.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    to={sub.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                                  >
                                    <span className="text-primary text-xs">→</span>
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn("block py-4 text-lg font-semibold transition-colors", location.pathname === item.href ? "text-primary" : "text-foreground")}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Auth */}
              {(showMe || showLogin) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: items.length * 0.05 }}
                  className="border-b border-border/40"
                >
                  <Link
                    to="/me"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      {showMe ? <><UserCircle2 className="w-5 h-5" /> Me</> : <><LogIn className="w-5 h-5" /> Login</>}
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};