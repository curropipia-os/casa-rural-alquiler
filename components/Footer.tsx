"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/lib/useGsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const ref = useGsap<HTMLElement>((ctx, root) => {
    // El logo enmascarado entra revelando el vídeo al hacer scroll
    const mask = root.querySelector<HTMLElement>(".footer-mask");
    if (!mask) return;
    gsap.from(mask, {
      yPercent: 25,
      opacity: 0.2,
      scale: 0.96,
      transformOrigin: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: mask,
        start: "top 90%",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  });

  return (
    <footer
      ref={ref}
      id="contacto"
      className="bg-ink text-bone-200 overflow-hidden"
    >
      <div className="container py-24 md:py-32 flex flex-col gap-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 flex flex-col gap-8 items-start">
            <p className="font-serif font-light text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight max-w-[28ch]">
              Cuéntanos qué fin de semana imaginas. Te respondemos a mano,
              normalmente el mismo día.
            </p>
            <a href="mailto:hola@masserre.com" className="btn-arrow is-light">
              <span>Reservar estancia</span>
              <svg viewBox="0 0 896 1024" width="12" className="arrow">
                <path
                  fill="currentColor"
                  d="M463.072 951.07l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942L120.226 545.999h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24H120.226L477.214 121.012c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0L27.03 495.03c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z"
                />
              </svg>
            </a>
            <p className="font-mono text-xs uppercase tracking-widest2 text-bone-300 mt-8">
              © {new Date().getFullYear()} Mas Serè · Casa rural · Alt Penedès
            </p>
          </div>

          <nav className="md:col-span-3">
            <ul className="flex flex-col gap-3 font-serif font-light text-2xl">
              <li><a href="#top">Inicio</a></li>
              <li><a href="#estancias">La casa</a></li>
              <li><a href="#servicios">Mesa</a></li>
              <li><a href="#para-quien">Experiencias</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="font-serif font-light text-2xl">Visítanos</h3>
            <p className="text-bone-300 leading-relaxed font-light">
              Camí del Mas, s/n
              <br />
              08737 Torrelles de Foix
              <br />
              Alt Penedès — Barcelona
            </p>
            <p className="text-bone-300 font-light">
              <a href="mailto:hola@masserre.com">hola@masserre.com</a>
              <br />
              <a href="tel:+34938000000">+34 938 00 00 00</a>
            </p>
          </div>
        </div>

        {/*
          Logo gigante "Mas Serè" enmascarado sobre vídeo.
          La forma del texto se define en globals.css con un data-URI SVG
          (mask-image), lo que evita el bug de fragment-id en Chromium.
        */}
        <div className="footer-mask relative">
          <video autoPlay loop muted playsInline preload="metadata">
            <source src="/media/footer-logo.mp4" type="video/mp4" />
            {/* Fallback si el vídeo no carga */}
          </video>
          <div className="footer-mask__fallback absolute inset-0 -z-10" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
