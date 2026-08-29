"use client";

import Link from "next/link";
import {
  useLocale,
  useTranslations,
} from "next-intl";

import styles from "./Team.module.css";
import Container from "@/components/layout/Container";
import Image from "next/image";

const ROLE_LABELS = {
  professor: "Professor",
  postdoc: "Postdoctoral Researcher",
  phd: "PhD Student",
  msc: "Master’s Student",
  undergraduate: "Bachelor’s Student",
};

function getCountryName(countryCode, locale) {
  if (!countryCode) {
    return "";
  }

  try {
    const regions = new Intl.DisplayNames(
      [locale],
      {
        type: "region",
      }
    );

    return (
      regions.of(
        countryCode.trim().toUpperCase()
      ) || countryCode
    );
  } catch {
    return countryCode;
  }
}

export default function Team({
  members = [],
  sanityError = false,
}) {
  const t = useTranslations("Team");
  const locale = useLocale();

  return (
    <section
      id="team"
      className={styles.section}
    >
      <Container>
        <header className={styles.header}>
          <div className={styles.kicker}>
            {t("kicker")}
          </div>

          <h2 className={styles.title}>
            {t("title")}
          </h2>

          <div className={styles.underline} />

          <p className={styles.lead}>
            {t("membersSub")}
          </p>
        </header>

        {!sanityError && members.length > 0 && (
          <div className={styles.grid}>
            {members.map((member) => {
              const role =
                ROLE_LABELS[member.role] ??
                member.role;

              const country = getCountryName(
                member.countryCode,
                locale
              );

              return (
                <article
                  className={styles.card}
                  key={member._id}
                >
                  <div
                    className={styles.photoWrap}
                  >
                    <div
                      className={styles.photoBox}
                    >
                      <Image
                        src={
                          member.imageUrl ||
                          "/brand/logoucn.png"
                        }
                        alt={`${member.name} portrait`}
                        fill
                        sizes="(max-width: 900px) 40vw, 120px"
                        className={styles.photo}
                      />
                    </div>
                  </div>

                  <div
                    className={styles.cardBody}
                  >
                    <div
                      className={styles.cardName}
                    >
                      {member.name}
                    </div>

                    <div
                      className={styles.cardRole}
                    >
                      {role}
                    </div>

                    {country && (
                      <div
                        className={
                          styles.cardAffiliation
                        }
                      >
                        {country}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className={styles.actions}>
          <Link
            className={styles.btnGhost}
            href={`/${locale}/people`}
          >
            See the Whole Group
          </Link>
        </div>
      </Container>
    </section>
  );
}