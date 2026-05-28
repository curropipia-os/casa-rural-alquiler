"use client";

import { gsap } from "gsap";
import { useGsap } from "@/lib/useGsap";

export default function Hero() {
  const ref = useGsap<HTMLElement>((ctx, root) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.9 },
      delay: 0.25,
    });
    tl.from(root.querySelectorAll("[data-hero-eyebrow]"), { y: 24, opacity: 0 })
      .from(
        root.querySelectorAll("[data-hero-line]"),
        { y: 60, opacity: 0, stagger: 0.12 },
        "-=0.5"
      )
      .from(
        root.querySelector("[data-hero-cta]"),
        { y: 16, opacity: 0, duration: 0.6 },
        "-=0.4"
      );
  });

  return (
    <section
      ref={ref}
      className="relative h-svh min-h-[600px] w-full overflow-hidden flex flex-col justify-end"
    >
      {/* Vídeo de fondo (pon tu propio mp4 en /public/media/hero.mp4) */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/hero-poster.jpg"
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden="true"
      />

      <div className="container relative z-10 pb-16 md:pb-20 text-white">
        <div data-hero-eyebrow className="flex items-center gap-3 mb-6">
          <span className="font-eyebrow text-white/80">Vivir despacio</span>
          <span className="eyebrow-line" />
        </div>

        <h1 className="font-serif font-light leading-[1.02] text-[clamp(2.25rem,7vw,5rem)] max-w-[18ch]">
          <span data-hero-line className="block">La casa rural donde</span>
          <span data-hero-line className="block">el tiempo deja</span>
          <span data-hero-line className="block italic">de tener prisa.</span>
        </h1>

        <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#contacto" className="btn-arrow is-light">
            <span>Reservar estancia</span>
            <svg viewBox="0 0 896 1024" width="12" className="arrow">
              <path
                fill="currentColor"
                d="M463.072 951.07l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942L120.226 545.999h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24H120.226L477.214 121.012c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0L27.03 495.03c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z"
              />
            </svg>
          </a>
          <span className="font-mono text-xs text-white/70 uppercase tracking-widest2">
            A 1 h de Barcelona · Alt Penedès
          </span>
        </div>
      </div>
    </section>
  );
}
