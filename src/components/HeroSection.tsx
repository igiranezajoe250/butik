"use client";

import { useState, useEffect } from "react";

const suggestions = [
  "Find handcrafted leather goods from Kigali",
  "Show me Rwandan coffee gift sets",
  "I need a dress for a wedding next month",
  "What's new from Inzozi Boutique?",
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-warm-white">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-warm-white to-warm-bg" />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="mb-12 md:mb-16 text-center animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">
            The future of commerce
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] text-stone-900 mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What are you<br />looking for?
          </h2>
          <p className="text-stone-500 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Tell us what you need. We connect you with Rwanda&apos;s finest
            boutiques and artisans.
          </p>
        </div>

        <div
          className={`w-full animate-fade-in delay-300 transition-all duration-300 ${
            isFocused ? "scale-[1.02]" : ""
          }`}
        >
          <div
            className={`flex items-center gap-3 bg-stone-100/80 backdrop-blur-sm rounded-full px-5 py-3.5 border transition-all duration-300 ${
              isFocused
                ? "border-stone-400 shadow-lg shadow-stone-200/50 bg-white"
                : "border-stone-200/80 hover:border-stone-300"
            }`}
          >
            <button
              className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center hover:bg-stone-700 transition-colors"
              aria-label="Attach"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3v8M3 7h8" stroke="#f8f7f5" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={suggestions[placeholderIndex]}
              className="flex-1 bg-transparent text-stone-900 text-[15px] placeholder:text-stone-400 focus:outline-none"
            />

            <button
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                query.length > 0
                  ? "bg-stone-900 hover:bg-stone-700"
                  : "bg-stone-300"
              }`}
              aria-label="Send"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M4 5l3-3 3 3" stroke="#f8f7f5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-5 animate-fade-in delay-500">
            {["Trending", "New Arrivals", "Gifts"].map((tag) => (
              <button
                key={tag}
                className="text-xs tracking-[0.1em] uppercase text-stone-400 hover:text-stone-700 transition-colors px-3 py-1.5 rounded-full border border-stone-200 hover:border-stone-400"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-stone-300">Scroll</span>
          <div className="w-px h-8 bg-stone-300" />
        </div>
      </div>
    </section>
  );
}
