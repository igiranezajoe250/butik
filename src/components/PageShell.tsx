"use client";

import Link from "next/link";

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function PageShell({ children, title, subtitle }: PageShellProps) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-paper/80 backdrop-blur-xl border-b border-ink/[0.06]">
        <div className="flex items-center justify-between h-14 sm:h-16 px-5 sm:px-8 lg:px-16 max-w-[1440px] mx-auto">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40 group-hover:text-ink transition-colors">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-[0.82rem] sm:text-[0.9rem] font-bold tracking-[0.15em] uppercase text-ink" style={{ fontFamily: "var(--font-display)" }}>
              Butik
            </span>
          </Link>
          <div className="text-right">
            <h1 className="text-[0.72rem] sm:text-[0.78rem] font-bold tracking-[0.14em] uppercase text-ink/80">{title}</h1>
            {subtitle && <p className="text-[0.6rem] text-ink/40 tracking-wide mt-0.5 hidden sm:block">{subtitle}</p>}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-14 sm:pt-16">
        {children}
      </main>
    </div>
  );
}
