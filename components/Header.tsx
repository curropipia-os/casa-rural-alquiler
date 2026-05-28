"use client";

import { useEffect, useState } from "react";
import Arrow from "./Arrow";

const NAV = [
  { label: "Inicio", href: "#top" },
  { label: "La casa", href: "#estancias" },
  { label: "Mesa", href: "#servicios" },
  { label: "Experiencias", href: "#para-quien" },
  { label: "Diario", href: "#" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      id="top"
      className="absolute top-0 inset-x-0 z-30 min-h-[88px] flex items-center"
    >
      <div className="container w-full flex items-center justify-between gap-6">
        <a
          href="#top"
          className="font-serif text-white text-xl tracking-wide leading-none"
          aria-label="Mas Serè — inicio"
        >
          Mas Serè
        </a>

        <nav className="hidden md:flex items-center gap-8 text-white font-mono text-[0.8125rem] uppercase tracking-widest2">
          {NAV.slice(1, -1).map((item) => (
            <a key={item.label} href={item.href} className="hover:opacity-70 transition-opacity">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contacto" className="btn-arrow is-light hidden sm:inline-flex">
            <span>Reservar</span>
            <Arrow />
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden relative w-8 h-8 text-white"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ${
                open ? "top-1/2 rotate-45" : "top-[10px]"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ${
                open ? "top-1/2 -rotate-45" : "top-[22px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 bg-ink text-white z-40 md:hidden transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="container h-full flex flex-col justify-between py-6">
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl">Mas Serè</span>
            <button
              onClick={() => setOpen(false)}
              className="font-mono text-[0.8125rem] uppercase tracking-widest2"
            >
              Cerrar
            </button>
          </div>

          <ul className="flex flex-col gap-6 font-serif text-4xl">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-1"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="space-y-2">
            <p className="font-serif text-2xl">Visítanos</p>
            <p className="text-bone-300 text-sm leading-relaxed">
              Camí del Mas, s/n
              <br />
              08737 Torrelles de Foix
              <br />
              Alt Penedès, Barcelona
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
