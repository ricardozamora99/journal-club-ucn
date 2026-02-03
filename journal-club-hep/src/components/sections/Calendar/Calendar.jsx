"use client";

import styles from "./Calendar.module.css";
import Container from "@/components/layout/Container";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export default function Calendar() {
  const t = useTranslations("Calendar");
  const scrollerRef = useRef(null);

  const images = [
    "/calendar/cal05.jpg",
    "/calendar/cal02.jpg",
    "/calendar/cal03.jpg",
    "/calendar/cal04.jpg",
    "/calendar/cal01.jpg",
    "/calendar/cal06.jpg",
  ];
 
  const scrollByOne = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    const firstSlide = el.querySelector(`.${styles.slide}`);
    const gap = 18; // keep synced with CSS
    const step = firstSlide ? firstSlide.getBoundingClientRect().width + gap : 320;

    const maxLeft = el.scrollWidth - el.clientWidth;

    // how close to the edge counts as "at the end"
    const EPS = 8;

    const atStart = el.scrollLeft <= EPS;
    const atEnd = el.scrollLeft >= maxLeft - EPS;

    // WRAP behavior
    if (dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (dir < 0 && atStart) {
      el.scrollTo({ left: maxLeft, behavior: "smooth" });
      return;
    }

    // normal step
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };


  return (
    <section id="calendar" className={styles.section}>
      <Container>
        <header className={styles.header}>
          <div className={styles.kicker}>{t("kicker")}</div>
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.underline} />
        </header>

        {/* Calendar embed */}
        <div className={styles.frameWrap}>
          <iframe
            className={styles.iframe}
            title="UCN HEP Journal Club Calendar"
            src="https://calendar.google.com/calendar/embed?src=89eb9d7b3f7923f0e11df75bf6f529a1fc80c84a1517e3e091b67c1b32391c33%40group.calendar.google.com&ctz=America%2FBogota&mode=MONTH&showTitle=1&showNav=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&wkst=1&bgcolor=%23ffffff&color=%230b2a4a"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Below: Next session + Description */}
        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>{t("nextTitle")}</h3>

            <div className={styles.kv}>
              <div className={styles.k}>{t("activity")}:</div>
              <div className={styles.v}>{t("tbd")}</div>

              <div className={styles.k}>{t("sessionTitle")}:</div>
              <div className={styles.v}>{t("tbd")}</div>

              <div className={styles.k}>{t("speakers")}:</div>
              <div className={styles.v}>{t("tbd")}</div>
            </div>
          </div>

          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>{t("descTitle")}</h3>
            <div className={styles.descBox}>{t("descPlaceholder")}</div>
          </div>
        </div>

        {/* NEW: Old sessions / activities carousel */}
        <div className={styles.oldWrap}>
          <div className={styles.oldHeader}>
            <h3 className={styles.oldTitle}>{t("oldTitle")}</h3>
            <p className={styles.oldSub}>{t("oldSubtitle")}</p>
          </div>

          <div className={styles.carousel}>
            <button
              type="button"
              className={styles.arrowLeft}
              onClick={() => scrollByOne(-1)}
              aria-label={t("prev")}
            >
              ‹
            </button>

            <div className={styles.scroller} ref={scrollerRef}>
              {images.map((src, i) => (
                <div className={styles.slide} key={src}>
                  <div className={styles.imgBox}>
                    <Image
                      src={src}
                      alt={t("oldAlt", { n: i + 1 })}
                      fill
                      sizes="(max-width: 900px) 80vw, 33vw"
                      className={styles.img}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.arrowRight}
              onClick={() => scrollByOne(1)}
              aria-label={t("next")}
            >
              ›
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
