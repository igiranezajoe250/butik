const boutiques = [
  {
    name: "Inzozi Atelier",
    location: "Kigali, Kimihurura",
    specialty: "Handcrafted leather & woven goods",
    color: "#c4a882",
  },
  {
    name: "Gorilla Coffee House",
    location: "Kigali, Kiyovu",
    specialty: "Single-origin Rwandan coffee",
    color: "#6b5b4a",
  },
  {
    name: "Urugo Gallery",
    location: "Kigali, Nyamirambo",
    specialty: "Contemporary African art",
    color: "#3a3a3a",
  },
  {
    name: "Umuco Fashion",
    location: "Kigali, Remera",
    specialty: "Modern Rwandan ready-to-wear",
    color: "#8b6f5e",
  },
];

export default function BoutiquesSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-warm-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-xl mb-14 md:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">
            Boutiques
          </p>
          <h3
            className="text-3xl md:text-4xl font-light text-stone-900 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Meet the makers
          </h3>
          <p className="text-stone-500 text-base leading-relaxed">
            Every boutique on Butik is a real business with real people.
            Start a conversation and shop directly with the artisans who
            craft what you love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {boutiques.map((b) => (
            <article
              key={b.name}
              className="group flex items-center gap-6 p-6 md:p-8 rounded-sm border border-stone-200 hover:border-stone-400 bg-warm-white hover:bg-stone-50 transition-all cursor-pointer"
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: b.color }}
              >
                <span className="text-white text-sm font-medium">
                  {b.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-stone-900 mb-1 group-hover:text-stone-600 transition-colors">
                  {b.name}
                </h4>
                <p className="text-xs text-stone-400 mb-1">{b.location}</p>
                <p className="text-xs text-stone-500">{b.specialty}</p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-stone-300 group-hover:text-stone-600 transition-colors flex-shrink-0"
              >
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
