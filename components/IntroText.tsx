"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap, splitLines } from "@/lib/useGsap";

export default function IntroText() {
  const ref = useGsap<HTMLElement>((ctx, root) => {
    const target = root.querySelector<HTMLElement>("[data-split]");
    if (!target) return;

    const { lines } = splitLines(target);
    gsap.set(lines, { yPercent: 110 });

    ScrollTrigger.create({
      trigger: target,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });
  });

  return (
    <section
      ref={ref}
      className="border-b border-bone-400 py-24 md:py-32"
    >
      <div className="container">
        <p
          data-split
          className="font-sans font-light text-ink text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.45] max-w-[28ch] md:max-w-none"
        >
          En un Mediterráneo que aún recuerda cómo respirar, hay un mas de
          piedra del siglo XVIII que lleva tres siglos mirando los mismos
          viñedos. Lo restauramos sin maquillarlo. Aquí no hay programa,
          ni horario, ni música de fondo: solo lo que el día decida traer.
        </p>
      </div>
    </section>
  );
}
