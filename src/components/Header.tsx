"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

type MenuView = null | "main" | "boutiques" | "about";

const boutiques = [
  { name: "Inzozi Atelier", color: "#c4a882" },
  { name: "Gorilla Coffee House", color: "#6b5b4a" },
  { name: "Urugo Gallery", color: "#3a3a3a" },
  { name: "Umuco Fashion", color: "#8b6f5e" },
  { name: "Keza Crafts", color: "#7a6854" },
  { name: "Ishimwe Design", color: "#5c7a5c" },
  { name: "Amahoro Beauty", color: "#9b7c6b" },
  { name: "Ubumwe Textiles", color: "#6a7d5e" },
  { name: "Ingabo Leather", color: "#8a6f4e" },
  { name: "Nyamirambo Market", color: "#5a4a3a" },
  { name: "Imena Jewelry", color: "#b08d6e" },
  { name: "Rwema Home", color: "#7a8a6a" },
  { name: "Urukundo Coffee", color: "#6b5545" },
  { name: "Izuba Sun Care", color: "#c4a050" },
  { name: "Imana Fragrance", color: "#8b7070" },
  { name: "Agaseke Weavers", color: "#a08870" },
  { name: "Intore Style", color: "#5a6a7a" },
  { name: "Ubuzima Wellness", color: "#6a8a6a" },
];

const articlePages = [
  {
    num: "01",
    kicker: "About Butik",
    title: "What does it mean to run a store in 2026?",
    subtitle: "And what will it look like in 2035?",
    body: null,
    bg: "#F4F6EF",
  },
  {
    num: "02",
    kicker: null,
    title: "The words we use for great stores",
    subtitle: null,
    body: "For a long time, we have associated great stores with certain words — beautiful, modern, luxurious, clean, efficient. Yet many businesses do not struggle because they lack ambition. They struggle because running a store requires carrying too many responsibilities at once.",
    bg: "#F0EDE6",
  },
  {
    num: "03",
    kicker: null,
    title: "The burden of running everything",
    subtitle: null,
    body: "A shop owner must serve customers, manage inventory, negotiate with suppliers, handle deliveries, organize shelves, process payments, market the business, track finances, and somehow find time to think about growth. The reality is that many businesses are operating below their potential because the burden of running everything falls on a small number of people.",
    bg: "#EEF2E6",
  },
  {
    num: "04",
    kicker: null,
    title: "The idea behind Butik",
    subtitle: null,
    body: "What if a merchant could focus on serving customers while benefiting from systems, processes, logistics, technology, and operational capabilities that were already proven? We are not asking businesses to become something different. We are helping them become a better version of what they already are.",
    bg: "#F4F1E4",
  },
  {
    num: "05",
    kicker: null,
    title: "Commerce is older than software",
    subtitle: null,
    body: "Commerce is one of humanity’s oldest activities. Long before modern companies, software, payment systems, and supply chains, people exchanged goods, built trust, created markets, and formed communities around trade. Commerce has always been more than buying and selling. It is one of the ways people create value for one another.",
    bg: "#F0EBE3",
  },
  {
    num: "06",
    kicker: null,
    title: "The best technology should be calm",
    subtitle: null,
    body: "We believe the next chapter of commerce will be shaped by technology, but not by putting more screens, dashboards, and complexity in front of people. The best technology should operate quietly in the background while people focus on serving customers, building relationships, and growing their businesses.",
    bg: "#EEF0EA",
  },
  {
    num: "07",
    kicker: null,
    title: "The future is intelligent",
    subtitle: null,
    body: "Today we are entering a new era where technology is no longer just a tool. It is becoming a participant. Machines can answer questions, assist customers, understand context, recommend products, coordinate operations, and help businesses make decisions. The future is not simply digital. The future is intelligent.",
    bg: "#F2EDE4",
  },
  {
    num: "08",
    kicker: null,
    title: "One business at a time",
    subtitle: null,
    body: "Whatever commerce requires today, and whatever it becomes tomorrow, our goal remains the same: to help businesses participate in that future. To make running a business simpler. To make operations smarter. To make commerce more human.",
    bg: "#F4F6EF",
  },
];

export default function Header() {
  const [menuView, setMenuView] = useState<MenuView>(null);

  const closeMenu = () => setMenuView(null);

  return (
    <>
      {/* Brand card */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-30 min-w-0 sm:min-w-[220px] lg:min-w-[260px] bg-white text-ink flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.16)] border border-black/5">
        <Link href="/" onClick={closeMenu}>
          <span className="text-[0.85rem] sm:text-[0.95rem] lg:text-[1.05rem] font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-display)" }}>Butik</span>
        </Link>
        <button
          onClick={() => setMenuView(menuView ? null : "main")}
          className="w-[22px] h-[14px] flex flex-col justify-between cursor-pointer ml-6 sm:ml-8"
          aria-label={menuView ? "Close menu" : "Open menu"}
        >
          <span className={`block w-full h-[2px] bg-ink transition-transform duration-300 origin-center ${menuView ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-full h-[2px] bg-ink transition-transform duration-300 origin-center ${menuView ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Quick actions — hidden when menu is open */}
      {!menuView && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-30 flex items-center gap-2">
          <Link href="/cart" className="h-[40px] sm:h-[46px] min-w-0 sm:min-w-[118px] border border-white/30 bg-white/90 text-ink inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-[0.72rem] font-bold tracking-[0.12em] uppercase px-3 sm:px-4 shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-[14px] hover:bg-white hover:-translate-y-px transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M5 6h15l-1.7 8.2a2 2 0 0 1-2 1.6H8.1a2 2 0 0 1-2-1.7L4.8 3H2" /><path d="M9 20h.01M17 20h.01" /></svg>
            <span className="hidden sm:inline">Checkout</span>
          </Link>
          <Link href="/wallet" className="h-[40px] sm:h-[46px] min-w-0 sm:min-w-[118px] border border-white/30 bg-white/90 text-ink inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-[0.72rem] font-bold tracking-[0.12em] uppercase px-3 sm:px-4 shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-[14px] hover:bg-white hover:-translate-y-px transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" /><path d="M17 12h.01" /><path d="M4 8h15" /></svg>
            <span className="hidden sm:inline">Wallet</span>
          </Link>
        </div>
      )}

      {/* Menu overlay */}
      {menuView && (
        <div className="fixed inset-0 z-20 animate-fade-in">
          {menuView === "main" && (
            <div className="w-full h-full bg-paper text-ink flex flex-col">
              <div className="h-16 sm:h-20" />
              <nav className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-20 gap-5 sm:gap-6 max-w-[800px]">
                <button onClick={() => setMenuView("boutiques")} className="text-left text-2xl sm:text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up" style={{ fontFamily: "var(--font-display)" }}>Boutiques</button>
                <button onClick={() => setMenuView("about")} className="text-left text-2xl sm:text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up delay-100" style={{ fontFamily: "var(--font-display)" }}>About</button>
                <Link href="/wallet" onClick={closeMenu} className="text-2xl sm:text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up delay-200" style={{ fontFamily: "var(--font-display)" }}>Wallet</Link>
              </nav>
            </div>
          )}

          {menuView === "boutiques" && (
            <div className="w-full h-full bg-paper text-ink overflow-y-auto">
              <div className="h-16 sm:h-20" />
              <div className="px-5 sm:px-8 lg:px-16 py-6 sm:py-10">
                <button onClick={() => setMenuView("main")} className="text-[0.68rem] sm:text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/50 hover:text-ink mb-6 sm:mb-10 transition-colors">Back</button>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 sm:gap-8 lg:gap-10">
                  {boutiques.map((b, i) => (
                    <button key={b.name} className="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer animate-fade-up" style={{ animationDelay: `${i * 40}ms` }} onClick={closeMenu}>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: b.color }}>
                        <span className="text-white text-[0.65rem] sm:text-sm lg:text-base font-bold tracking-wide">{b.name.split(" ").map((w) => w[0]).join("")}</span>
                      </div>
                      <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold tracking-wide text-ink/60 group-hover:text-ink text-center transition-colors leading-tight max-w-[80px] sm:max-w-[90px]">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {menuView === "about" && (
            <AboutArticle onBack={() => setMenuView("main")} />
          )}
        </div>
      )}
    </>
  );
}

function AboutArticle({ onBack }: { onBack: () => void }) {
  const [activePage, setActivePage] = useState(0);
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const goToPage = useCallback((index: number) => {
    if (index < 0 || index >= articlePages.length) return;
    setActivePage(index);
  }, []);

  // Wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current || Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      isScrolling.current = true;
      goToPage(activePage + (e.deltaY > 0 ? 1 : -1));
      setTimeout(() => { isScrolling.current = false; }, 800);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [activePage, goToPage]);

  // Touch swipe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;
      isScrolling.current = true;
      goToPage(activePage + (deltaY > 0 ? 1 : -1));
      setTimeout(() => { isScrolling.current = false; }, 800);
    };
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activePage, goToPage]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); goToPage(activePage + 1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); goToPage(activePage - 1); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activePage, goToPage]);

  const page = articlePages[activePage];

  return (
    <div
      ref={containerRef}
      className="w-full h-full text-ink overflow-hidden relative touch-none"
      style={{ backgroundColor: page.bg, transition: "background-color 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <button
        onClick={onBack}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-30 text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.14em] uppercase text-ink/40 hover:text-ink border border-ink/15 hover:border-ink/40 bg-white/60 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 transition-colors"
      >
        Close
      </button>

      <div className="w-full h-full flex items-center justify-center px-6 sm:px-10 lg:px-20" key={activePage}>
        <div className="max-w-[900px] w-full animate-fade-up">
          {page.kicker && (
            <p className="text-[0.68rem] sm:text-[0.72rem] font-bold tracking-[0.16em] uppercase text-green-ink mb-4 sm:mb-6">{page.kicker}</p>
          )}

          <div className="flex items-start gap-4 sm:gap-8 lg:gap-16">
            <span className="text-2xl sm:text-4xl lg:text-6xl text-ink/15 font-medium flex-shrink-0 leading-none" style={{ fontFamily: "var(--font-display)" }}>
              {page.num}
            </span>
            <div className="flex-1 min-w-0">
              <h2
                className="text-xl sm:text-3xl lg:text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] sm:leading-[1] max-w-[14ch] mb-4 sm:mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {page.title}
              </h2>
              {page.subtitle && (
                <p className="text-base sm:text-lg italic text-green-ink tracking-wide">{page.subtitle}</p>
              )}
              {page.body && (
                <p className="text-[0.82rem] sm:text-sm lg:text-base leading-[1.7] sm:leading-[1.85] text-[#263126] max-w-[60ch] mt-3 sm:mt-4">{page.body}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
        {articlePages.map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`rounded-full transition-all duration-500 ${
              i === activePage ? "w-6 sm:w-8 h-1.5 bg-ink/60" : "w-1.5 h-1.5 bg-ink/15 hover:bg-ink/30"
            }`}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-10">
        <span className="text-[0.55rem] sm:text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink/30">
          {String(activePage + 1).padStart(2, "0")} / {String(articlePages.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
