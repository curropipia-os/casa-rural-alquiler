"use client";

import { gsap } from "gsap";
import { useGsap } from "@/lib/useGsap";
import SectionHeading from "./SectionHeading";

const SERVICES = [
  {
    n: "01",
    title: "Estancia",
    body: "Habitaciones de piedra, sábanas de lino, agua de manantial. Lo justo, bien hecho.",
    icon: (
      <svg viewBox="0 0 96 96" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M48 4 L92 48 L48 92 L4 48 Z" />
        <path d="M48 28 L72 52 L48 76 L24 52 Z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Mesa",
    body: "Producto de proximidad, fuego lento, una sola opción al día. La que tenga sentido.",
    icon: (
      <svg viewBox="0 0 96 96" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="48" cy="48" r="44" />
        <path d="M22 48 H 74" />
        <path d="M48 22 V 74" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Bosc",
    body: "Senderos al amanecer, baños de bosque, vinos de la finca. Sin guía, sin reloj.",
    icon: (
      <svg viewBox="0 0 96 96" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M48 6 L82 90 L14 90 Z" />
        <path d="M48 24 L70 80 L26 80 Z" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useGsap<HTMLElement>((ctx, root) => {
    const cards = root.querySelectorAll<HTMLElement>("[data-service]");
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: { trigger: root, start: "top 80%", once: true },
    });
  });

  return (
    <section
      id="servicios"
      ref={ref}
      className="border-b border-bone-400 py-24 md:py-32"
    >
      <div className="container flex flex-col gap-16">
        <SectionHeading eyebrow="Cómo te recibimos" title="Tres cuidados, todo el año" />

        <div className="grid gap-12 md:gap-16 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              data-service
              className="flex flex-col gap-8 bg-bone-100/0 rounded-md"
            >
              <div className="aspect-[16/9] rounded-md bg-bone-300 flex items-center justify-center text-ink">
                {s.icon}
              </div>
              <div className="flex flex-col gap-4 border-t border-bone-400 pt-6">
                <span className="font-serif font-light text-5xl text-ink/90 leading-none">
                  {s.n}
                </span>
                <h3 className="font-serif font-light text-3xl">{s.title}</h3>
                <p className="text-ink/80 text-lg font-light leading-relaxed">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
