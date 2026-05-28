"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Setup = (ctx: gsap.Context, root: HTMLElement) => void;

/**
 * Hook que crea un gsap.context con scope en el elemento devuelto.
 * Limpia tweens, ScrollTriggers y splits al desmontar el componente.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: Setup,
  deps: React.DependencyList = []
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const ctx = gsap.context((self) => setup(self, root), root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** Divide el texto en líneas/palabras envueltas con spans, sin librerías externas. */
export function splitLines(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  // Envolvemos cada palabra primero para que el navegador haga line break
  const words = text.split(/(\s+)/);
  const wordSpans: HTMLSpanElement[] = [];

  words.forEach((w) => {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
      return;
    }
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.willChange = "transform";
    span.textContent = w;
    el.appendChild(span);
    wordSpans.push(span);
  });

  // Agrupamos por línea según offsetTop
  const lines: HTMLSpanElement[][] = [];
  let currentTop: number | null = null;
  wordSpans.forEach((span) => {
    const top = span.offsetTop;
    if (currentTop === null || top !== currentTop) {
      lines.push([]);
      currentTop = top;
    }
    lines[lines.length - 1].push(span);
  });

  // Envolvemos cada línea con un wrapper overflow-hidden y un span interno
  const lineWrappers: HTMLSpanElement[] = [];
  const lineInners: HTMLSpanElement[] = [];

  lines.forEach((lineWords) => {
    if (!lineWords.length) return;
    const wrapper = document.createElement("span");
    wrapper.style.display = "block";
    wrapper.style.overflow = "hidden";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    lineWords.forEach((w, i) => {
      inner.appendChild(w);
      if (i < lineWords.length - 1) inner.appendChild(document.createTextNode(" "));
    });
    wrapper.appendChild(inner);
    lineWrappers.push(wrapper);
    lineInners.push(inner);
  });

  el.textContent = "";
  lineWrappers.forEach((l) => el.appendChild(l));
  return { lines: lineInners, wrappers: lineWrappers };
}
