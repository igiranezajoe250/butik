"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const categories = [
  { id: "home", title: "COMMERCE", subtitle: "Reimagined", image: "/hero.png", imagePosition: "left" as const, panelBg: "#F4F1E4", panelAccent: "#E3DDC8" },
  { id: "fashion", title: "FASHION", subtitle: "Wear the culture", image: "/fashion.png", imagePosition: "right" as const, panelBg: "#F0EBE3", panelAccent: "#DDD3C4" },
  { id: "beauty", title: "BEAUTY", subtitle: "Pure radiance", image: "/cosmetics.png", imagePosition: "left" as const, panelBg: "#FAF5F0", panelAccent: "#EDE3D6" },
  { id: "skincare", title: "SKIN CARE", subtitle: "Glow naturally", image: "/skincare.png", imagePosition: "right" as const, panelBg: "#EEF2E6", panelAccent: "#D4DFC2" },
  { id: "fragrance", title: "FRAGRANCE", subtitle: "Essence of nature", image: "/boutiques.png", imagePosition: "left" as const, panelBg: "#EDE8E0", panelAccent: "#DDD6CA" },
  { id: "jewelry", title: "JEWELRY &\nACCESSORIES", subtitle: "Adorn yourself", image: "/jewels.png", imagePosition: "right" as const, panelBg: "#F5F0EA", panelAccent: "#E8DDD0" },
  { id: "personalcare", title: "PERSONAL CARE", subtitle: "Nourish within", image: "/items.png", imagePosition: "left" as const, panelBg: "#E6EDE8", panelAccent: "#D0DDD6" },
  { id: "lifestyle", title: "LIFESTYLE", subtitle: "Live beautifully", image: "/hero.png", imagePosition: "right" as const, panelBg: "#F2EDE4", panelAccent: "#E4DCD0" },
];

const results = [
  { id: 1, name: "Handwoven Agaseke Basket", boutique: "Inzozi Atelier", price: "RWF 45,000", color: "#c8b9a6" },
  { id: 2, name: "Single-Origin Bourbon Coffee", boutique: "Gorilla Coffee House", price: "RWF 18,000", color: "#7a6850" },
  { id: 3, name: "Imigongo Art Panel", boutique: "Urugo Gallery", price: "RWF 120,000", color: "#2a2a2a" },
  { id: 4, name: "Kitenge Wrap Dress", boutique: "Umuco Fashion", price: "RWF 65,000", color: "#8a7060" },
  { id: 5, name: "Banana Leaf Tote", boutique: "Keza Crafts", price: "RWF 32,000", color: "#706050" },
  { id: 6, name: "Ceramic Serving Set", boutique: "Ishimwe Design", price: "RWF 28,000", color: "#5a7258" },
  { id: 7, name: "Rwandan Honey Set", boutique: "Inzozi Atelier", price: "RWF 22,000", color: "#b89850" },
  { id: 8, name: "Woven Wall Hanging", boutique: "Keza Crafts", price: "RWF 55,000", color: "#9a8268" },
];

type SearchMode = "text" | "voice" | "image" | "video" | "live";

// Minimal line icons for each mode
const modeIcons: Record<SearchMode, JSX.Element> = {
  text: <path d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />,
  voice: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
  video: <><path d="m22 8-6 4 6 4V8z" /><rect x="2" y="6" width="14" height="12" rx="2" /></>,
  live: <><circle cx="12" cy="12" r="3" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49" /><path d="M7.76 16.24a6 6 0 0 1 0-8.49" /></>,
};

const modePlaceholders: Record<SearchMode, string> = {
  text: "Ask about the rebirth of commerce",
  voice: "Listening...",
  image: "Upload or drop an image",
  video: "Point your camera at a product",
  live: "Live — speak or show",
};

const modeLabels: Record<SearchMode, string> = {
  text: "Search",
  voice: "Voice",
  image: "Image",
  video: "Video",
  live: "Live",
};

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>("text");
  const [showModes, setShowModes] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) { setSearchQuery(query.trim()); setShowModes(false); }
  }, [query]);

  const clearSearch = useCallback(() => {
    setSearchQuery(null); setQuery(""); setSearchMode("text"); setIsListening(false);
  }, []);

  const selectMode = useCallback((mode: SearchMode) => {
    setSearchMode(mode);
    setShowModes(false);
    setIsListening(false);
    if (mode === "voice") {
      setIsListening(true);
      setTimeout(() => { setQuery("Handwoven basket"); setIsListening(false); }, 2500);
    }
    if (mode === "image") fileInputRef.current?.click();
    if (mode === "live") {
      setIsListening(true);
      setTimeout(() => { setQuery("Kitenge fabric dress"); setIsListening(false); }, 3000);
    }
    if (mode === "video") {
      setIsListening(true);
      setTimeout(() => { setQuery("Ceramic serving set"); setIsListening(false); }, 2800);
    }
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setQuery(`Image: ${file.name}`); setTimeout(() => setSearchQuery(`Image: ${file.name}`), 800); }
  }, []);

  const goToCategory = useCallback((index: number) => {
    if (isTransitioning) return;
    // Loop: wrap around
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

  const cat = categories[activeIndex];

  const fileInput = <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />;

  // Search results
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
                <div className="aspect-[3/4] relative" style={{ backgroundColor: item.color }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/12 text-[0.48rem] sm:text-[0.56rem] tracking-[0.3em] uppercase font-semibold">{item.boutique}</span>
                  </div>
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
          <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} searchMode={searchMode} showModes={showModes} setShowModes={setShowModes} selectMode={selectMode} isListening={isListening} variant="results" />
        </div>
      </section>
    );
  }

  const imageEl = (
    <div className="relative h-[45vh] sm:h-[50vh] lg:h-full overflow-hidden" key={`img-${cat.id}`}>
      <Image src={cat.image} alt={cat.title.replace("\n", " ")} fill priority={activeIndex === 0} className="object-cover brightness-[0.92] contrast-[1.05] transition-opacity duration-700" sizes="(max-width: 1024px) 100vw, 50vw" />
    </div>
  );

  const contentEl = (
    <div className="relative h-[55vh] sm:h-[50vh] lg:h-full flex flex-col items-center justify-center px-6 sm:px-8 lg:px-16 py-8 transition-colors duration-700" key={`panel-${cat.id}`} style={{ background: `linear-gradient(135deg, ${cat.panelBg} 0%, ${cat.panelAccent} 100%)` }}>
      {fileInput}
      <div className="w-full max-w-[560px] text-center flex flex-col items-center">
        {activeIndex === 0 ? (
          <>
            <h1 className="text-[clamp(1.8rem,8vw,4.5rem)] lg:text-[clamp(2.8rem,5vw,4.5rem)] font-semibold tracking-[0.06em] uppercase text-ink leading-[0.95] mb-3 sm:mb-4 whitespace-pre-line" style={{ fontFamily: "var(--font-display)" }}>{cat.title}</h1>
            <p className="text-[0.88rem] sm:text-[1.05rem] italic text-green-ink tracking-[0.03em] mb-6 sm:mb-10">{cat.subtitle}</p>
            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} searchMode={searchMode} showModes={showModes} setShowModes={setShowModes} selectMode={selectMode} isListening={isListening} variant="hero" />
          </>
        ) : (
          <div className="rounded-3xl px-8 sm:px-12 py-10 sm:py-14" style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(24px) saturate(1.2)", border: "1px solid rgba(255,255,255,0.55)", boxShadow: "0 12px 48px rgba(0,0,0,0.06)" }}>
            <h1 className="text-[clamp(1.8rem,8vw,4.5rem)] lg:text-[clamp(2.8rem,5vw,4.5rem)] font-semibold tracking-[0.06em] uppercase text-ink leading-[0.95] mb-3 sm:mb-4 whitespace-pre-line" style={{ fontFamily: "var(--font-display)" }}>{cat.title}</h1>
            <p className="text-[0.88rem] sm:text-[1.05rem] italic text-green-ink tracking-[0.03em] mb-8 sm:mb-10">{cat.subtitle}</p>
            <button className="inline-flex items-center gap-2.5 text-[0.66rem] sm:text-[0.7rem] font-semibold tracking-[0.16em] uppercase text-white bg-ink rounded-full px-6 sm:px-7 py-3 sm:py-3.5 hover:bg-ink/88 transition-all duration-200 shadow-[0_4px_16px_rgba(17,17,16,0.12)] hover:-translate-y-px">
              Explore
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="w-full h-dvh relative overflow-hidden bg-[#080808] touch-none">
      <div className={`w-full h-full grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-600 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {cat.imagePosition === "left" ? <>{imageEl}{contentEl}</> : <><div className="order-2 lg:order-1">{contentEl}</div><div className="order-1 lg:order-2">{imageEl}</div></>}
      </div>
      <div className="absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 sm:gap-3">
        {categories.map((c, i) => (
          <button key={c.id} onClick={() => goToCategory(i)} className={`w-1.5 rounded-full transition-all duration-600 ${i === activeIndex ? "h-6 sm:h-8 bg-white" : "h-1.5 bg-white/30 hover:bg-white/60"}`} aria-label={c.title.replace("\n", " ")} />
        ))}
      </div>
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-6 lg:right-10 z-10">
        <span className="text-[0.55rem] sm:text-[0.6rem] font-medium tracking-[0.2em] uppercase text-white/30 tabular-nums">{String(activeIndex + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

/* ─── Inline Search Bar ─── */

function SearchBar({ query, setQuery, onSubmit, searchMode, showModes, setShowModes, selectMode, isListening, variant }: {
  query: string; setQuery: (q: string) => void; onSubmit: (e: React.FormEvent) => void;
  searchMode: SearchMode; showModes: boolean; setShowModes: (v: boolean) => void;
  selectMode: (m: SearchMode) => void; isListening: boolean; variant: "hero" | "results";
}) {
  const isHero = variant === "hero";
  const allModes: SearchMode[] = ["text", "voice", "image", "video", "live"];

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[520px]">
      <div
        className="rounded-[24px] sm:rounded-[30px] overflow-hidden transition-all duration-300"
        style={isHero ? {
          border: "1px solid rgba(255,255,255,0.52)",
          background: "linear-gradient(145deg, rgba(255,255,255,0.46), rgba(255,255,255,0.14)), rgba(238,235,221,0.44)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -16px 36px rgba(70,65,46,0.06), 0 20px 60px rgba(52,45,31,0.14)",
          backdropFilter: "blur(28px) saturate(1.3)",
        } : {
          border: "1px solid rgba(17,17,16,0.1)",
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header — only on hero */}
        {isHero && (
          <div className="h-[40px] sm:h-[46px] px-3 sm:px-4 flex items-center justify-between border-b border-ink/[0.08]">
            <span className="text-ink/50 text-[0.74rem] sm:text-[0.8rem] font-medium tracking-[0.02em]">Butik intelligence</span>
            {searchMode !== "text" && (
              <span className="text-[0.56rem] font-semibold tracking-[0.12em] uppercase text-green-ink/60 bg-green-ink/8 px-2 py-0.5 rounded-full">{modeLabels[searchMode]}</span>
            )}
          </div>
        )}

        {/* Main row — toggles between input and mode picker */}
        <div className={`${isHero ? "bg-ink/5" : ""}`}>
          {/* Mode picker — inline, replaces the input row */}
          <div
            className="grid transition-all duration-300 ease-out"
            style={{
              gridTemplateRows: showModes ? "1fr" : "0fr",
              opacity: showModes ? 1 : 0,
            }}
          >
            <div className="overflow-hidden">
              <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
                {allModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => selectMode(mode)}
                    className={`flex flex-col items-center gap-1.5 flex-1 py-2 rounded-xl transition-all duration-200 ${
                      searchMode === mode ? "text-ink" : "text-ink/30 hover:text-ink/60"
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{modeIcons[mode]}</svg>
                    <span className="text-[0.55rem] font-semibold tracking-[0.1em] uppercase">{modeLabels[mode]}</span>
                    {searchMode === mode && <div className="w-1 h-1 rounded-full bg-ink" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input row */}
          <div
            className="grid transition-all duration-300 ease-out"
            style={{
              gridTemplateRows: showModes ? "0fr" : "1fr",
              opacity: showModes ? 0 : 1,
            }}
          >
            <div className="overflow-hidden">
              <div className="min-h-[52px] sm:min-h-[62px] grid grid-cols-[auto_1fr_auto] items-center gap-1.5 sm:gap-2.5 px-2 sm:px-2.5 py-1.5 sm:py-2">
                {/* Mode toggle */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowModes(true); }}
                  className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full inline-flex items-center justify-center text-ink/40 hover:text-ink/70 hover:bg-white/40 transition-all duration-200"
                  aria-label="Search modes"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>

                {/* Input or listening */}
                {isListening ? (
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-green-ink/70 listening-dot" />
                    <span className="text-ink/40 text-[0.85rem] sm:text-[0.95rem]">{modePlaceholders[searchMode]}</span>
                  </div>
                ) : (
                  <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={modePlaceholders[searchMode]} className="w-full bg-transparent text-ink text-[0.85rem] sm:text-[0.95rem] placeholder:text-ink/35 focus:outline-none min-w-0" autoComplete="off" />
                )}

                {/* Submit */}
                <button type="submit" className="w-[38px] h-[38px] sm:w-[44px] sm:h-[44px] rounded-full inline-flex items-center justify-center bg-ink text-white shadow-[0_6px_20px_rgba(17,17,16,0.2)] hover:shadow-[0_8px_28px_rgba(17,17,16,0.28)] hover:-translate-y-px transition-all duration-200" aria-label="Search">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h12M13 7l5 5-5 5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
