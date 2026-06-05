"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type MenuView = null | "main" | "boutiques" | "about";

const boutiques = [
  { name: "Inzozi Atelier", color: "#c4a882" },
  { name: "Gorilla Coffee House", color: "#6b5b4a" },
  { name: "Urugo Gallery", color: "#3a3a3a" },
  { name: "Umuco Fashion", color: "#8b6f5e" },
  { name: "Keza Crafts", color: "#7a6854" },
  { name: "Ishimwe Design", color: "#5c7a5c" },
];

export default function Header() {
  const [menuView, setMenuView] = useState<MenuView>(null);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuView(null);

  return (
    <>
      {/* Brand card — overlaid on hero left */}
      <div className="fixed top-6 left-6 lg:top-8 lg:left-8 z-30 min-w-[220px] lg:min-w-[260px] bg-white text-ink flex items-center justify-between px-5 py-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.16)] border border-black/5">
        <Link href="/" onClick={closeMenu}>
          <span className="text-[0.95rem] lg:text-[1.05rem] font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
            Butik
          </span>
        </Link>
        <button
          onClick={() => setMenuView(menuView ? null : "main")}
          className="w-[22px] h-[14px] flex flex-col justify-between cursor-pointer"
          aria-label={menuView ? "Close menu" : "Open menu"}
        >
          <span className={`block w-full h-[2px] bg-ink transition-transform duration-300 origin-center ${menuView ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-full h-[2px] bg-ink transition-transform duration-300 origin-center ${menuView ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Quick actions — overlaid on hero left bottom, hidden when scrolled */}
      <div className={`fixed bottom-6 left-6 lg:bottom-8 lg:left-8 z-30 flex items-center gap-2.5 transition-opacity duration-300 ${pastHero ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Link
          href="/cart"
          className="h-[46px] min-w-[118px] border border-white/30 bg-white/90 text-ink inline-flex items-center justify-center gap-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-[14px] hover:bg-white hover:-translate-y-px transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 6h15l-1.7 8.2a2 2 0 0 1-2 1.6H8.1a2 2 0 0 1-2-1.7L4.8 3H2" />
            <path d="M9 20h.01M17 20h.01" />
          </svg>
          Checkout
        </Link>
        <Link
          href="/wallet"
          className="h-[46px] min-w-[118px] border border-white/30 bg-white/90 text-ink inline-flex items-center justify-center gap-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-[14px] hover:bg-white hover:-translate-y-px transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
            <path d="M17 12h.01" />
            <path d="M4 8h15" />
          </svg>
          Wallet
        </Link>
      </div>

      {/* Menu overlay */}
      {menuView && (
        <div className="fixed inset-0 z-20 bg-paper text-ink animate-fade-in overflow-y-auto">
          <div className="min-h-full flex flex-col">
            {/* Top bar space */}
            <div className="h-20" />

            {menuView === "main" && (
              <nav className="flex-1 flex flex-col justify-center px-10 lg:px-20 gap-6 max-w-[800px]">
                <button
                  onClick={() => setMenuView("boutiques")}
                  className="text-left text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Boutiques
                </button>
                <button
                  onClick={() => setMenuView("about")}
                  className="text-left text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up delay-100"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  About
                </button>
                <Link
                  href="/wallet"
                  onClick={closeMenu}
                  className="text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up delay-200"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Wallet
                </Link>
              </nav>
            )}

            {menuView === "boutiques" && (
              <div className="flex-1 px-10 lg:px-20 py-10">
                <button
                  onClick={() => setMenuView("main")}
                  className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/50 hover:text-ink mb-10 transition-colors"
                >
                  Back
                </button>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10 max-w-[900px]">
                  {boutiques.map((b) => (
                    <button
                      key={b.name}
                      className="flex flex-col items-center gap-3 group cursor-pointer animate-fade-up"
                      onClick={closeMenu}
                    >
                      <div
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: b.color }}
                      >
                        <span className="text-white text-xs lg:text-sm font-bold tracking-wide">
                          {b.name.split(" ").map((w) => w[0]).join("")}
                        </span>
                      </div>
                      <span className="text-[0.7rem] font-semibold tracking-wide text-ink/70 group-hover:text-ink text-center transition-colors leading-tight">
                        {b.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {menuView === "about" && (
              <div className="flex-1 px-10 lg:px-20 py-10 max-w-[900px]">
                <button
                  onClick={() => setMenuView("main")}
                  className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/50 hover:text-ink mb-10 transition-colors"
                >
                  Back
                </button>

                <div className="space-y-12 animate-fade-up">
                  <div>
                    <p className="text-[0.72rem] font-bold tracking-[0.16em] uppercase text-green-ink mb-3">About Butik</p>
                    <h2 className="text-3xl lg:text-5xl font-medium leading-[0.98] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                      What does it mean to run a store in 2026?
                    </h2>
                    <p className="text-base italic text-green-ink tracking-wide">And what will it look like in 2035?</p>
                  </div>

                  {[
                    {
                      num: "01",
                      title: "Conversation-first",
                      text: "Tell us what you need in your own words. Our network of boutique agents and real people find exactly what you're looking for.",
                    },
                    {
                      num: "02",
                      title: "Seamless payments",
                      text: "Pay how you want. Mobile money, card, stablecoin, or lightning. Your wallet holds your assets and transaction history in one place.",
                    },
                    {
                      num: "03",
                      title: "Direct from source",
                      text: "No middlemen. Every transaction connects you directly with verified boutiques and artisans across Rwanda's markets.",
                    },
                  ].map((p) => (
                    <div key={p.num} className="border-t border-ink/10 pt-6 grid grid-cols-[60px_1fr] gap-6">
                      <span className="text-2xl text-ink/30" style={{ fontFamily: "var(--font-display)" }}>{p.num}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-ink mb-2">{p.title}</h3>
                        <p className="text-sm leading-relaxed text-[#263126]">{p.text}</p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-ink/10 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { value: "200+", label: "Boutiques" },
                      { value: "50K+", label: "Products" },
                      { value: "30", label: "Districts" },
                      { value: "24/7", label: "Available" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-2xl font-medium text-ink" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                        <p className="text-[0.68rem] tracking-[0.15em] uppercase text-ink/40 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-ink/10 pt-8">
                    <p className="text-sm leading-relaxed text-[#263126] max-w-[60ch]">
                      Commerce is one of humanity&apos;s oldest activities. Long before modern software and payment systems, people exchanged goods, built trust, and formed communities around trade. We believe the next chapter will be shaped by technology that operates quietly while people focus on what matters.
                    </p>
                    <p className="text-xl font-medium text-ink mt-6" style={{ fontFamily: "var(--font-display)" }}>
                      One business at a time.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
