import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { close, site } from "@/data/content";

export function Close() {
  return (
    <section className="close" aria-labelledby="close-title">
      <div className="shell">
        <h2 id="close-title" className="close__line">
          {close.line}
        </h2>
        <p className="close__body">{close.body}</p>

        <a
          className="close__cta"
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span className="close__ctaText">
            <span>{close.cta}</span>
            <span className="close__ctaNumber">{site.whatsappNumber}</span>
          </span>
        </a>

        <p className="close__address">
          {site.location}
          <br />
          {site.region}
        </p>

        <footer className="close__foot">
          <Image
            className="close__logo"
            src="/logo/sthalam-bone.svg"
            alt="Sthalam Studio Floors"
            width={820}
            height={470}
            unoptimized
          />
          <div className="close__meta">
            <p>{close.footerNote}</p>
            <p>© {new Date().getFullYear()} Sthalam Studio Floors</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
