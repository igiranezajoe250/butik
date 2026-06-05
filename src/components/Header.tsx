"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-warm-white/80 backdrop-blur-xl border-b border-stone-200/60">
        <div className="flex items-center justify-between h-16 px-6 md:px-10 max-w-[1440px] mx-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="text-xs tracking-[0.15em] uppercase font-medium hidden sm:inline">Menu</span>
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-[15px] tracking-[0.35em] uppercase font-medium text-stone-900">
              Butik
            </h1>
          </Link>

          <nav className="flex items-center gap-5">
            <Link
              href="/wallet"
              className="text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Wallet"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M2 8h16" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="14.5" cy="12.5" r="1" fill="currentColor" />
              </svg>
            </Link>
            <Link
              href="/cart"
              className="text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7h10l-1 8H6L5 7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M8 7V5a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-warm-white animate-fade-in-slow">
          <div className="flex items-center justify-between h-16 px-6 md:px-10 max-w-[1440px] mx-auto">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span className="text-xs tracking-[0.15em] uppercase font-medium hidden sm:inline">Close</span>
            </button>
            <h1 className="absolute left-1/2 -translate-x-1/2 text-[15px] tracking-[0.35em] uppercase font-medium text-stone-900">
              Butik
            </h1>
            <div className="w-20" />
          </div>

          <nav className="flex flex-col items-start px-10 md:px-20 pt-16 gap-8">
            {[
              { label: "Boutiques", href: "/boutiques", delay: "delay-100" },
              { label: "Collections", href: "/collections", delay: "delay-200" },
              { label: "Wallet", href: "/wallet", delay: "delay-300" },
              { label: "About", href: "/about", delay: "delay-400" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-3xl md:text-4xl font-light text-stone-900 hover:text-stone-500 transition-colors animate-slide-up ${item.delay}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-10 left-10 md:left-20 text-xs tracking-widest text-stone-400 uppercase">
            Kigali, Rwanda
          </div>
        </div>
      )}
    </>
  );
}
