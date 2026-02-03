import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import styles from "./About.module.css";
import Container from "@/components/layout/Container";

export default function About() {
  const locale = useLocale();
  const t = useTranslations("About");
  const home = `/${locale}`;

  const features = [
    { title: t("f1.title"), text: t("f1.text") },
    { title: t("f2.title"), text: t("f2.text") },
    { title: t("f3.title"), text: t("f3.text") },
  ];

  return (
    <section id="about" className={styles.section}>
      <Container>
        <header className={styles.header}>
          <div className={styles.kicker}>{t("kicker")}</div>
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.underline} />
          <p className={styles.lead}>{t("desc")}</p>

          <div className={styles.actions}>
            {/* Keep only Calendar to avoid "Join" duplication with Hero */}
            <Link className={styles.btnGhost} href={`${home}/#calendar`}>
              {t("ctaCalendar")}
            </Link>
          </div>
        </header>

        <div className={styles.featureGrid}>
          {features.map((f) => (
            <article key={f.title} className={styles.feature}>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureText}>{f.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>{t("meta1.k")}</span>
            <span className={styles.metaValue}>{t("meta1.v")}</span>
          </div>

          <div className={styles.metaSep} />

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>{t("meta2.k")}</span>
            <span className={styles.metaValue}>{t("meta2.v")}</span>
          </div>

          <div className={styles.metaSep} />

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>{t("meta3.k")}</span>
            <span className={styles.metaValue}>{t("meta3.v")}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
