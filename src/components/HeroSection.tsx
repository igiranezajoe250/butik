"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const categories = [
  {
    id: "home",
    title: "COMMERCE",
    subtitle: "Reimagined",
    image: "/hero.png",
    imagePosition: "left" as const,
    panelBg: "linear-gradient(135deg, #F4F1E4 0%, #EEEBDD 48%, #E3DDC8 100%)",
  },
  {
    id: "cosmetics",
    title: "COSMETICS",
    subtitle: "Stay beautiful",
    image: "/hero.png",
    imagePosition: "right" as const,
    panelBg: "linear-gradient(135deg, #FAF5F0 0%, #F5EDE4 48%, #EDE3D6 100%)",
  },
  {
    id: "skincare",
    title: "SKIN CARE",
    subtitle: "Smooth body",
    image: "/hero.png",
    imagePosition: "left" as const,
    panelBg: "linear-gradient(135deg, #E8F0D8 0%, #DEE8CC 48%, #D4DFC2 100%)",
  },
  {
    id: "fashion",
    title: "FASHION",
    subtitle: "Wear the culture",
    image: "/hero.png",
    imagePosition: "right" as const,
    panelBg: "linear-gradient(135deg, #F0EBE3 0%, #E8E0D4 48%, #DDD3C4 100%)",
  },
];

const results = [
  { id: 1, name: "Handwoven Agaseke Basket", boutique: "Inzozi Atelier", price: "RWF 45,000", color: "#d4c5b2" },
  { id: 2, name: "Single-Origin Bourbon Coffee", boutique: "Gorilla Coffee House", price: "RWF 18,000", color: "#8b7355" },
  { id: 3, name: "Imigongo Art Panel", boutique: "Urugo Gallery", price: "RWF 120,000", color: "#2c2c2c" },
  { id: 4, name: "Kitenge Wrap Dress", boutique: "Umuco Fashion", price: "RWF 65,000", color: "#8b6f5e" },
  { id: 5, name: "Banana Leaf Tote", boutique: "Keza Crafts", price: "RWF 32,000", color: "#7a6854" },
  { id: 6, name: "Ceramic Serving Set", boutique: "Ishimwe Design", price: "RWF 28,000", color: "#5c7a5c" },
  { id: 7, name: "Rwandan Honey Set", boutique: "Inzozi Atelier", price: "RWF 22,000", color: "#c4a060" },
  { id: 8, name: "Woven Wall Hanging", boutique: "Keza Crafts", price: "RWF 55,000", color: "#a08870" },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) setSearchQuery(query.trim());
    },
    [query]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery(null);
    setQuery("");
  }, []);

  useEffect(() => {
    if (searchQuery) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10 || isScrolling.current) return;

      e.preventDefault();
      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      setActiveIndex((prev) => {
        const next = prev + direction;
        if (next < 0) return 0;
        if (next >= categories.length) return categories.length - 1;
        return next;
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [searchQuery]);

  const cat = categories[activeIndex];

  if (searchQuery) {
    return (
      <section className="w-full h-screen bg-paper text-ink flex flex-col animate-fade-in">
        {/* Results header */}
        <div className="flex items-center justify-between px-8 lg:px-16 pt-24 pb-6">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green-ink mb-1">
              Results for
            </p>
            <h2
              className="text-xl lg:text-2xl font-semibold text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{searchQuery}&rdquo;
            </h2>
          </div>
          <button
            onClick={clearSearch}
            className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/40 hover:text-ink border border-ink/15 hover:border-ink/40 px-4 py-2.5 transition-colors"
          >
            Back
          </button>
        </div>

        {/* Horizontal scroll results */}
        <div className="flex-1 flex items-center px-8 lg:px-16 overflow-hidden">
          <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-6 w-full">
            {results.map((item, i) => (
              <article
                key={item.id}
                className="flex-shrink-0 w-[260px] lg:w-[300px] group cursor-pointer animate-slide-in"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div
                  className="aspect-[3/4] mb-4 overflow-hidden relative"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/15 text-[0.6rem] tracking-[0.3em] uppercase font-bold">
                      {item.boutique}
                    </span>
                  </div>
                </div>
                <h3 className="text-[0.82rem] font-semibold text-ink group-hover:text-ink/50 transition-colors">{item.name}</h3>
                <p className="text-[0.68rem] text-ink/40 tracking-wide mt-0.5">{item.boutique}</p>
                <p className="text-[0.82rem] text-ink/70 mt-1 font-medium">{item.price}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Search bar at bottom center */}
        <div className="px-8 lg:px-16 pb-8 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[520px] rounded-[30px] overflow-hidden"
            style={{
              border: "1px solid rgba(13,13,13,0.12)",
              background: "rgba(255,255,255,0.8)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="min-h-[56px] grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-1.5">
              <button type="button" className="w-[36px] h-[36px] rounded-full inline-flex items-center justify-center text-ink/50 hover:text-ink hover:bg-ink/5 transition-colors" aria-label="Add context">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for something else"
                className="w-full bg-transparent text-ink text-[0.92rem] placeholder:text-ink/35 focus:outline-none"
                autoComplete="off"
              />
              <button type="submit" className="w-[40px] h-[40px] rounded-full inline-flex items-center justify-center bg-ink text-white hover:-translate-y-px transition-all" aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h12M13 7l5 5-5 5" /></svg>
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="w-full h-screen relative overflow-hidden bg-[#050505]">
      {/* Category slides */}
      <div
        className="w-full h-full grid grid-cols-1 lg:grid-cols-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        key={cat.id}
      >
        {cat.imagePosition === "left" ? (
          <>
            <div className="relative min-h-[50vh] lg:min-h-full overflow-hidden animate-fade-in">
              <Image src={cat.image} alt={cat.title} fill priority className="object-cover brightness-[0.9] contrast-[1.05]" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="relative min-h-[50vh] lg:min-h-full flex flex-col items-center justify-center px-8 lg:px-16" style={{ background: cat.panelBg }}>
              <CategoryContent cat={cat} query={query} setQuery={setQuery} handleSubmit={handleSubmit} activeIndex={activeIndex} />
            </div>
          </>
        ) : (
          <>
            <div className="relative min-h-[50vh] lg:min-h-full flex flex-col items-center justify-center px-8 lg:px-16 order-2 lg:order-1" style={{ background: cat.panelBg }}>
              <CategoryContent cat={cat} query={query} setQuery={setQuery} handleSubmit={handleSubmit} activeIndex={activeIndex} />
            </div>
            <div className="relative min-h-[50vh] lg:min-h-full overflow-hidden order-1 lg:order-2 animate-fade-in">
              <Image src={cat.image} alt={cat.title} fill priority className="object-cover brightness-[0.9] contrast-[1.05]" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </>
        )}
      </div>

      {/* Category indicators */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActiveIndex(i)}
            className={`w-1.5 transition-all duration-500 rounded-full ${
              i === activeIndex ? "h-8 bg-white" : "h-1.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={c.title}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryContent({
  cat,
  query,
  setQuery,
  handleSubmit,
  activeIndex,
}: {
  cat: (typeof categories)[number];
  query: string;
  setQuery: (q: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  activeIndex: number;
}) {
  return (
    <div className="w-full max-w-[560px] text-center flex flex-col items-center">
      <h1
        className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[0.04em] uppercase text-ink leading-[1] mb-3 animate-fade-up"
        key={`title-${activeIndex}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {cat.title}
      </h1>
      <p
        className="text-[1.1rem] italic text-green-ink tracking-[0.06em] mb-10 animate-fade-up delay-100"
        key={`sub-${activeIndex}`}
      >
        {cat.subtitle}
      </p>

      {activeIndex === 0 && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[520px] rounded-[30px] overflow-hidden animate-fade-up delay-200"
          style={{
            border: "1px solid rgba(255,255,255,0.58)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.5), rgba(255,255,255,0.16)), rgba(238,235,221,0.48)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.78), inset 0 -18px 42px rgba(70,65,46,0.08), 0 24px 70px rgba(52,45,31,0.18)",
            backdropFilter: "blur(28px) saturate(1.35)",
          }}
        >
          <div className="h-[46px] px-4 flex items-center justify-between border-b border-ink/[0.08]">
            <span className="text-ink/60 text-[0.82rem] font-semibold tracking-[0.01em]">Butik intelligence</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink/60"><path d="m9 6 6 6-6 6" /></svg>
          </div>
          <div className="min-h-[62px] grid grid-cols-[auto_1fr_auto] items-center gap-2.5 px-2.5 py-2 bg-ink/5">
            <button type="button" className="w-[38px] h-[38px] rounded-full inline-flex items-center justify-center text-ink/60 hover:text-ink hover:bg-white/40 transition-colors" aria-label="Add context">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            </button>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask about the rebirth of commerce" className="w-full bg-transparent text-ink text-[0.98rem] placeholder:text-ink/40 focus:outline-none" autoComplete="off" />
            <div className="inline-flex items-center gap-2">
              <span className="text-ink text-[0.82rem] font-bold tracking-[0.04em] hidden sm:inline">AI</span>
              <button type="submit" className="w-[44px] h-[44px] rounded-full inline-flex items-center justify-center bg-ink/90 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_24px_rgba(13,13,13,0.18)] hover:bg-black hover:-translate-y-px transition-all" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h12M13 7l5 5-5 5" /></svg>
              </button>
            </div>
          </div>
        </form>
      )}

      {activeIndex !== 0 && (
        <button
          className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink border border-ink px-6 py-3.5 hover:bg-ink hover:text-white transition-all animate-fade-up delay-200"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Explore
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
        </button>
      )}
    </div>
  );
}
