"use client";

import styles from "./Join.module.css";
import Container from "@/components/layout/Container";
import { useTranslations } from "next-intl";

export default function Join() {
  const t = useTranslations("Join");

  return (
    <section id="join" className={styles.section}>
      <Container>
        <header className={styles.header}>
          <div className={styles.kicker}>{t("kicker")}</div>
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.underline} />
        </header>

        <div className={styles.wrap}>
          {/* Left: text */}
          <div className={styles.lead}>
            <p className={styles.text}>{t("text")}</p>

            <ul className={styles.bullets}>
              <li>{t("b1")}</li>
              <li>{t("b2")}</li>
              <li>{t("b3")}</li>
            </ul>
          </div>

          {/* Right: contact card */}
          <aside className={styles.card} aria-label={t("cardLabel")}>
            <h3 className={styles.cardTitle}>{t("cardTitle")}</h3>

            <div className={styles.kv}>
              <div className={styles.k}>{t("emailLabel")}:</div>
              <div className={styles.v}>{t("emailValue")}</div>

              <div className={styles.k}>{t("whatsLabel")}:</div>
              <div className={styles.v}>{t("whatsValue")}</div>
            </div>

            <div className={styles.note}>
              {t("note")}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
