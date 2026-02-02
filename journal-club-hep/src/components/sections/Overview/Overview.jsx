"use client";

import { useMemo, useState } from "react";
import styles from "./Overview.module.css";
import Container from "@/components/layout/Container";
import { useInView } from "@/lib/useInView";

export default function Overview() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null);

  const pillars = useMemo(
    () => [
      {
        tag: "Rigor",
        title: "Research-grade rigor",
        short: "Transparent methods, validation checks, reproducible workflows.",

        // LEFT panel (conceptual)
        detailTitle: "Built like research",
        detail:
          "Clear assumptions, validation steps, and reproducible pipelines. You get results you can defend, rerun, and extend.",
        bullets: ["Validation checks", "Reproducible runs", "Transparent assumptions"],

        // DETAILS (expanded) — concrete deliverables
        moreDetail:
          "What you actually get: a reproducible package of results with validation evidence.",
        moreBullets: [
          "Assumptions + parameter ranges documented",
          "Benchmark/consistency checks included",
          "Reproducible scripts/configs (seeds when relevant)",
          "Versioned outputs + clear changelog",
        ],
      },
      {
        tag: "Custom",
        title: "Custom solutions",
        short: "Tailored models and pipelines — no templates.",

        // LEFT panel (conceptual)
        detailTitle: "Designed for your constraints",
        detail:
          "From parameter scans to simulation pipelines: the approach is adapted to your data, constraints, and success metrics.",
        bullets: ["Model selection", "Parameter scanning", "Fast iteration"],

        // DETAILS (expanded)
        moreDetail:
          "Custom means the approach is engineered around your constraints, not forced into a template.",
        moreBullets: [
          "Model/algorithm choice justified for your case",
          "Pipelines adapted to your data format + scale",
          "Parameter scans or simulations tailored to goals",
          "Iteration checkpoints with measurable progress",
        ],
      },
      {
        tag: "Delivery",
        title: "Clear delivery",
        short: "Clean documentation, actionable outputs, next steps.",

        // LEFT panel (conceptual)
        detailTitle: "Usable, documented deliverables",
        detail:
          "You receive clean code, clear visuals, and documentation. Not just results — a tool you can use and maintain.",
        bullets: ["Documentation", "Figures & dashboards", "Next-step guidance"],

        // DETAILS (expanded)
        moreDetail:
          "Delivery focuses on usable outputs: code, visuals, and documentation you can keep building on.",
        moreBullets: [
          "Clean codebase (structured + commented)",
          "Plots/tables ready for reports or papers",
          "Short usage guide + reproducibility notes",
          "Next-step recommendations + limitations",
        ],
      },
    ],
    []
  );

  const current = pillars[active];

  return (
    <section
      ref={ref}
      className={`${styles.section} ${styles.reveal} ${inView ? styles.in : ""}`}
      aria-label="Overview"
    >
      <Container>
        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.left}>
            <p className={styles.kicker}>WHAT IS THIS?</p>

            <h2 className={styles.title}>
              Scientific consulting for data, modeling, and research-grade software.
            </h2>

            <p className={styles.desc}>
              Zamor Data & Models helps researchers and teams turn complex data into validated models,
              reproducible pipelines, and clear results — from analysis to deployment-ready tooling.
            </p>

            <div className={styles.detail}>
              <div className={styles.detailTop}>
                <span className={styles.pill}>{current.tag}</span>
                <h3 className={styles.detailTitle}>{current.detailTitle}</h3>
              </div>

              <p className={styles.detailText}>{current.detail}</p>

              <ul className={styles.bullets}>
                {current.bullets.map((b) => (
                  <li key={b} className={styles.bullet}>
                    <span className={styles.check} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.right}>
            <div className={styles.progress} aria-hidden="true">
              <span
                className={styles.progressFill}
                style={{ transform: `translateX(${active * 100}%)` }}
              />
            </div>

            <div className={styles.cards} role="tablist" aria-label="Pillars">
              {pillars.map((p, i) => {
                const isActive = i === active;
                const isOpen = i === open;

                return (
                  <button
                    key={p.title}
                    type="button"
                    className={`${styles.card} ${isActive ? styles.active : ""} ${
                      isOpen ? styles.open : ""
                    } ${inView ? styles.cardIn : ""}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    role="tab"
                    aria-selected={isActive}
                    style={{ "--d": `${120 + i * 90}ms` }}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.icon} aria-hidden="true">
                        {i === 0 ? "◌" : i === 1 ? "◎" : "◍"}
                      </span>

                      <div className={styles.cardHead}>
                        <span className={styles.tag}>{p.tag}</span>
                        <h3 className={styles.cardTitle}>{p.title}</h3>
                      </div>
                    </div>

                    <p className={styles.cardText}>{p.short}</p>

                    <div className={styles.cardFoot}>
                      <span
                        className={styles.linkish}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpen((prev) => (prev === i ? null : i));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpen((prev) => (prev === i ? null : i));
                          }
                        }}
                      >
                        Details
                      </span>

                      <span className={styles.arrow} aria-hidden="true">
                        →
                      </span>
                    </div>

                    {/* EXTRA content ONLY when open */}
                    <div className={styles.more} aria-hidden={!isOpen}>
                      <p className={styles.moreText}>{p.moreDetail}</p>

                      <ul className={styles.moreList}>
                        {p.moreBullets.map((b) => (
                          <li key={b} className={styles.moreItem}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
