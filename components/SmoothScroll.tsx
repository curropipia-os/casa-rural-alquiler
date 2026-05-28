"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis + GSAP/ScrollTrigger.
 * Reemplaza el RAF de Lenis por el ticker de GSAP para mantener un solo loop
 * y sincronizar perfectamente las animaciones con el scroll inercial.
 *
 * Si el usuario tiene prefers-reduced-motion, no inicializamos Lenis y
 * delegamos en el scroll nativo del navegador.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      document.documentElement.classList.remove("lenis");
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    // Notifica a ScrollTrigger en cada tick de Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Acopla Lenis al ticker de GSAP
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Recalcula triggers después de que Lenis esté activo y el layout asentado
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return null;
}
