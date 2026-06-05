"use client";

import { useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResultsSection from "@/components/ResultsSection";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection onSearch={handleSearch} />
        {searchQuery && (
          <div ref={resultsRef}>
            <ResultsSection query={searchQuery} />
          </div>
        )}
      </main>
    </>
  );
}
