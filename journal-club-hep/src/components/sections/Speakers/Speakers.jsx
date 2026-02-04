"use client";

import styles from "./Speakers.module.css";
import Container from "@/components/layout/Container";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Speakers() {
  const t = useTranslations("Speakers");

  // For now: same photo for all
  const PHOTO = "/speakers/ricardo.png";

  // Demo data (replace later with content file)
  const upcoming = {
    name: "Ricardo Zamora",
    title: "TBD — Upcoming Talk Title",
    date: "TBD",
    place: "TBD",
  };

  const past = Array.from({ length: 6 }).map((_, i) => ({
    name: "Ricardo Zamora",
    title: `TBD — Past Talk Title ${i + 1}`,
    date: "TBD",
  }));

  return (
    <section id="speakers" className={styles.section}>
      <Container>
        <header className={styles.header}>
          <div className={styles.kicker}>{t("kicker")}</div>
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.underline} />
        </header>

        {/* UPCOMING (featured) */}
        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3 className={styles.blockTitle}>{t("upcomingTitle")}</h3>
            <p className={styles.blockSub}>{t("upcomingSub")}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureGrid}>
              <div className={styles.featurePhoto}>
                <div className={styles.photoMat}>
                  <Image
                    src={PHOTO}
                    alt={`${upcoming.name} portrait`}
                    fill
                    sizes="(max-width: 900px) 60vw, 240px"
                    className={styles.photo}
                  />
                </div>
              </div>

              <div className={styles.featureInfo}>
                <div className={styles.featureName}>{upcoming.name}</div>
                <div className={styles.featureTalk}>{upcoming.title}</div>

                <div className={styles.kv}>
                  <div className={styles.k}>{t("date")}:</div>
                  <div className={styles.v}>{upcoming.date}</div>

                  <div className={styles.k}>{t("location")}:</div>
                  <div className={styles.v}>{upcoming.place}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAST (grid of 6) */}
        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3 className={styles.blockTitle}>{t("pastTitle")}</h3>
            <p className={styles.blockSub}>{t("pastSub")}</p>
          </div>

          <div className={styles.grid}>
            {past.map((s, i) => (
              <article className={styles.card} key={`past-${i}`}>
                <div className={styles.cardPhoto}>
                  <div className={styles.photoMatSmall}>
                    <Image
                      src={PHOTO}
                      alt={`${s.name} portrait`}
                      fill
                      sizes="(max-width: 900px) 50vw, 240px"
                      className={styles.photo}
                    />
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardName}>{s.name}</div>
                  <div className={styles.cardTalk}>{s.title}</div>

                  <div className={styles.cardMeta}>
                    <span className={styles.metaLabel}>{t("date")}:</span> {s.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
