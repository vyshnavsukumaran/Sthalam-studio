"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { kit } from "@/data/content";

export function Kit() {
  const [active, setActive] = useState(kit.tabs[0].key);
  const reduced = useReducedMotion();
  const current = kit.tabs.find((tab) => tab.key === active) ?? kit.tabs[0];

  const moveTab = (direction: 1 | -1) => {
    const index = kit.tabs.findIndex((tab) => tab.key === active);
    const next = (index + direction + kit.tabs.length) % kit.tabs.length;
    const key = kit.tabs[next].key;
    setActive(key);
    document.getElementById(`kit-tab-${key}`)?.focus();
  };

  return (
    <section className="kit section" aria-labelledby="kit-title">
      <div className="shell kit__grid">
        <div className="kit__aside">
          <h2 id="kit-title" className="h2">
            {kit.heading}
          </h2>
          <p className="kit__intro">{kit.intro}</p>
        </div>

        <div className="kit__body">
          <div
            className="kit__tabs"
            role="tablist"
            aria-label="Equipment by room"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveTab(1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveTab(-1);
              }
            }}
          >
            {kit.tabs.map((tab) => {
              const selected = tab.key === active;
              return (
                <button
                  type="button"
                  role="tab"
                  id={`kit-tab-${tab.key}`}
                  aria-selected={selected}
                  aria-controls={`kit-panel-${tab.key}`}
                  tabIndex={selected ? 0 : -1}
                  className="kit__tab"
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                >
                  {tab.label}
                  {selected ? <span className="kit__underline" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.key}
              id={`kit-panel-${current.key}`}
              role="tabpanel"
              aria-labelledby={`kit-tab-${current.key}`}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduced ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="kit__list">
                {current.items.map((item) => (
                  <li className="kit__row" key={item.name}>
                    <span className="kit__name">{item.name}</span>
                    <span className="kit__qty">
                      <span className="sr-only">Quantity </span>
                      {item.qty}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="kit__note">{current.note}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
