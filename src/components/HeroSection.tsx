"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: "home", title: "COMMERCE", subtitle: "Reimagined", image: "/hero.png", searchScope: "Search everything" },
  { id: "fashion", title: "FASHION", subtitle: "Wear the culture", image: "/fashion.png", searchScope: "Search fashion" },
  { id: "beauty", title: "BEAUTY", subtitle: "Pure radiance", image: "/cosmetics.png", searchScope: "Search beauty" },
  { id: "skincare", title: "SKIN CARE", subtitle: "Glow naturally", image: "/skincare.png", searchScope: "Search skin care" },
  { id: "fragrance", title: "FRAGRANCE", subtitle: "Essence of nature", image: "/boutiques.png", searchScope: "Search fragrance" },
  { id: "jewelry", title: "JEWELRY &\nACCESSORIES", subtitle: "Adorn yourself", image: "/jewels.png", searchScope: "Search jewelry" },
  { id: "personalcare", title: "PERSONAL CARE", subtitle: "Nourish within", image: "/items.png", searchScope: "Search personal care" },
  { id: "lifestyle", title: "LIFESTYLE", subtitle: "Live beautifully", image: "/hero.png", searchScope: "Search lifestyle" },
];

const audienceFilters = [
  { id: "all", label: "All" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "children", label: "Children" },
  { id: "unisex", label: "Unisex" },
];

const results = [
  { id: 1, name: "Handwoven Agaseke Basket", boutique: "Inzozi Atelier", price: "RWF 45,000", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=520&fit=crop&q=80" },
  { id: 2, name: "Single-Origin Bourbon Coffee", boutique: "Gorilla Coffee House", price: "RWF 18,000", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=520&fit=crop&q=80" },
  { id: 3, name: "Imigongo Art Panel", boutique: "Urugo Gallery", price: "RWF 120,000", image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&h=520&fit=crop&q=80" },
  { id: 4, name: "Kitenge Wrap Dress", boutique: "Umuco Fashion", price: "RWF 65,000", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=520&fit=crop&q=80" },
  { id: 5, name: "Banana Leaf Tote", boutique: "Keza Crafts", price: "RWF 32,000", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=520&fit=crop&q=80" },
  { id: 6, name: "Ceramic Serving Set", boutique: "Ishimwe Design", price: "RWF 28,000", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=520&fit=crop&q=80" },
  { id: 7, name: "Rwandan Honey Set", boutique: "Inzozi Atelier", price: "RWF 22,000", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=520&fit=crop&q=80" },
  { id: 8, name: "Woven Wall Hanging", boutique: "Keza Crafts", price: "RWF 55,000", image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&h=520&fit=crop&q=80" },
];

type SearchMode = "text" | "voice" | "image" | "video" | "live";

const modeIcons: Record<SearchMode, JSX.Element> = {
  text: <path d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />,
  voice: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
  video: <><path d="m22 8-6 4 6 4V8z" /><rect x="2" y="6" width="14" height="12" rx="2" /></>,
  live: <><circle cx="12" cy="12" r="3" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49" /><path d="M7.76 16.24a6 6 0 0 1 0-8.49" /></>,
};

const modeLabels: Record<SearchMode, string> = { text: "Search", voice: "Voice", image: "Image", video: "Video", live: "Live" };

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>("text");
  const [showModes, setShowModes] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeAudience, setActiveAudience] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cat = categories[activeIndex];

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { setSearchQuery(query.trim()); setShowModes(false); }
  }, [query]);

  const clearSearch = useCallback(() => {
    setSearchQuery(null); setQuery(""); setSearchMode("text"); setIsListening(false);
  }, []);

  const selectMode = useCallback((mode: SearchMode) => {
    setSearchMode(mode); setShowModes(false); setIsListening(false);
    if (mode === "voice") { setIsListening(true); setTimeout(() => { setQuery("Handwoven basket"); setIsListening(false); }, 2500); }
    if (mode === "image") fileInputRef.current?.click();
    if (mode === "live") { setIsListening(true); setTimeout(() => { setQuery("Kitenge fabric dress"); setIsListening(false); }, 3000); }
    if (mode === "video") { setIsListening(true); setTimeout(() => { setQuery("Ceramic serving set"); setIsListening(false); }, 2800); }
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setQuery(`Image: ${file.name}`); setTimeout(() => setSearchQuery(`Image: ${file.name}`), 800); }
  }, []);

  const goToCategory = useCallback((index: number) => {
    if (isTransitioning) return;
    let next = index;
    if (next < 0) next = categories.length - 1;
    if (next >= categories.length) next = 0;
    setIsTransitioning(true); setActiveIndex(next);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  useEffect(() => {
    if (searchQuery) return;
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10 || isScrolling.current) return;
      e.preventDefault(); isScrolling.current = true;
      goToCategory(activeIndex + (e.deltaY > 0 ? 1 : -1));
      setTimeout(() => { isScrolling.current = false; }, 900);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [searchQuery, activeIndex, goToCategory]);

  useEffect(() => {
    if (searchQuery) return;
    const container = containerRef.current;
    if (!container) return;
    const handleTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;
      isScrolling.current = true;
      goToCategory(activeIndex + (deltaY > 0 ? 1 : -1));
      setTimeout(() => { isScrolling.current = false; }, 900);
    };
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => { container.removeEventListener("touchstart", handleTouchStart); container.removeEventListener("touchend", handleTouchEnd); };
  }, [searchQuery, activeIndex, goToCategory]);

  const fileInput = <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />;
  const allModes: SearchMode[] = ["text", "voice", "image", "video", "live"];

  // ─── Search results view ───
  if (searchQuery) {
    return (
      <section className="w-full h-dvh bg-paper text-ink flex flex-col">
        {fileInput}
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-16 pt-20 sm:pt-24 pb-4 sm:pb-6 animate-fade-up">
          <div className="min-w-0 flex-1">
            <p className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-ink/30 mb-1.5">Results for</p>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-ink truncate" style={{ fontFamily: "var(--font-display)" }}>&ldquo;{searchQuery}&rdquo;</h2>
          </div>
          <button onClick={clearSearch} className="text-[0.6rem] font-semibold tracking-[0.16em] uppercase text-ink/30 hover:text-ink/60 border border-ink/8 hover:border-ink/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 flex-shrink-0 ml-4 inline-flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </button>
        </div>
        <div className="flex-1 flex items-center px-5 sm:px-8 lg:px-16 overflow-hidden">
          <div className="flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar pb-6 w-full">
            {[...results, ...results].map((item, i) => (
              <article key={`${item.id}-${i}`} className="flex-shrink-0 w-[200px] sm:w-[260px] lg:w-[300px] group cursor-pointer animate-slide-in rounded-2xl overflow-hidden" style={{ animationDelay: `${i * 70}ms`, background: "rgba(255,255,255,0.45)", backdropFilter: "blur(16px)", border: "1px solid rgba(17,17,16,0.04)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <div className="aspect-[3/4] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-[0.76rem] sm:text-[0.82rem] font-medium text-ink group-hover:text-ink/50 transition-colors duration-200">{item.name}</h3>
                  <p className="text-[0.58rem] sm:text-[0.64rem] text-ink/30 tracking-[0.02em] mt-1">{item.boutique}</p>
                  <p className="text-[0.76rem] sm:text-[0.82rem] text-ink/70 mt-2 font-medium tabular-nums">{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="px-5 sm:px-8 lg:px-16 pb-6 sm:pb-8 flex justify-center">
          <SearchBarInline query={query} setQuery={setQuery} onSubmit={handleSubmit} searchMode={searchMode} showModes={showModes} setShowModes={setShowModes} selectMode={selectMode} isListening={isListening} allModes={allModes} scopeLabel={searchQuery} placeholder={query || "Search for something else"} />
        </div>
      </section>
    );
  }

  // ─── Main boutique view ───
  return (
    <section ref={containerRef} className="w-full h-dvh relative overflow-hidden bg-[#080808] touch-none">
      {fileInput}

      {/* ─── Full-bleed image background ─── */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <Image
          src={cat.image}
          alt={cat.title.replace("\n", " ")}
          fill
          priority={activeIndex === 0}
          className="object-cover brightness-[0.88] contrast-[1.05]"
          sizes="100vw"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* ─── Desktop: content panel on left half ─── */}
      <div className="hidden lg:flex absolute inset-y-0 left-0 w-1/2 z-[5] items-center justify-center">
        <div className={`text-center flex flex-col items-center transition-all duration-700 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          <h1
            className="text-[clamp(2.8rem,5vw,4.5rem)] font-semibold tracking-[0.06em] uppercase text-white leading-[0.95] mb-4 whitespace-pre-line drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {cat.title}
          </h1>
          <p className="text-[1.05rem] italic text-white/70 tracking-[0.03em] mb-8">{cat.subtitle}</p>

          {activeIndex !== 0 && (
            <Link
              href={`/${cat.id}`}
              className="inline-flex items-center gap-2.5 text-[0.66rem] font-semibold tracking-[0.16em] uppercase text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-6 py-3 transition-all duration-300 hover:-translate-y-px hover:shadow-[0_4px_24px_rgba(255,255,255,0.1)] group backdrop-blur-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
              Explore {cat.title.replace("\n", " ").toLowerCase()}
            </Link>
          )}
        </div>
      </div>

      {/* ─── Mobile: title + explore overlaid on image ─── */}
      <div className="lg:hidden absolute inset-0 z-[5] flex flex-col items-center justify-center px-6">
        <div className={`text-center flex flex-col items-center transition-all duration-700 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          <h1
            className="text-[clamp(2rem,10vw,3.5rem)] font-semibold tracking-[0.06em] uppercase text-white leading-[0.95] mb-3 whitespace-pre-line drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {cat.title}
          </h1>
          <p className="text-[0.88rem] italic text-white/65 tracking-[0.03em] mb-6">{cat.subtitle}</p>

          {activeIndex !== 0 && (
            <Link
              href={`/${cat.id}`}
              className="inline-flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.16em] uppercase text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-5 py-2.5 transition-all duration-300 backdrop-blur-sm"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
              Explore
            </Link>
          )}
        </div>
      </div>

      {/* ─── Search bar ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-end justify-center pb-[10vh] sm:pb-[12vh]">
        <div className="pointer-events-auto w-full max-w-[520px] px-5 sm:px-0">
          <SearchBarInline
            query={query} setQuery={setQuery} onSubmit={handleSubmit}
            searchMode={searchMode} showModes={showModes} setShowModes={setShowModes}
            selectMode={selectMode} isListening={isListening} allModes={allModes}
            scopeLabel={cat.searchScope}
            placeholder={activeIndex === 0 ? "Ask about the rebirth of commerce" : `Find ${cat.title.toLowerCase().replace("\n", " ")}...`}
          />
        </div>
      </div>

      {/* ─── Left: audience filter (glassy card) ─── */}
      <div className="hidden lg:flex absolute left-8 xl:left-10 top-1/2 -translate-y-1/2 z-10">
        <div
          className="rounded-2xl px-3 py-4 flex flex-col gap-1 animate-fade-in glass-card"
        >
          <span className="text-[0.48rem] font-bold tracking-[0.2em] uppercase text-white/30 px-2 mb-1.5">Shop for</span>
          {audienceFilters.map((f) => {
            const isActive = activeAudience === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveAudience(f.id)}
                className={`text-left text-[0.58rem] font-semibold tracking-[0.12em] uppercase px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-white bg-white/12"
                    : "text-white/35 hover:text-white/65 hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Right: section nav (glassy card) ─── */}
      <div className="absolute right-3 sm:right-5 lg:right-8 xl:right-10 top-1/2 -translate-y-1/2 z-10">
        <div
          className="rounded-2xl px-2 sm:px-3 py-3 sm:py-4 flex flex-col gap-0.5 sm:gap-1 animate-fade-in glass-card"
        >
          {categories.map((c, i) => {
            const isActive = i === activeIndex;
            const label = c.title.replace("\n", " ");
            return (
              <button
                key={c.id}
                onClick={() => goToCategory(i)}
                className={`flex items-center gap-1.5 sm:gap-2 justify-end px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl transition-all duration-300 group ${
                  isActive ? "bg-white/12" : "hover:bg-white/5"
                }`}
              >
                <span
                  className={`text-[0.42rem] sm:text-[0.54rem] font-semibold tracking-[0.12em] uppercase whitespace-nowrap transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/30 group-hover:text-white/60"
                  }`}
                >
                  {label}
                </span>
                <div className={`w-[3px] rounded-full transition-all duration-500 flex-shrink-0 ${
                  isActive ? "h-4 sm:h-6 bg-white" : "h-[3px] bg-white/25 group-hover:bg-white/50"
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 sm:bottom-8 right-3 sm:right-6 lg:right-10 z-10">
        <span className="text-[0.55rem] sm:text-[0.6rem] font-medium tracking-[0.2em] uppercase text-white/30 tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

/* ─── Persistent Search Bar ─── */

function SearchBarInline({ query, setQuery, onSubmit, searchMode, showModes, setShowModes, selectMode, isListening, allModes, scopeLabel, placeholder }: {
  query: string; setQuery: (q: string) => void; onSubmit: (e: React.FormEvent) => void;
  searchMode: SearchMode; showModes: boolean; setShowModes: (v: boolean) => void;
  selectMode: (m: SearchMode) => void; isListening: boolean; allModes: SearchMode[];
  scopeLabel: string; placeholder: string;
}) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className="rounded-[24px] sm:rounded-[30px] overflow-hidden transition-all duration-300"
        style={{
          border: "1px solid rgba(255,255,255,0.5)",
          background: "linear-gradient(145deg, rgba(255,255,255,0.48), rgba(255,255,255,0.16)), rgba(238,235,221,0.4)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 16px 56px rgba(52,45,31,0.16), 0 4px 12px rgba(0,0,0,0.04)",
          backdropFilter: "blur(28px) saturate(1.3)",
        }}
      >
        <div className="h-[38px] sm:h-[44px] px-3 sm:px-4 flex items-center justify-between border-b border-ink/[0.06]">
          <span className="text-ink/45 text-[0.7rem] sm:text-[0.76rem] font-medium tracking-[0.02em] truncate">{scopeLabel}</span>
          <div className="flex items-center gap-1.5">
            {searchMode !== "text" && (
              <span className="text-[0.52rem] font-semibold tracking-[0.12em] uppercase text-green-ink/60 bg-green-ink/8 px-2 py-0.5 rounded-full">{modeLabels[searchMode]}</span>
            )}
          </div>
        </div>

        <div className="bg-ink/[0.03]">
          <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: showModes ? "1fr" : "0fr", opacity: showModes ? 1 : 0 }}>
            <div className="overflow-hidden">
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
                {allModes.map((mode) => (
                  <button key={mode} type="button" onClick={() => selectMode(mode)}
                    className={`flex flex-col items-center gap-1.5 flex-1 py-2 rounded-xl transition-all duration-200 ${searchMode === mode ? "text-ink" : "text-ink/30 hover:text-ink/60"}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{modeIcons[mode]}</svg>
                    <span className="text-[0.55rem] font-semibold tracking-[0.1em] uppercase">{modeLabels[mode]}</span>
                    {searchMode === mode && <div className="w-1 h-1 rounded-full bg-ink" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: showModes ? "0fr" : "1fr", opacity: showModes ? 0 : 1 }}>
            <div className="overflow-hidden">
              <div className="min-h-[50px] sm:min-h-[58px] grid grid-cols-[auto_1fr_auto] items-center gap-1.5 sm:gap-2.5 px-2 sm:px-2.5 py-1.5 sm:py-2">
                <button type="button" onClick={(e) => { e.stopPropagation(); setShowModes(true); }}
                  className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full inline-flex items-center justify-center text-ink/35 hover:text-ink/60 hover:bg-white/40 transition-all duration-200" aria-label="Search modes">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                </button>
                {isListening ? (
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-green-ink/70 listening-dot" />
                    <span className="text-ink/35 text-[0.82rem] sm:text-[0.9rem]">Listening...</span>
                  </div>
                ) : (
                  <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder}
                    className="w-full bg-transparent text-ink text-[0.82rem] sm:text-[0.9rem] placeholder:text-ink/30 focus:outline-none min-w-0" autoComplete="off" />
                )}
                <button type="submit" className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full inline-flex items-center justify-center bg-ink text-white shadow-[0_4px_16px_rgba(17,17,16,0.18)] hover:shadow-[0_6px_24px_rgba(17,17,16,0.24)] hover:-translate-y-px transition-all duration-200" aria-label="Search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h12M13 7l5 5-5 5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
