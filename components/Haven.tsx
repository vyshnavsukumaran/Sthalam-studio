"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { haven } from "@/data/content";

export function Haven() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: { targets: section, className: "is-day" },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="haven" ref={root} aria-labelledby="haven-title">
      <div className="haven__inner shell">
        <header className="haven__top">
          <h2 id="haven-title">{haven.heading}</h2>
          <p className="haven__hours">{haven.hours}</p>
        </header>

        <div className="haven__cols">
          <p className="haven__body">{haven.body}</p>
          <p className="haven__second">{haven.second}</p>
        </div>

        <dl className="haven__facts">
          {haven.facts.map((fact) => (
            <div className="haven__fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
