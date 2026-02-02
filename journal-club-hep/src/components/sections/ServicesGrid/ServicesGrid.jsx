"use client";

import styles from "./ServicesGrid.module.css";
import Container from "@/components/layout/Container";
import { useInView } from "@/lib/useInView";

const SERVICES = [
  {
    title: "Data Analysis & Modeling",
    desc: "Rigorous analysis and computational models to understand data and complex systems.",
    tags: ["Python", "Statistics", "Modeling"],
    img: "/services/ser01.png",
  },
  {
    title: "Data Visualization & Communication",
    desc: "Clear, effective visualizations and summaries to communicate results and insights.",
    tags: ["Visualization", "Dashboards", "Reporting"],
    img: "/services/ser02.png",
  },
  {
    title: "Computational Tools & Automation",
    desc: "Custom scripts and tools to automate analysis and improve reproducibility.",
    tags: ["Python", "Automation", "Pipelines"],
    img: "/services/ser03.png",
  },
  {
    title: "Technical Web Interfaces",
    desc: "Web-based interfaces to present data, models, and technical content clearly.",
    tags: ["Web", "Interfaces", "Visualization"],
    img: "/services/ser04.png",
  },
  {
    title: "Technical Consulting & Scientific Support",
    desc: "Methodology review, validation, and guidance for complex technical projects.",
    tags: ["Consulting", "Review", "Strategy"],
    img: "/services/ser05.png",
  },
  {
    title: "Reporting & Documentation",
    desc: "Clear reports, assumptions, and handover notes so results remain usable and reusable.",
    tags: ["Documentation", "Reproducibility", "Handover"],
    img: "/services/ser06.png",
  },
];

export default function ServicesGrid({ locale = "en" }) {
  const { ref, inView } = useInView({ threshold: 0.12 });

  return (
    <section
      ref={ref}
      className={`${styles.section} ${styles.reveal} ${
        inView ? styles.revealIn : ""
      }`}
      aria-label="Services"
    >
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Services</h2>
          <p className={styles.subtitle}>
            Practical, research-grade work — from analysis to deployment.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className={styles.card}
              style={{ "--bg": `url(${s.img})` }}
            >
              {/* hover image layer */}
              <span className={styles.bg} aria-hidden="true" />

              {/* content */}
              <div className={styles.content}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <span className={styles.pill}>Service</span>
                </div>

                <p className={styles.cardDesc}>{s.desc}</p>

                <div className={styles.tags}>
                  {s.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>

                <a className={styles.link} href={`/${locale}/services`}>
                  See details →
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
