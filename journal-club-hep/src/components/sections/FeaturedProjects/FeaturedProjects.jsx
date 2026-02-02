"use client";

import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import styles from "./FeaturedProjects.module.css";
import Container from "@/components/layout/Container";
import { useInView } from "@/lib/useInView"; // ✅ ADD

export default function FeaturedProjects({ locale = "en" }) {
  const projects = useMemo(
    () => [
      {
        eyebrow: "CASE STUDY",
        title: "Matching cosmological constraints with TeV-scale inverse seesaw",
        summary:
          "Built a numerical pipeline to scan parameter space, solve Boltzmann equations, and reproduce baryon asymmetry while respecting neutrino data constraints.",
        meta: {
          domain: "Neutrinos • Early Universe",
          stack: ["Python", "NumPy", "SciPy", "Matplotlib"],
          proof: ["Reproducible scans", "Validation checks", "Constraint matching"],
        },
        case: {
          problem:
            "Need a robust exploration of parameter space with reliable numerical control — not a one-off plot.",
          approach: [
            "Adaptive scans + tuning routines for viable regions",
            "Boltzmann equation solver with sanity/consistency checks",
            "Automated plots and verification against target observables",
          ],
          validation: [
            "Tracks equilibrium behavior and washout regimes",
            "Cross-checks against experimental / phenomenological bounds",
            "Reproducible outputs (same inputs → same results)",
          ],
          deliverables: [
            "Reusable pipeline + configuration presets",
            "Plots (scan maps, trajectories, asymmetry results)",
            "Documentation + handover notes",
          ],
        },
        outcomes: [
          { label: "Parameter scan", value: "automated" },
          { label: "Reproducibility", value: "high" },
          { label: "Validation", value: "built-in" },
        ],
        images: [
          "/projects/Leptogenesis/plot1.png",
          "/projects/Leptogenesis/plot2.png",
          "/projects/Leptogenesis/plot3.png",
        ],
        ctaLabel: "View project details",
        ctaHref: `/${locale}/projects`,
      },
      {
        eyebrow: "CASE STUDY",
        title: "Leggett–Garg inequalities tested with neutrino oscillation data",
        summary:
          "Designed a statistical pipeline to evaluate Leggett–Garg signatures using experimental neutrino oscillation datasets and produce clean, publication-grade visuals.",
        meta: {
          domain: "Quantum Foundations • Oscillations",
          stack: ["Python", "Pandas", "NumPy", "Matplotlib"],
          proof: ["Data pipeline", "Statistical checks", "Clear reporting"],
        },
        case: {
          problem:
            "Experimental data is messy — the goal was to extract reliable LGI indicators and compare prediction vs data consistently.",
          approach: [
            "Custom processing pipeline for experimental datasets",
            "Computation of LGI metrics across L/E regimes",
            "Prediction-vs-data comparison with controlled binning/plots",
          ],
          validation: [
            "Consistency checks across bins and regimes",
            "Separation of prediction vs data visualization logic",
            "Repeatable figure generation for reporting",
          ],
          deliverables: [
            "Cleaned dataset products + scripts",
            "Figures and summary tables",
            "Readable report-ready outputs",
          ],
        },
        outcomes: [
          { label: "Data pipeline", value: "custom" },
          { label: "Figures", value: "publication-grade" },
          { label: "Reporting", value: "clear" },
        ],
        images: [
          "/projects/LGinuos/plot1.png",
          "/projects/LGinuos/plot2.png",
          "/projects/LGinuos/plot3.png",
          "/projects/LGinuos/plot4.png",
        ],
        ctaLabel: "View project details",
        ctaHref: `/${locale}/projects`,
      },
    ],
    [locale]
  );

  // ✅ ADD: reveal-on-scroll hook (same idea as your first sections)
  const { ref, inView } = useInView({ threshold: 0.12 });

  // --- OUTER (projects) slider ---
  const outerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  // --- INNER (images) slider state per project ---
  const [activeImage, setActiveImage] = useState(() => projects.map(() => 0));

  // Sync activeImage if projects change
  useEffect(() => {
    setActiveImage((prev) => projects.map((_, i) => prev[i] ?? 0));
  }, [projects.length]);

  // Update activeProject while scrolling outer
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onScroll = () => {
      const width = el.clientWidth;
      const idx = Math.round(el.scrollLeft / width);
      setActiveProject(Math.max(0, Math.min(projects.length - 1, idx)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [projects.length]);

  // ✅ FIX: prevent the outer slider from "capturing" vertical wheel scroll.
  // Vertical wheel scroll moves the PAGE. Horizontal gestures still work.
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (isHorizontalGesture) return;

      e.preventDefault();
      window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const outerScrollTo = useCallback((idx) => {
    const el = outerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollTo({ left: idx * width, behavior: "smooth" });
  }, []);

  const prevProject = () => {
    const nextIdx = (activeProject - 1 + projects.length) % projects.length;
    outerScrollTo(nextIdx);
  };

  const nextProject = () => {
    const nextIdx = (activeProject + 1) % projects.length;
    outerScrollTo(nextIdx);
  };

  // Keyboard: left/right to switch case studies
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject, projects.length]);

  // --- image controls ---
  const setImageIndex = (pIdx, imgIdx) => {
    setActiveImage((prev) => {
      const copy = [...prev];
      copy[pIdx] = imgIdx;
      return copy;
    });
  };

  const prevImage = (pIdx) => {
    const n = projects[pIdx].images.length;
    const nextIdx = (activeImage[pIdx] - 1 + n) % n;
    setImageIndex(pIdx, nextIdx);
  };

  const nextImage = (pIdx) => {
    const n = projects[pIdx].images.length;
    const nextIdx = (activeImage[pIdx] + 1) % n;
    setImageIndex(pIdx, nextIdx);
  };

  return (
    <section
      ref={ref}
      className={`${styles.section} ${styles.reveal} ${
        inView ? styles.revealIn : ""
      }`}
      aria-label="Case studies"
    >
      <div className={styles.band}>
        <Container>
          <div className={styles.header}>
            <div className={styles.kicker}>PROOF OF WORK</div>
            <h2 className={styles.title}>Validated case studies</h2>
            <p className={styles.subtitle}>
              Real problems, real constraints, reproducible results — presented
              as evidence, not a gallery.
            </p>
          </div>
        </Container>

        {/* Outer arrows */}
        <button
          className={styles.arrowLeft}
          onClick={prevProject}
          aria-label="Previous case study"
        >
          ←
        </button>

        <div className={styles.outer} ref={outerRef}>
          {projects.map((p, pIdx) => {
            const imgIdx = activeImage[pIdx];
            const imgs = p.images;
            const isActive = pIdx === activeProject;

            return (
              <div
                key={p.title}
                className={`${styles.slide} ${
                  isActive ? styles.slideActive : ""
                }`}
              >
                <Container>
                  <div className={styles.grid}>
                    {/* LEFT */}
                    <div className={styles.left}>
                      <div className={styles.eyebrow}>{p.eyebrow}</div>
                      <h3 className={styles.projectTitle}>{p.title}</h3>
                      <p className={styles.projectDesc}>{p.summary}</p>

                      {/* Meta row */}
                      <div className={styles.metaRow}>
                        <div className={styles.metaItem}>
                          <div className={styles.metaLabel}>Domain</div>
                          <div className={styles.metaValue}>{p.meta.domain}</div>
                        </div>

                        <div className={styles.metaItem}>
                          <div className={styles.metaLabel}>Stack</div>
                          <div className={styles.pills}>
                            {p.meta.stack.map((t) => (
                              <span key={t} className={styles.pill}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Outcome chips */}
                      <div
                        className={styles.outcomes}
                        aria-label="Key outcomes"
                      >
                        {p.outcomes.map((o) => (
                          <div key={o.label} className={styles.outcome}>
                            <span className={styles.outcomeLabel}>
                              {o.label}
                            </span>
                            <span className={styles.outcomeValue}>
                              {o.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* ONLY Problem + Approach on the left */}
                      <div className={styles.caseGridLeft}>
                        <div className={styles.caseCard}>
                          <div className={styles.caseTitle}>Problem</div>
                          <p className={styles.caseText}>{p.case.problem}</p>
                        </div>

                        <div className={styles.caseCard}>
                          <div className={styles.caseTitle}>Approach</div>
                          <ul className={styles.caseList}>
                            {p.case.approach.map((x) => (
                              <li key={x}>{x}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <a className={styles.cta} href={p.ctaHref}>
                        {p.ctaLabel} →
                      </a>
                    </div>

                    {/* RIGHT */}
                    <div className={styles.right}>
                      <div className={styles.evidenceTop}>
                        <div className={styles.evidenceTitle}>Evidence</div>
                        <div className={styles.evidenceHint}>
                          Use arrows to browse figures
                        </div>
                      </div>

                      <div className={styles.imageBox}>
                        <img
                          key={`${pIdx}-${imgIdx}`}
                          className={styles.image}
                          src={imgs[imgIdx]}
                          alt=""
                        />

                        {imgs.length > 1 && (
                          <>
                            <button
                              className={styles.imgArrowLeft}
                              onClick={() => prevImage(pIdx)}
                              aria-label="Previous figure"
                            >
                              ←
                            </button>
                            <button
                              className={styles.imgArrowRight}
                              onClick={() => nextImage(pIdx)}
                              aria-label="Next figure"
                            >
                              →
                            </button>

                            <div
                              className={styles.imgDots}
                              aria-label="Figure navigation"
                            >
                              {imgs.map((_, i) => (
                                <button
                                  key={i}
                                  className={`${styles.imgDot} ${
                                    i === imgIdx ? styles.imgDotActive : ""
                                  }`}
                                  onClick={() => setImageIndex(pIdx, i)}
                                  aria-label={`Go to figure ${i + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <div className={styles.proofRow}>
                        {p.meta.proof.map((x) => (
                          <div key={x} className={styles.proofChip}>
                            {x}
                          </div>
                        ))}
                      </div>

                      {/* Validation + Deliverables moved under the plot */}
                      <div className={styles.caseGridRight}>
                        <div className={styles.caseCard}>
                          <div className={styles.caseTitle}>Validation</div>
                          <ul className={styles.caseList}>
                            {p.case.validation.map((x) => (
                              <li key={x}>{x}</li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.caseCard}>
                          <div className={styles.caseTitle}>Deliverables</div>
                          <ul className={styles.caseList}>
                            {p.case.deliverables.map((x) => (
                              <li key={x}>{x}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            );
          })}
        </div>

        <button
          className={styles.arrowRight}
          onClick={nextProject}
          aria-label="Next case study"
        >
          →
        </button>

        {/* Outer dots */}
        <div className={styles.dots} aria-label="Case study navigation">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${
                i === activeProject ? styles.dotActive : ""
              }`}
              onClick={() => outerScrollTo(i)}
              aria-label={`Go to case study ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
