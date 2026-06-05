"use client";

import { useState } from "react";
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

const articleSections = [
  {
    num: "01",
    title: "The words we use for great stores",
    body: "For a long time, we have associated great stores with certain words — beautiful, modern, luxurious, clean, efficient. Yet many businesses do not struggle because they lack ambition. They struggle because running a store requires carrying too many responsibilities at once.",
  },
  {
    num: "02",
    title: "The burden of running everything",
    body: "A shop owner must serve customers, manage inventory, negotiate with suppliers, handle deliveries, organize shelves, process payments, market the business, track finances, and somehow find time to think about growth. The reality is that many businesses are operating below their potential because the burden of running everything falls on a small number of people.",
  },
  {
    num: "03",
    title: "The idea behind Butik",
    body: "What if a merchant could focus on serving customers while benefiting from systems, processes, logistics, technology, and operational capabilities that were already proven? We are not asking businesses to become something different. We are helping them become a better version of what they already are.",
  },
  {
    num: "04",
    title: "Commerce is older than software",
    body: "Commerce is one of humanity's oldest activities. Long before modern companies, software, payment systems, and supply chains, people exchanged goods, built trust, created markets, and formed communities around trade. Commerce has always been more than buying and selling. It is one of the ways people create value for one another.",
  },
  {
    num: "05",
    title: "The best technology should be calm",
    body: "We believe the next chapter of commerce will be shaped by technology, but not by putting more screens, dashboards, and complexity in front of people. The best technology should operate quietly in the background while people focus on serving customers, building relationships, and growing their businesses.",
  },
  {
    num: "06",
    title: "The future is intelligent",
    body: "Today we are entering a new era where technology is no longer just a tool. It is becoming a participant. Machines can answer questions, assist customers, understand context, recommend products, coordinate operations, and help businesses make decisions. The future is not simply digital. The future is intelligent.",
  },
  {
    num: "07",
    title: "Beyond e-commerce",
    body: "The answer goes beyond e-commerce. It includes physical retail, customer conversations, payments, logistics, inventory, wholesale trade, finance, operations, and the intelligent systems that connect them together. Because commerce does not happen on a website. Commerce happens wherever people exchange value.",
  },
  {
    num: "08",
    title: "One business at a time",
    body: "Whatever commerce requires today, and whatever it becomes tomorrow, our goal remains the same: to help businesses participate in that future. To make running a business simpler. To make operations smarter. To make commerce more human. To give every merchant access to capabilities that were once available only to the world's largest retailers.",
  },
];

export default function Header() {
  const [menuView, setMenuView] = useState<MenuView>(null);

  const closeMenu = () => setMenuView(null);

  return (
    <>
      {/* Brand card */}
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

      {/* Quick actions */}
      <div className="fixed bottom-6 left-6 lg:bottom-8 lg:left-8 z-30 flex items-center gap-2.5">
        <Link href="/cart" className="h-[46px] min-w-[118px] border border-white/30 bg-white/90 text-ink inline-flex items-center justify-center gap-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-[14px] hover:bg-white hover:-translate-y-px transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6h15l-1.7 8.2a2 2 0 0 1-2 1.6H8.1a2 2 0 0 1-2-1.7L4.8 3H2" /><path d="M9 20h.01M17 20h.01" /></svg>
          Checkout
        </Link>
        <Link href="/wallet" className="h-[46px] min-w-[118px] border border-white/30 bg-white/90 text-ink inline-flex items-center justify-center gap-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-[14px] hover:bg-white hover:-translate-y-px transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" /><path d="M17 12h.01" /><path d="M4 8h15" /></svg>
          Wallet
        </Link>
      </div>

      {/* Menu overlay */}
      {menuView && (
        <div className="fixed inset-0 z-20 bg-paper text-ink animate-fade-in overflow-y-auto">
          <div className="min-h-full flex flex-col">
            <div className="h-20" />

            {menuView === "main" && (
              <nav className="flex-1 flex flex-col justify-center px-10 lg:px-20 gap-6 max-w-[800px]">
                <button onClick={() => setMenuView("boutiques")} className="text-left text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up" style={{ fontFamily: "var(--font-display)" }}>
                  Boutiques
                </button>
                <button onClick={() => setMenuView("about")} className="text-left text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up delay-100" style={{ fontFamily: "var(--font-display)" }}>
                  About
                </button>
                <Link href="/wallet" onClick={closeMenu} className="text-3xl lg:text-5xl font-medium text-ink hover:text-green-ink transition-colors animate-fade-up delay-200" style={{ fontFamily: "var(--font-display)" }}>
                  Wallet
                </Link>
              </nav>
            )}

            {menuView === "boutiques" && (
              <div className="flex-1 px-8 lg:px-16 py-10">
                <button onClick={() => setMenuView("main")} className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/50 hover:text-ink mb-10 transition-colors">
                  Back
                </button>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 lg:gap-10">
                  {boutiques.map((b, i) => (
                    <button
                      key={b.name}
                      className="flex flex-col items-center gap-3 group cursor-pointer animate-fade-up"
                      style={{ animationDelay: `${i * 40}ms` }}
                      onClick={closeMenu}
                    >
                      <div
                        className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: b.color }}
                      >
                        <span className="text-white text-sm lg:text-base font-bold tracking-wide">
                          {b.name.split(" ").map((w) => w[0]).join("")}
                        </span>
                      </div>
                      <span className="text-[0.7rem] font-semibold tracking-wide text-ink/60 group-hover:text-ink text-center transition-colors leading-tight max-w-[90px]">
                        {b.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {menuView === "about" && (
              <div className="flex-1 px-8 lg:px-16 py-10">
                <button onClick={() => setMenuView("main")} className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink/50 hover:text-ink mb-10 transition-colors">
                  Back
                </button>

                <div className="max-w-[1180px] mx-auto flex flex-col gap-16 lg:gap-24 animate-fade-up">
                  {/* Article hero */}
                  <header className="grid grid-cols-1 lg:grid-cols-[0.45fr_1fr] gap-8 lg:gap-16 items-end border-t border-ink/10 pt-8 min-h-[40vh]">
                    <p className="text-[0.72rem] font-bold tracking-[0.16em] uppercase text-green-ink">About Butik</p>
                    <div>
                      <h2 className="text-3xl lg:text-[clamp(3rem,7vw,5rem)] font-medium leading-[0.98] max-w-[13ch] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                        What does it mean to run a store in 2026?
                      </h2>
                      <p className="text-base lg:text-lg italic text-green-ink tracking-wide">And what will it look like in 2035?</p>
                    </div>
                  </header>

                  {/* Article sections */}
                  {articleSections.map((s) => (
                    <section key={s.num} className="grid grid-cols-1 lg:grid-cols-[0.25fr_1fr] gap-4 lg:gap-16 border-t border-ink/10 pt-8">
                      <span className="text-2xl lg:text-3xl text-ink/25 sticky top-8 self-start" style={{ fontFamily: "var(--font-display)" }}>{s.num}</span>
                      <div className="max-w-[780px]">
                        <h3 className="text-2xl lg:text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1] max-w-[12ch] mb-4" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                        <p className="text-sm lg:text-base leading-[1.85] text-[#263126] max-w-[66ch]">{s.body}</p>
                      </div>
                    </section>
                  ))}

                  {/* Closing */}
                  <section className="border-t border-ink/10 pt-8 pb-16">
                    <p className="text-2xl lg:text-4xl font-medium text-ink leading-[1.05] max-w-[14ch]" style={{ fontFamily: "var(--font-display)" }}>
                      That is the future we are building. One business at a time.
                    </p>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
