"use client";

import SectionHeading from "./SectionHeading";

const LOGOS = [
  "Condé Nast Traveler",
  "El País Viajero",
  "Monocle",
  "Kinfolk",
  "Tapas",
  "AD España",
  "National Geographic",
  "Time Out",
  "Vogue Living",
  "Forbes Travel",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="marquee__track" aria-hidden={ariaHidden}>
      {LOGOS.map((name) => (
        <div
          key={name + (ariaHidden ? "-d" : "")}
          className="flex items-center justify-center h-[124px] min-w-[180px] px-6 rounded-md bg-bone-200/70 backdrop-blur-[1px]"
        >
          <span className="font-serif italic font-light text-2xl text-ink/85 whitespace-nowrap">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function LogosMarquee() {
  return (
    <section className="border-b border-bone-400 py-24 md:py-32">
      <div className="container flex flex-col gap-16">
        <SectionHeading eyebrow="Han hablado de nosotros" title="Prensa y cómplices" />
        <div className="marquee">
          <Track />
          <Track ariaHidden />
        </div>
      </div>
    </section>
  );
}
