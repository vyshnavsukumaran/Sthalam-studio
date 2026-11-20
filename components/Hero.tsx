"use client";

import { useEffect, useRef, useState } from "react";
import { Gobo } from "@/components/ui/Gobo";
import { gsap, useGSAP } from "@/lib/gsap";
import { hero } from "@/data/content";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      video.pause();
      return;
    }

    const attempt = video.play();
    if (attempt) {
      attempt.catch(() => setPlaying(false));
    }
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".hero__gobo", {
        opacity: 0,
        duration: 1.6,
        ease: "power2.out",
      });

      gsap.from(".hero__reveal", {
        y: 26,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(".hero__gobo", { scale: 1.32, opacity: 0.12 }, 0)
        .to(".hero__video", { scale: 1.08 }, 0)
        .to(".hero__copy", { y: -40, opacity: 0 }, 0)
        .to(".hero__controls, .hero__chrome", { opacity: 0 }, 0);
    },
    { scope: root },
  );

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      const attempt = video.play();
      if (attempt) {
        attempt.catch(() => setPlaying(false));
      }
    } else {
      video.pause();
    }
  };

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__media">
          <video
            ref={videoRef}
            className="hero__video"
            poster={hero.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={hero.videoMobile} media="(max-width: 720px)" type="video/mp4" />
            <source src={hero.videoDesktop} type="video/mp4" />
          </video>
          <div className="hero__gobo" aria-hidden="true">
            <Gobo />
          </div>
        </div>

        <div className="hero__chrome hero__reveal">
          <span>{hero.left}</span>
          <span>{hero.right}</span>
        </div>

        <div className="hero__copy">
          <h1 id="hero-title" className="hero__reveal">
            {hero.line}
          </h1>
          <p className="hero__reveal">{hero.intro}</p>
        </div>

        <div className="hero__controls hero__reveal">
          <button
            type="button"
            className="film-btn"
            onClick={togglePlayback}
            aria-label={playing ? "Pause the studio film" : "Play the studio film"}
          >
            {playing ? (
              <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                <rect x="2" y="1.5" width="2.6" height="9" rx="0.6" />
                <rect x="7.4" y="1.5" width="2.6" height="9" rx="0.6" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                <path d="M3 1.6 10.2 6 3 10.4Z" />
              </svg>
            )}
            <span>{playing ? "Pause film" : "Play film"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
