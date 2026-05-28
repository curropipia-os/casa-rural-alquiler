"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

type T = { quote: string; name: string; role: string };

const TESTIMONIALS: T[] = [
  {
    quote:
      "Llegamos cansados y nos fuimos pensando despacio. El silencio aquí no es vacío: es lleno de cosas pequeñas.",
    name: "Marta i Joan",
    role: "Huéspedes desde 2023",
  },
  {
    quote:
      "Una mesa que entiende lo que estás comiendo y por qué. La sobremesa duró dos horas y nadie miró el reloj.",
    name: "Pau Riera",
    role: "Sommelier, Barcelona",
  },
  {
    quote:
      "Reservamos para celebrar veinte años juntos. Nos encontramos con un sitio que no necesita celebrar nada para ser memorable.",
    name: "Carla y Lluís",
    role: "Aniversario, 2024",
  },
];

const DURATION = 8000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number>(Date.now());

  // Un único interval para toda la vida del componente.
  // `i` se actualiza con setI(prev => ...) y resetea startRef cuando hace falta.
  useEffect(() => {
    const id = window.setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(1, elapsed / DURATION);
      setProgress(p);
      if (p >= 1) {
        setI((prev) => (prev + 1) % TESTIMONIALS.length);
        startRef.current = Date.now();
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  const goTo = useCallback((next: number) => {
    setI((next + TESTIMONIALS.length) % TESTIMONIALS.length);
    setProgress(0);
    startRef.current = Date.now();
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section className="border-b border-bone-400 py-24 md:py-32">
      <div className="container flex flex-col gap-16">
        <SectionHeading eyebrow="En sus palabras" title="Lo que cuentan quienes vuelven" />

        <div className="flex flex-col gap-10">
          <span className="font-serif font-light text-[clamp(4rem,10vw,8rem)] leading-none text-ink select-none">
            “
          </span>

          <div className="grid gap-10 md:grid-cols-[3fr_1fr] md:gap-16 items-start">
            <blockquote className="font-serif font-light text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.35] text-ink max-w-[34ch]">
              {t.quote}
            </blockquote>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium">{t.name}</p>
              <p className="text-ink/70 font-light">{t.role}</p>
            </div>
          </div>

          {/* Progress + controls */}
          <div className="flex items-center justify-between gap-6 mt-6">
            <div
              className="h-px flex-1 bg-bone-500/60 overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              <div
                className="h-full bg-ink origin-left"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Anterior"
                onClick={() => goTo(i - 1)}
                className="w-10 h-10 grid place-items-center border border-ink/40 rounded-full hover:bg-ink hover:text-bone-200 transition-colors"
              >
                ←
              </button>
              <button
                aria-label="Siguiente"
                onClick={() => goTo(i + 1)}
                className="w-10 h-10 grid place-items-center border border-ink/40 rounded-full hover:bg-ink hover:text-bone-200 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
