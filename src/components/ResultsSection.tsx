"use client";

const results = [
  {
    id: 1,
    name: "Handwoven Agaseke Basket",
    boutique: "Inzozi Atelier",
    price: "RWF 45,000",
    color: "#d4c5b2",
  },
  {
    id: 2,
    name: "Single-Origin Bourbon Coffee",
    boutique: "Gorilla Coffee House",
    price: "RWF 18,000",
    color: "#8b7355",
  },
  {
    id: 3,
    name: "Imigongo Art Panel",
    boutique: "Urugo Gallery",
    price: "RWF 120,000",
    color: "#2c2c2c",
  },
  {
    id: 4,
    name: "Kitenge Wrap Dress",
    boutique: "Umuco Fashion",
    price: "RWF 65,000",
    color: "#8b6f5e",
  },
  {
    id: 5,
    name: "Banana Leaf Tote",
    boutique: "Keza Crafts",
    price: "RWF 32,000",
    color: "#7a6854",
  },
  {
    id: 6,
    name: "Ceramic Serving Set",
    boutique: "Ishimwe Design",
    price: "RWF 28,000",
    color: "#5c7a5c",
  },
];

interface ResultsSectionProps {
  query: string;
}

export default function ResultsSection({ query }: ResultsSectionProps) {
  return (
    <section className="bg-paper text-ink py-16 lg:py-24 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-[0.72rem] font-bold tracking-[0.16em] uppercase text-green-ink mb-1">
              Results for
            </p>
            <h2
              className="text-2xl lg:text-3xl font-medium text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{query}&rdquo;
            </h2>
          </div>
          <span className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-ink/40">
            {results.length} items
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {results.map((item, i) => (
            <article
              key={item.id}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="aspect-[4/5] mb-4 overflow-hidden relative"
                style={{ backgroundColor: item.color }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-[0.65rem] tracking-[0.3em] uppercase font-bold">
                    {item.boutique}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 13.5s-5.5-3.5-5.5-7A3 3 0 0 1 8 4a3 3 0 0 1 5.5 2.5c0 3.5-5.5 7-5.5 7z" stroke="#0d0d0d" strokeWidth="1.2" />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-ink group-hover:text-ink/60 transition-colors">{item.name}</h3>
              <p className="text-[0.72rem] text-ink/40 tracking-wide mt-0.5">{item.boutique}</p>
              <p className="text-sm text-ink/80 mt-1">{item.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
