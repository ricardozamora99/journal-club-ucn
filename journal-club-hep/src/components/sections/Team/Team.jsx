"use client";

import styles from "./Team.module.css";
import Container from "@/components/layout/Container";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Team() {
  const t = useTranslations("Team");

  const PHOTO = "/speakers/ricardo.png";

  const head = {
    name: "Ricardo Zamora",
    role: t("headRole"),
    affiliation: t("headAffiliation"),
    area: t("headArea"),
  };

  // keep academicTBD for the "Academic" line
  const members = [
    { name: "Ricardo Zamora", level: t("phd"), academic: t("academicTBD"), affiliation: t("affiliationTBD") },
    { name: "Ricardo Zamora", level: t("phd"), academic: t("academicTBD"), affiliation: t("affiliationTBD") },
    { name: "Ricardo Zamora", level: t("msc"), academic: t("academicTBD"), affiliation: t("affiliationTBD") },
    { name: "Ricardo Zamora", level: t("msc"), academic: t("academicTBD"), affiliation: t("affiliationTBD") },
    { name: "Ricardo Zamora", level: t("bsc"), academic: t("academicTBD"), affiliation: t("affiliationTBD") },
    { name: "Ricardo Zamora", level: t("bsc"), academic: t("academicTBD"), affiliation: t("affiliationTBD") },
  ];

  return (
    <section id="team" className={styles.section}>
      <Container>
        <header className={styles.header}>
          <div className={styles.kicker}>{t("kicker")}</div>
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.underline} />
        </header>

        {/* HEAD OF TEAM */}
        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3 className={styles.blockTitle}>{t("headTitle")}</h3>
            <p className={styles.blockSub}>{t("headSub")}</p>
          </div>

          <article className={styles.headCard}>
            <div className={styles.headPhoto}>
              <div className={styles.photoMat}>
                <Image
                  src={PHOTO}
                  alt={`${head.name} portrait`}
                  fill
                  sizes="(max-width: 900px) 70vw, 240px"
                  className={styles.photo}
                />
              </div>
            </div>

            <div className={styles.headInfo}>
              <div className={styles.headName}>{head.name}</div>
              <div className={styles.headRole}>{head.role}</div>

              <div className={styles.headMeta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaK}>{t("affiliation")}:</span>
                  <span className={styles.metaV}>{head.affiliation}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaK}>{t("area")}:</span>
                  <span className={styles.metaV}>{head.area}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* TEAM MEMBERS */}
        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3 className={styles.blockTitle}>{t("membersTitle")}</h3>
            <p className={styles.blockSub}>{t("membersSub")}</p>
          </div>

          <div className={styles.grid}>
            {members.map((m, i) => (
              <article className={styles.card} key={`m-${i}`}>
                <div className={styles.cardTop}>
                  <div className={styles.badge}>{m.level}</div>
                </div>

                <div className={styles.cardPhoto}>
                  <div className={styles.photoMatSmall}>
                    <Image
                      src={PHOTO}
                      alt={`${m.name} portrait`}
                      fill
                      sizes="(max-width: 900px) 60vw, 200px"
                      className={styles.photo}
                    />
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardName}>{m.name}</div>

                  {/* line 1 */}
                  <div className={styles.cardLine}>
                    <span className={styles.lineK}>{t("affiliation")}:</span>{" "}
                    <span className={styles.lineV}>{m.affiliation}</span>
                  </div>

                  {/* line 2 */}
                  <div className={styles.cardLine}>
                    <span className={styles.lineK}>{t("academic")}:</span>{" "}
                    <span className={styles.lineV}>{m.academic}</span>
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
