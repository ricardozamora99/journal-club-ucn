import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero({ locale = "en" }) {
  return (
    <section className={styles.hero}>
      {/* Background: gradients + bubbles */}
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.bubble} style={{ "--s": "26px", "--x": "10%", "--y": "22%", "--d": "0s" }} />
        <span className={styles.bubble} style={{ "--s": "18px", "--x": "18%", "--y": "62%", "--d": "-2s" }} />
        <span className={styles.bubble} style={{ "--s": "34px", "--x": "28%", "--y": "40%", "--d": "-5s" }} />
        <span className={styles.bubble} style={{ "--s": "22px", "--x": "44%", "--y": "18%", "--d": "-8s" }} />
        <span className={styles.bubble} style={{ "--s": "16px", "--x": "58%", "--y": "68%", "--d": "-3s" }} />
        <span className={styles.bubble} style={{ "--s": "28px", "--x": "70%", "--y": "30%", "--d": "-6s" }} />
        <span className={styles.bubble} style={{ "--s": "20px", "--x": "84%", "--y": "58%", "--d": "-9s" }} />
        <span className={styles.bubble} style={{ "--s": "40px", "--x": "92%", "--y": "26%", "--d": "-12s" }} />
      </div>

      <div className={styles.grid}>
        {/* LEFT */}
        <div className={styles.card}>
          <p className={styles.kicker}>Scientific consulting</p>

          <div className={styles.titleWrap}>
            <h1 className={styles.title}>
              Advanced data<br />
              analysis &amp; modeling solutions
            </h1>
            <span className={styles.accent} aria-hidden="true" />
          </div>

          <p className={styles.subtitle}>
            Expert data analysis, custom modeling, and technical solutions that enable
            data-driven decisions — from research-grade pipelines to clean interactive tools.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href={`/${locale}/contact`}>
              Get a Quote <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
            <a className={styles.secondary} href={`/${locale}/projects`}>
              View Projects
            </a>
          </div>

          <div className={styles.meta}>
            <span>Physics</span><span className={styles.dot}>•</span>
            <span>Data</span><span className={styles.dot}>•</span>
            <span>Code</span><span className={styles.dot}>•</span>
            <span>Reproducible results</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {/* Optional: keep your clean glass plate OR remove it */}
          <span className={styles.orbit} aria-hidden="true" />

          <Image
            src="/brand/ZDM2.png"
            alt="Zamor Data & Models"
            width={900}
            height={900}
            priority
            className={styles.heroImg}
          />
        </div>
      </div>
    </section>
  );
}
