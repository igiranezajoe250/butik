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
    panelBg: "#F4F1E4",
    panelAccent: "#E3DDC8",
  },
  {
    id: "cosmetics",
    title: "COSMETICS",
    subtitle: "Stay beautiful",
    image: "/cosmetics.png",
    imagePosition: "right" as const,
    panelBg: "#FAF5F0",
    panelAccent: "#EDE3D6",
  },
  {
    id: "skincare",
    title: "SKIN CARE",
    subtitle: "Glow naturally",
    image: "/skincare.png",
    imagePosition: "left" as const,
    panelBg: "#EEF2E6",
    panelAccent: "#D4DFC2",
  },
  {
    id: "fashion",
    title: "FASHION",
    subtitle: "Wear the culture",
    image: "/fashion.png",
    imagePosition: "right" as const,
    panelBg: "#F0EBE3",
    panelAccent: "#DDD3C4",
  },
  {
    id: "jewels",
    title: "JEWELS",
    subtitle: "Adorn yourself",
    image: "/jewels.png",
    imagePosition: "left" as const,
    panelBg: "#F5F0EA",
    panelAccent: "#E8DDD0",
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
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const goToCategory = useCallback((index: number) => {
    if (index < 0 || index >= categories.length || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  useEffect(() => {
    if (searchQuery) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10 || isScrolling.current) return;
      e.preventDefault();
      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const next = activeIndex + direction;
      if (next >= 0 && next < categories.length) {
        goToCategory(next);
      }

      setTimeout(() => { isScrolling.current = false; }, 900);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [searchQuery, activeIndex, goToCategory]);

  const cat = categories[activeIndex];

  // Search results view
  if (searchQuery) {
    return (
      <section className="w-full h-screen bg-paper text-ink flex flex-col">
        <div className="flex items-center justify-between px-8 lg:px-16 pt-24 pb-6 animate-fade-up">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green-ink mb-1">Results for</p>
            <h2 className="text-xl lg:text-2xl font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
              &ldquo;{searchQuery}&rdquo;
            </h2>
          </div>
          <button onClick={clearSearch} className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/40 hover:text-ink border border-ink/15 hover:border-ink/40 px-4 py-2.5 transition-colors">
            Back
          </button>
        </div>

        <div className="flex-1 flex items-center px-8 lg:px-16 overflow-hidden">
          <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-6 w-full">
            {results.map((item, i) => (
              <article key={item.id} className="flex-shrink-0 w-[260px] lg:w-[300px] group cursor-pointer animate-slide-in" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="aspect-[3/4] mb-4 relative" style={{ backgroundColor: item.color }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/15 text-[0.6rem] tracking-[0.3em] uppercase font-bold">{item.boutique}</span>
                  </div>
                </div>
                <h3 className="text-[0.82rem] font-semibold text-ink group-hover:text-ink/50 transition-colors">{item.name}</h3>
                <p className="text-[0.68rem] text-ink/40 tracking-wide mt-0.5">{item.boutique}</p>
                <p className="text-[0.82rem] text-ink/70 mt-1 font-medium">{item.price}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-16 pb-8 flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-[520px] rounded-[30px] overflow-hidden" style={{ border: "1px solid rgba(13,13,13,0.12)", background: "rgba(255,255,255,0.8)", boxShadow: "0 12px 40px rgba(0,0,0,0.08)", backdropFilter: "blur(20px)" }}>
            <div className="min-h-[56px] grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-1.5">
              <button type="button" className="w-[36px] h-[36px] rounded-full inline-flex items-center justify-center text-ink/50 hover:text-ink hover:bg-ink/5 transition-colors" aria-label="Add context">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for something else" className="w-full bg-transparent text-ink text-[0.92rem] placeholder:text-ink/35 focus:outline-none" autoComplete="off" />
              <button type="submit" className="w-[40px] h-[40px] rounded-full inline-flex items-center justify-center bg-ink text-white hover:-translate-y-px transition-all" aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h12M13 7l5 5-5 5" /></svg>
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  // Category hero view
  const imageEl = (
    <div className="relative min-h-[50vh] lg:min-h-full overflow-hidden" key={`img-${cat.id}`}>
      <Image
        src={cat.image}
        alt={cat.title}
        fill
        priority={activeIndex === 0}
        className="object-cover brightness-[0.92] contrast-[1.05] transition-opacity duration-700"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  const contentEl = (
    <div
      className="relative min-h-[50vh] lg:min-h-full flex flex-col items-center justify-center px-8 lg:px-16 transition-colors duration-700"
      key={`panel-${cat.id}`}
      style={{ background: `linear-gradient(135deg, ${cat.panelBg} 0%, ${cat.panelAccent} 100%)` }}
    >
      <div className="w-full max-w-[560px] text-center flex flex-col items-center">
        <h1
          className="text-[clamp(2.8rem,5vw,4.5rem)] font-bold tracking-[0.04em] uppercase text-ink leading-[1] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {cat.title}
        </h1>
        <p className="text-[1.1rem] italic text-green-ink tracking-[0.06em] mb-10">
          {cat.subtitle}
        </p>

        {activeIndex === 0 ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[520px] rounded-[30px] overflow-hidden"
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
        ) : (
          <button className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink border border-ink px-6 py-3.5 hover:bg-ink hover:text-white transition-all duration-300">
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="w-full h-screen relative overflow-hidden bg-[#050505]">
      <div className={`w-full h-full grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-600 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {cat.imagePosition === "left" ? (
          <>{imageEl}{contentEl}</>
        ) : (
          <>
            <div className="order-2 lg:order-1">{contentEl}</div>
            <div className="order-1 lg:order-2">{imageEl}</div>
          </>
        )}
      </div>

      {/* Category dots */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => goToCategory(i)}
            className={`w-1.5 rounded-full transition-all duration-600 ${
              i === activeIndex ? "h-8 bg-white" : "h-1.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={c.title}
          />
        ))}
      </div>

      {/* Category label */}
      <div className="absolute bottom-8 right-6 lg:right-10 z-10">
        <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40">
          {String(activeIndex + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
