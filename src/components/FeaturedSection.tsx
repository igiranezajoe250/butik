const featured = [
  {
    id: 1,
    name: "Handwoven Agaseke Basket",
    boutique: "Inzozi Atelier",
    price: "RWF 45,000",
    image: "/products/basket.jpg",
    color: "#d4c5b2",
  },
  {
    id: 2,
    name: "Single-Origin Bourbon Coffee",
    boutique: "Gorilla Coffee House",
    price: "RWF 18,000",
    image: "/products/coffee.jpg",
    color: "#8b7355",
  },
  {
    id: 3,
    name: "Imigongo Art Panel",
    boutique: "Urugo Gallery",
    price: "RWF 120,000",
    image: "/products/art.jpg",
    color: "#2c2c2c",
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-warm-bg">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-14 md:mb-20">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">
              Curated
            </p>
            <h3
              className="text-3xl md:text-4xl font-light text-stone-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured
            </h3>
          </div>
          <button className="text-xs tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 transition-colors border-b border-stone-300 hover:border-stone-900 pb-0.5">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div
                className="aspect-[4/5] rounded-sm mb-5 overflow-hidden relative"
                style={{ backgroundColor: item.color }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-xs tracking-[0.3em] uppercase">
                    {item.boutique}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 13.5s-5.5-3.5-5.5-7A3 3 0 0 1 8 4a3 3 0 0 1 5.5 2.5c0 3.5-5.5 7-5.5 7z"
                        stroke="#1c1917"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-stone-400 tracking-wide">
                  {item.boutique}
                </p>
                <p className="text-sm text-stone-700">{item.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
