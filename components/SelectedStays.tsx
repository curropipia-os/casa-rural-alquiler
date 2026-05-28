"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/lib/useGsap";
import SectionHeading from "./SectionHeading";

const STAYS = [
  {
    slug: "suite-vinya",
    title: "Suite Vinya",
    subtitle: "Vistas a viñedos, baño en piedra, chimenea",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2000&q=70",
  },
  {
    slug: "cabana-del-bosc",
    title: "Cabaña del Bosc",
    subtitle: "Entre encinas, bañera exterior, lectura",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=70",
  },
  {
    slug: "loft-de-la-era",
    title: "Loft de l’Era",
    subtitle: "El antiguo granero, cocina abierta, luz del sur",
    image:
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=2000&q=70",
  },
  {
    slug: "habitacio-mirador",
    title: "Habitació Mirador",
    subtitle: "Para dos, balcón al Montseny, silencio",
    image:
      "https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=2000&q=70",
  },
];

export default function SelectedStays() {
  const ref = useGsap<HTMLElement>((ctx, root) => {
    const cards = root.querySelectorAll<HTMLElement>("[data-stay]");

    cards.forEach((card) => {
      const img = card.querySelector<HTMLElement>("[data-stay-img]");
      const inner = card.querySelector<HTMLElement>("[data-stay-inner]");

      // 1) Entrada: la caja entera aparece con un clip-path tipo "cortina"
      //    y un pequeño desplazamiento. Solo una vez.
      if (inner) {
        gsap.fromTo(
          inner,
          {
            clipPath: "inset(20% 10% 20% 10% round 4px)",
            yPercent: 12,
            opacity: 0.6,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 4px)",
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      }

      // 2) Parallax continuo: la foto interior se mueve más despacio que la caja
      //    y desescala progresivamente, dando profundidad cinematográfica.
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -18, scale: 1.18 },
          {
            yPercent: 12,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });
  });

  return (
    <section
      id="estancias"
      ref={ref}
      className="border-b border-bone-400 py-24 md:py-32"
    >
      <div className="container flex flex-col gap-16">
        <SectionHeading
          eyebrow="Estancias"
          title="Cuatro maneras de quedarse"
          cta={{ label: "Ver todas", href: "#" }}
        />

        <ul className="flex flex-col gap-6 md:gap-8">
          {STAYS.map((stay) => (
            <li
              key={stay.slug}
              data-stay
              className="relative rounded-md min-h-[460px] md:min-h-[600px] flex items-end justify-center text-center text-white"
            >
              {/* Wrapper que se reveal con clip-path al entrar en viewport */}
              <div
                data-stay-inner
                className="absolute inset-0 overflow-hidden rounded-md will-change-transform"
                aria-hidden="true"
              >
                {/* Foto sobre-dimensionada para que el parallax + zoom
                    nunca deje ver el borde del contenedor */}
                <div
                  data-stay-img
                  className="absolute inset-[-25%] bg-cover bg-center will-change-transform"
                  style={{ backgroundImage: `url(${stay.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              <div className="relative z-10 px-6 pb-12 md:pb-16 flex flex-col items-center gap-4">
                <h3 className="font-serif font-light text-3xl md:text-4xl">
                  {stay.title}
                </h3>
                <p className="font-mono uppercase text-[0.75rem] tracking-widest2 text-white/85">
                  {stay.subtitle}
                </p>
                <a
                  href={`#${stay.slug}`}
                  className="btn-arrow is-light mt-2"
                >
                  <span>Ver estancia</span>
                  <svg viewBox="0 0 896 1024" width="12" className="arrow">
                    <path
                      fill="currentColor"
                      d="M463.072 951.07l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942L120.226 545.999h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24H120.226L477.214 121.012c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0L27.03 495.03c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z"
                    />
                  </svg>
                </a>
              </div>

              <a
                href={`#${stay.slug}`}
                aria-label={stay.title}
                className="absolute inset-0 z-20"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
