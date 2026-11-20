"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { rooms } from "@/data/content";

export function Rooms() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="rooms" ref={root} aria-labelledby="rooms-title">
      <div className="rooms__pin">
        <header className="rooms__head">
          <h2 id="rooms-title">{rooms.heading}</h2>
          <p>{rooms.intro}</p>
        </header>

        <div className="rooms__viewport">
          <div className="rooms__track" ref={trackRef}>
            {rooms.items.map((room) => (
              <article className="room" key={room.key}>
                <div className="room__media">
                  <Image
                    src={room.image}
                    alt={room.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 58vw"
                  />
                </div>
                <div className="room__scrim" aria-hidden="true" />
                <div className="room__meta">
                  <h3>{room.title}</h3>
                  <p>{room.line}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
