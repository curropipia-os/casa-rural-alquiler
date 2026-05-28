"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/lib/useGsap";

type Props = {
  eyebrow: string;
  title: string;
  cta?: { label: string; href: string };
  className?: string;
};

export default function SectionHeading({ eyebrow, title, cta, className }: Props) {
  const ref = useGsap<HTMLDivElement>((ctx, root) => {
    const els = root.querySelectorAll("[data-anim]");
    gsap.from(els, {
      y: 28,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        once: true,
      },
    });
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-10 ${cta ? "md:flex-row md:items-end md:justify-between" : ""} ${className ?? ""}`}
    >
      <div className="flex flex-col gap-3">
        <div data-anim className="flex items-center gap-3 text-ink/60">
          <span className="font-eyebrow">{eyebrow}</span>
          <span className="eyebrow-line" />
        </div>
        <h2
          data-anim
          className="font-serif font-light leading-[1] text-[clamp(2rem,5vw,4rem)] max-w-[16ch]"
        >
          {title}
        </h2>
      </div>
      {cta && (
        <a data-anim href={cta.href} className="btn-arrow self-start md:self-end">
          <span>{cta.label}</span>
          <svg viewBox="0 0 896 1024" width="12" className="arrow">
            <path
              fill="currentColor"
              d="M463.072 951.07l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942L120.226 545.999h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24H120.226L477.214 121.012c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0L27.03 495.03c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
