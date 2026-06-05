"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) onSearch(query.trim());
    },
    [query, onSearch]
  );

  return (
    <section className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#050505]">
      {/* Left — Hero image */}
      <div className="relative min-h-[54vh] lg:min-h-screen overflow-hidden">
        <Image
          src="/hero.png"
          alt="Butik"
          fill
          priority
          className="object-cover brightness-[0.9] contrast-[1.05]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Right — Search panel */}
      <div
        className="relative min-h-[46vh] lg:min-h-screen flex items-center justify-center px-6 lg:px-16"
        style={{
          background:
            "radial-gradient(circle at 72% 22%, rgba(255,255,255,0.48), transparent 28%), linear-gradient(135deg, #F4F1E4 0%, #EEEBDD 48%, #E3DDC8 100%)",
        }}
      >
        <div className="w-full max-w-[560px] text-center flex flex-col items-center">
          <h1
            className="text-[clamp(2.5rem,4vw,3.4rem)] font-semibold tracking-[0.05em] uppercase text-ink leading-[1.1] mb-2.5 animate-fade-up"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Butik
          </h1>
          <p className="text-[1.05rem] italic text-green-ink tracking-[0.05em] mb-8 animate-fade-up delay-100">
            The Rebirth of Commerce in Africa
          </p>

          {/* AI Search bar */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[520px] rounded-[30px] overflow-hidden animate-fade-up delay-200"
            style={{
              border: "1px solid rgba(255,255,255,0.58)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.5), rgba(255,255,255,0.16)), rgba(238,235,221,0.48)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.78), inset 0 -18px 42px rgba(70,65,46,0.08), 0 24px 70px rgba(52,45,31,0.18)",
              backdropFilter: "blur(28px) saturate(1.35)",
            }}
          >
            <div className="h-[46px] px-4 flex items-center justify-between border-b border-ink/[0.08]">
              <span className="text-ink/60 text-[0.82rem] font-semibold tracking-[0.01em]">
                Butik intelligence
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink/60">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </div>

            <div className="min-h-[62px] grid grid-cols-[auto_1fr_auto] items-center gap-2.5 px-2.5 py-2 bg-ink/5">
              <button
                type="button"
                className="w-[38px] h-[38px] rounded-full inline-flex items-center justify-center text-ink/60 hover:text-ink hover:bg-white/40 transition-colors"
                aria-label="Add context"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>

              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about the rebirth of commerce"
                className="w-full bg-transparent text-ink text-[0.98rem] placeholder:text-ink/40 focus:outline-none"
                autoComplete="off"
              />

              <div className="inline-flex items-center gap-2">
                <span className="text-ink text-[0.82rem] font-bold tracking-[0.04em] hidden sm:inline">AI</span>
                <button
                  type="button"
                  className="w-[38px] h-[38px] rounded-full inline-flex items-center justify-center text-ink/60 hover:text-ink hover:bg-white/40 transition-colors hidden sm:inline-flex"
                  aria-label="Voice input"
                  tabIndex={-1}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 18.5a4.5 4.5 0 0 0 4.5-4.5V7a4.5 4.5 0 0 0-9 0v7a4.5 4.5 0 0 0 4.5 4.5Z" />
                    <path d="M5 12v2a7 7 0 0 0 14 0v-2M12 21v-2.5" />
                  </svg>
                </button>
                <button
                  type="submit"
                  className="w-[44px] h-[44px] rounded-full inline-flex items-center justify-center bg-ink/90 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_24px_rgba(13,13,13,0.18)] hover:bg-black hover:-translate-y-px transition-all"
                  aria-label="Search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 12h12M13 7l5 5-5 5" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
