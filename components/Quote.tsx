"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { quote } from "@/data/content";

export function Quote() {
  const root = useRef<HTMLElement>(null);
  const words = quote.text.split(" ");

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".quote__word", {
        yPercent: 115,
        opacity: 0,
        duration: 0.9,
        stagger: 0.045,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".quote__by", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        delay: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section className="quote" ref={root} aria-label="A note on making">
      <div className="quote__inner">
        <blockquote className="quote__quote">
          <p className="quote__text">
            <span className="sr-only">{quote.text}</span>
            <span aria-hidden="true">
              {words.map((word, index) => (
                <span className="quote__word" key={`${word}-${index}`}>
                  {word}
                </span>
              ))}
            </span>
          </p>
          <footer className="quote__by">
            <span className="quote__rule" aria-hidden="true" />
            <cite>{quote.author}</cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
