"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGsap } from "@/lib/useGsap";
import SectionHeading from "./SectionHeading";

const ITEMS = [
  {
    title: "Parejas",
    body:
      "Habitaciones con chimenea, cenas a media luz y la opción de no cruzarse con nadie en todo el día.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=70",
  },
  {
    title: "Familias",
    body:
      "Un mas grande para juntar a los que importan. Mesa larga, huerto que se puede pisar y silencio cuando los niños duermen.",
    image:
      "https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?auto=format&fit=crop&w=1600&q=70",
  },
  {
    title: "Retiros y equipos pequeños",
    body:
      "Una sala con vistas, wifi cuando hace falta y un programa que no aprieta. Ideal hasta 14 personas.",
    image:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1600&q=70",
  },
  {
    title: "Bodas íntimas",
    body:
      "Hasta 60 invitados, ceremonia en el patio de piedra y catering propio. Una sola celebración por fin de semana.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=70",
  },
  {
    title: "Estancias largas",
    body:
      "Para escribir, cocinar, descansar. Tarifas reducidas a partir de siete noches y un escritorio mirando al campo.",
    image:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=70",
  },
];

export default function AudienceAccordion() {
  const [open, setOpen] = useState(0);
  const ref = useGsap<HTMLElement>((ctx, root) => {
    const items = root.querySelectorAll<HTMLElement>("[data-acc-item]");
    gsap.from(items, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 80%", once: true },
    });
  });

  // Cambia la imagen activa
  useEffect(() => {
    const imgs = document.querySelectorAll<HTMLElement>("[data-acc-image]");
    imgs.forEach((el, i) => {
      gsap.to(el, {
        autoAlpha: i === open ? 1 : 0,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }, [open]);

  return (
    <section
      id="para-quien"
      ref={ref}
      className="border-b border-bone-400 py-24 md:py-32"
    >
      <div className="container flex flex-col gap-16">
        <SectionHeading
          eyebrow="Para quién"
          title="A quién pensamos cuando pensamos en ti"
        />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Imagen sticky */}
          <div className="relative md:sticky md:top-24 self-start aspect-[3/4] md:aspect-[3/4] rounded-md overflow-hidden bg-bone-300">
            {ITEMS.map((item, i) => (
              <div
                key={item.title}
                data-acc-image
                style={{ opacity: i === open ? 1 : 0 }}
                className="absolute inset-0 bg-cover bg-center"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Acordeón */}
          <div className="flex flex-col">
            {ITEMS.map((item, i) => {
              const isOpen = i === open;
              return (
                <div
                  key={item.title}
                  data-acc-item
                  className={`border-t border-bone-400 ${
                    i === ITEMS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between gap-6 py-6 text-left transition-colors ${
                      isOpen ? "text-ink" : "text-ink/45 hover:text-ink"
                    }`}
                  >
                    <span className="font-serif font-light text-2xl md:text-3xl">
                      {item.title}
                    </span>
                    <span
                      aria-hidden
                      className={`text-2xl transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[grid-template-rows] duration-500 grid"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <p className="pb-8 text-ink/80 font-light text-lg leading-relaxed max-w-[55ch]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
