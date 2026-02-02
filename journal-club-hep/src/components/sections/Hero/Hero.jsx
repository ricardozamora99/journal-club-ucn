"use client";
import { useTranslations } from "next-intl";
import styles from "./Hero.module.css";
import Container from "@/components/layout/Container";

export default function Hero() {
  const t = useTranslations("Hero");
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <Container>
        <div className={styles.inner}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>
            {t("subtitle")}
          </p>

          <div className={styles.actions}>
            <a className={styles.btn} href="#join">{t("ctaJoin")}</a>
            <a className={styles.btnGhost} href="#calendar">{t("ctaNext")}</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
