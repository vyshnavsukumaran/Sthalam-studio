"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { close, site } from "@/data/content";

export function BookLink() {
  const [pastHero, setPastHero] = useState(false);
  const [atCloseCta, setAtCloseCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.72);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const closeCta = document.querySelector(".close__cta");
    let observer: IntersectionObserver | undefined;

    if (closeCta) {
      observer = new IntersectionObserver(
        ([entry]) => setAtCloseCta(entry.isIntersecting),
        { threshold: 0.4 },
      );
      observer.observe(closeCta);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !atCloseCta;

  return (
    <a
      className={`book-link${visible ? " is-visible" : ""}`}
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${close.cta}. ${site.whatsappNumber}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <WhatsAppIcon />
      <span className="book-link__long">{close.cta}</span>
      <span className="book-link__short">Book</span>
    </a>
  );
}
