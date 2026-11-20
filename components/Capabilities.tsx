"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { capabilities } from "@/data/content";

export function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".cap-item", {
        y: 44,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cap-list",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".cap-lead > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cap-lead",
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section className="capabilities section" ref={root} aria-labelledby="capabilities-title">
      <div className="shell">
        <header className="cap-head">
          <h2 id="capabilities-title" className="h2">
            {capabilities.heading}
          </h2>
          <p>{capabilities.intro}</p>
        </header>

        <div className="cap-grid">
          <div className="cap-lead">
            <p className="cap-lead__line">
              The floor, the studio and the rooms around them. One booking covers the space
              and the kit inside it.
            </p>
            <div className="house-note">
              <h3>{capabilities.houseNote.title}</h3>
              <p>{capabilities.houseNote.body}</p>
            </div>
          </div>

          <ul className="cap-list">
            {capabilities.items.map((item) => (
              <li className="cap-item" key={item.title}>
                <h3 className="cap-item__title">{item.title}</h3>
                <p className="cap-item__note">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
