"use client";

import { useMemo, useState } from "react";
import styles from "./ProcessSteps.module.css";
import Container from "@/components/layout/Container";
import { useInView } from "@/lib/useInView";

export default function ProcessSteps() {
  const { ref, inView } = useInView();

  const steps = useMemo(
    () => [
      {
        n: "01",
        title: "Discover",
        lead: "We define the problem, constraints, and what “success” means.",
        details:
          "Alignment on goals, available data, assumptions, and decision criteria — so we reduce rework and move fast with confidence.",
        outputs: ["Problem brief", "Data inventory", "Success metrics", "Scope & risks"],
      },
      {
        n: "02",
        title: "Plan",
        lead: "We design the approach and choose methods that fit your constraints.",
        details:
          "You get a concrete plan: methods, timelines, evaluation metrics, and deliverables — with risks and trade-offs made explicit.",
        outputs: ["Method outline", "Milestones", "Validation plan", "Deliverables list"],
      },
      {
        n: "03",
        title: "Deliver",
        lead: "We implement, validate, and deliver results you can reuse and extend.",
        details:
          "Clean code, clear visuals, and documented decisions — shipped with reproducibility and handover in mind.",
        outputs: ["Code + docs", "Figures / dashboards", "Validation notes", "Next-step roadmap"],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);

  const preview = (i) => {
    if (!locked) setActive(i);
  };

  const select = (i) => {
    setActive(i);
    setLocked(true);
  };

  const reset = () => setLocked(false);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${styles.reveal} ${inView ? styles.in : ""}`}
      aria-label="Process"
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <Container>
        <div className={styles.head}>
          <div>
            <h2 className={styles.h2}>Process</h2>
            <p className={styles.sub}>Choose a step — preview on hover, click to lock.</p>
          </div>

          <div className={styles.actions}>
            <span className={styles.hint}>
              {locked ? "Locked • Reset to preview" : "Hover to preview • Click to lock"}
            </span>
            <button
              type="button"
              className={styles.reset}
              onClick={reset}
              aria-disabled={!locked}
              disabled={!locked}
            >
              Reset
            </button>
          </div>
        </div>

        <div
          className={styles.shell}
          style={{
            "--active": active,
          }}
        >
          {/* timeline */}
          <div className={styles.timeline} aria-hidden="true">
            <span className={styles.track} />
            <span className={styles.fill} />
            <span className={styles.dot} />
          </div>

          {/* TOP OPTIONS (mini cards) */}
          <div className={styles.options} role="tablist" aria-label="Process options">
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  className={`${styles.opt} ${isActive ? styles.optActive : ""}`}
                  onMouseEnter={() => preview(i)}
                  onFocus={() => preview(i)}
                  onClick={() => select(i)}
                  role="tab"
                  aria-selected={isActive}
                >
                  <div className={styles.optTop}>
                    <span className={styles.optNum}>{s.n}</span>
                    <span className={styles.optDot} aria-hidden="true" />
                  </div>

                  <div className={styles.optMain}>
                    <p className={styles.optTitle}>{s.title}</p>
                    <p className={styles.optLead}>{s.lead}</p>
                  </div>

                  <div className={styles.optFoot}>
                    <span className={styles.optMicro}>
                      {locked && isActive ? "Selected" : "Click to lock"}
                    </span>
                    <span className={styles.optArrow} aria-hidden="true">
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* STAGE (stack + blur behind) */}
          <div className={styles.stage} role="group" aria-label="Selected step details">
            {steps.map((s, i) => {
              const isActive = i === active;
              const delta = i - active; // -1,0,1
              const dist = Math.abs(delta);

              return (
                <button
                  key={s.title}
                  type="button"
                  className={`${styles.stageCard} ${
                    isActive ? styles.stageActive : styles.stageBehind
                  }`}
                  onMouseEnter={() => preview(i)}
                  onFocus={() => preview(i)}
                  onClick={() => select(i)}
                  style={{ "--delta": delta, "--dist": dist }}
                >
                  <div className={styles.stageTop}>
                    <span className={styles.stageNum}>{s.n}</span>
                    <span className={styles.stagePill}>
                      {locked && isActive ? "LOCKED" : "PREVIEW"}
                    </span>
                  </div>

                  <h3 className={styles.stageTitle}>{s.title}</h3>
                  <p className={styles.stageLead}>{s.lead}</p>
                  <p className={styles.stageText}>{s.details}</p>

                  <div className={styles.outBox}>
                    <p className={styles.outHead}>Outputs</p>
                    <ul className={styles.outList}>
                      {s.outputs.map((x) => (
                        <li key={x} className={styles.outItem}>
                          <span className={styles.tick} aria-hidden="true" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
