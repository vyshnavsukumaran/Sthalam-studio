"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { rules } from "@/data/content";

export function Rules() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".rule", {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".rules__list",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section className="rules section" ref={root} aria-labelledby="rules-title">
      <div className="shell">
        <header className="rules__head">
          <h2 id="rules-title" className="h2">
            {rules.heading}
          </h2>
          <p>{rules.intro}</p>
        </header>

        <ul className="rules__list">
          {rules.items.map((rule) => (
            <li className="rule" key={rule.title}>
              <h3>{rule.title}</h3>
              <p>{rule.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
