import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  type IceExhibitionContent,
  defaultIceExhibitionContent,
  mergeIceExhibitionContent,
} from "@/data/ice-exhibition";
import { expoImages } from "@/data/expo-data";

const apiBase = import.meta.env.VITE_API_BASE_URL || "";
const mediaBase = (import.meta.env.VITE_MEDIA_BASE_URL || "").replace(/\/$/, "");
const bundledAssets: Record<string, string> = {
  "/assets/hero-expo-1.jpg": expoImages.hero,
  "/assets/expo-entrance.jpg": expoImages.entrance,
  "/assets/expo-stage.jpg": expoImages.stage,
  "/assets/expo-vr-zone.jpg": expoImages.vrZone,
  "/assets/expo-booth.jpg": expoImages.booth,
  "/assets/expo-aerial.jpg": expoImages.aerial,
};

const resolveImage = (src?: string) => {
  if (!src) return "";
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("blob:")) return src;
  if (src.startsWith("/assets/")) return bundledAssets[src] || src;
  return mediaBase ? `${mediaBase}/${src.replace(/^\/+/, "")}` : src;
};

const IceExhibition = () => {
  const [content, setContent] = useState<IceExhibitionContent>(defaultIceExhibitionContent);

  useEffect(() => {
    let alive = true;

    const loadContent = async () => {
      try {
        const res = await fetch(`${apiBase}/ice-exhibition-content`);
        const type = res.headers.get("content-type") || "";
        if (!res.ok || !type.includes("application/json")) return;
        const payload = await res.json();
        if (alive) setContent(mergeIceExhibitionContent(payload));
      } catch {
        if (alive) setContent(defaultIceExhibitionContent);
      }
    };

    loadContent();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f8f3] text-[#172033]">
      <section className="relative flex min-h-[64vh] items-center overflow-hidden md:min-h-[70vh]">
        <img
          src={resolveImage(content.hero.backgroundImage)}
          alt="Crowd at ICE exhibition"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#101827]/70" />
        
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <Link to="/">

            <Button className="bg-green text-white mx-2 " >Back to Home</Button>

            </Link>
            <span className="inline-flex rounded-full border border-white/30 bg-white/[0.15] px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              {content.hero.chip}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-[#d93636] text-white hover:bg-[#bd2d2d]">
                <Link to={content.hero.primaryCta.href}>
                  {content.hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/70 bg-white/10 text-white hover:bg-white hover:text-[#172033]"
              >
                <Link to={content.hero.secondaryCta.href}>{content.hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#b22222]">
              {content.intro.label}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#172033] md:text-5xl">
              {content.intro.title}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-[#4c586f]">
              {content.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#d9dccf] bg-white shadow-xl shadow-[#172033]/10">
            <img
              src={resolveImage(content.intro.image)}
              alt={content.intro.imageAlt || content.intro.title}
              className="h-[520px] w-full object-cover"
            />
            <div className="grid grid-cols-2 divide-x divide-[#e5e7dc]">
              <div className="p-5">
                <p className="text-3xl font-bold text-[#b22222]">{content.intro.statOneValue}</p>
                <p className="mt-1 text-sm text-[#5e6879]">{content.intro.statOneLabel}</p>
              </div>
              <div className="p-5">
                <p className="text-3xl font-bold text-[#0f766e]">{content.intro.statTwoValue}</p>
                <p className="mt-1 text-sm text-[#5e6879]">{content.intro.statTwoLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#172033] py-10 text-white">
        <div className="container-custom grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((item, index) => (
            <div
              key={`${item.value}-${item.label}`}
              className={`px-6 py-6 text-center ${index < content.stats.length - 1 ? "lg:border-r lg:border-white/20" : ""}`}
            >
              <p className="text-4xl font-bold text-[#f4c542] md:text-5xl">{item.value}</p>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom space-y-16">
          {content.originRows.map((row, index) => (
            <div key={`${row.chip}-${row.title}`} className="grid items-center gap-8 lg:grid-cols-2">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <span className="inline-flex rounded-full bg-[#eaf5f3] px-4 py-2 text-sm font-bold text-[#0f766e]">
                  {row.chip}
                </span>
                <h3 className="mt-5 text-2xl font-bold text-[#172033] md:text-4xl">{row.title}</h3>
                <div className="mt-5 space-y-4 text-base leading-8 text-[#4c586f]">
                  {row.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <img
                  src={resolveImage(row.image)}
                  alt={row.imageAlt || row.title}
                  className="h-[420px] w-full rounded-lg object-cover shadow-xl shadow-[#172033]/10"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-[#f7f8f3]">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#b22222]">
              Philosophy
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#172033] md:text-5xl">
              The three pillars behind every ICE edition.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {content.pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-lg border border-[#dfe2d5] border-t-4 border-t-[#d93636] bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-[#172033]">{pillar.title}</h3>
                <p className="mt-4 leading-7 text-[#596579]">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#0f766e]">
              {content.currentStatus.label}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#172033] md:text-5xl">
              {content.currentStatus.title}
            </h2>
            <ul className="mt-7 space-y-4">
              {content.currentStatus.bullets.map((item) => (
                <li key={item} className="flex gap-3 text-[#4c586f]">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0f766e]" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 bg-[#172033] text-white hover:bg-[#263249]">
              <Link to={content.currentStatus.cta.href}>
                {content.currentStatus.cta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <img
            src={resolveImage(content.currentStatus.image)}
            alt={content.currentStatus.imageAlt || content.currentStatus.title}
            className="h-[520px] w-full rounded-lg object-cover shadow-xl shadow-[#172033]/10"
          />
        </div>
      </section>

      <section className="section-padding bg-[#172033] text-white">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#f4c542]">
                VIP inaugurations
              </span>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">Leaders who opened the stage.</h2>
            </div>
            <p className="max-w-xl leading-7 text-white/70">
              Representative inauguration cards for the legacy page, ready to connect with real
              archive records when final content is available.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.inaugurations.map((guest) => (
              <article key={`${guest.name}-${guest.year}`} className="overflow-hidden rounded-lg bg-white text-[#172033]">
                <div className="relative h-72">
                  <img src={resolveImage(guest.image)} alt={guest.name} className="h-full w-full object-cover" />
                  <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#f4c542] px-3 py-1 text-sm font-bold">
                    <CalendarDays className="h-4 w-4" />
                    {guest.year}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{guest.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#596579]">{guest.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f7f8f3]">
        <div className="container-custom">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#b22222]">
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#172033] md:text-5xl">
              Voices from the ICE floor.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.testimonials.map((item) => (
              <article key={item.name} className="rounded-lg border border-[#dfe2d5] bg-white p-7 shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={resolveImage(item.image)} alt={item.name} className="h-16 w-16 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-[#172033]">{item.name}</h3>
                    <p className="text-sm text-[#596579]">{item.designation}</p>
                  </div>
                </div>
                <p className="mt-6 leading-8 text-[#4c586f]">&quot;{item.quote}&quot;</p>
                <div className="mt-6 flex gap-1 text-[#f4b000]" aria-label={`${item.rating} star rating`}>
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-14">
        <div className="container-custom">
          <h2 className="text-center text-2xl font-bold text-[#172033] md:text-4xl">
            {content.logoStrip.title}
          </h2>
        </div>
        <div className="mt-10 flex w-max animate-[ice-logo-scroll_28s_linear_infinite] gap-4 px-4">
          {[...content.logoStrip.logos, ...content.logoStrip.logos].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex h-20 w-48 items-center justify-center rounded-lg border border-[#dfe2d5] bg-[#f7f8f3] px-5 text-center text-lg font-bold text-[#172033]"
            >
              {logo}
            </div>
          ))}
        </div>
        <div className="mt-4 flex w-max animate-[ice-logo-scroll-reverse_30s_linear_infinite] gap-4 px-4">
          {[...content.logoStrip.logos.slice().reverse(), ...content.logoStrip.logos.slice().reverse()].map((logo, index) => (
            <div
              key={`${logo}-reverse-${index}`}
              className="flex h-20 w-48 items-center justify-center rounded-lg border border-[#dfe2d5] bg-white px-5 text-center text-lg font-bold text-[#0f766e]"
            >
              {logo}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes ice-logo-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes ice-logo-scroll-reverse {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </section>

      <section className="bg-[#0f766e] px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-5xl">{content.closingCta.title}</h2>
          <p className="mt-5 text-lg leading-8 text-white/80">{content.closingCta.subtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-[#0f766e] hover:bg-[#eef6f4]">
              <Link to={content.closingCta.primaryCta.href}>{content.closingCta.primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/70 bg-transparent text-white hover:bg-white hover:text-[#0f766e]"
            >
              <Link to={content.closingCta.secondaryCta.href}>{content.closingCta.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IceExhibition;
