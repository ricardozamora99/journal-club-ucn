"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import styles from "./AlumniSection.module.css";
import Container from "@/components/layout/Container";

function alphabeticalSort(a, b) {
  return a.name.localeCompare(b.name, undefined, {
    sensitivity: "base",
  });
}

function FormerMemberCard({ member }) {
  const years =
    member.startYear && member.endYear
      ? `${member.startYear}–${member.endYear}`
      : member.startYear
        ? `${member.startYear}–`
        : member.endYear
          ? `–${member.endYear}`
          : "";

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={member.imageUrl || "/brand/logoucn.png"}
          alt={member.name}
          fill
          className={styles.image}
          sizes="(max-width: 900px) 100vw, 25vw"
        />
      </div>

      <div className={styles.cardBody}>
        {years && (
          <span className={styles.years}>
            {years}
          </span>
        )}

        <h4 className={styles.name}>
          {member.name}
        </h4>

        <p className={styles.description}>
          {member.description}
        </p>

        {member.currentlyAt && (
          <div className={styles.nowBlock}>
            <span className={styles.nowLabel}>
              Currently at
            </span>

            <p className={styles.nowText}>
              {member.currentlyAt}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

function FormerMembersCarousel({
  title,
  kicker,
  members,
  emptyMessage,
}) {
  const [index, setIndex] = useState(0);

  const visibleCards = 4;

  const pages = useMemo(() => {
    const grouped = [];

    for (
      let i = 0;
      i < members.length;
      i += visibleCards
    ) {
      grouped.push(
        members.slice(i, i + visibleCards)
      );
    }

    return grouped;
  }, [members]);

  const totalPages = pages.length;

  useEffect(() => {
    if (totalPages === 0) {
      setIndex(0);
      return;
    }

    if (index >= totalPages) {
      setIndex(totalPages - 1);
    }
  }, [index, totalPages]);

  const goPrev = () => {
    if (totalPages <= 1) return;

    setIndex((prev) =>
      prev === 0 ? totalPages - 1 : prev - 1
    );
  };

  const goNext = () => {
    if (totalPages <= 1) return;

    setIndex((prev) =>
      prev === totalPages - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className={styles.group}>
      <div className={styles.groupHeader}>
        <div>
          <span className={styles.groupKicker}>
            {kicker}
          </span>

          <h3 className={styles.groupTitle}>
            {title}
          </h3>
        </div>

        {totalPages > 1 && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={goPrev}
              aria-label={`Previous ${title}`}
            >
              ←
            </button>

            <button
              type="button"
              className={styles.arrow}
              onClick={goNext}
              aria-label={`Next ${title}`}
            >
              →
            </button>
          </div>
        )}
      </div>

      {members.length === 0 ? (
        <p className={styles.emptyState}>
          {emptyMessage}
        </p>
      ) : (
        <>
          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{
                transform: `translateX(-${
                  index * 100
                }%)`,
              }}
            >
              {pages.map(
                (page, pageIndex) => (
                  <div
                    className={styles.slide}
                    key={`${title}-page-${pageIndex}`}
                  >
                    <div className={styles.grid}>
                      {page.map((member) => (
                        <FormerMemberCard
                          key={member._id}
                          member={member}
                        />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              {pages.map((_, dotIndex) => (
                <button
                  key={`${title}-dot-${dotIndex}`}
                  type="button"
                  className={`${styles.dot} ${
                    dotIndex === index
                      ? styles.dotActive
                      : ""
                  }`}
                  onClick={() =>
                    setIndex(dotIndex)
                  }
                  aria-label={`Go to page ${
                    dotIndex + 1
                  } of ${title}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function AlumniSection({
  people = [],
  sanityError = false,
}) {
  const formerMembers = people
    .filter(
      (person) =>
        person.membershipStatus === "former"
    )
    .sort(alphabeticalSort);

  const formerBachelors = formerMembers.filter(
    (person) =>
      person.role === "undergraduate"
  );

  const formerMasters = formerMembers.filter(
    (person) => person.role === "msc"
  );

  const formerPhDs = formerMembers.filter(
    (person) => person.role === "phd"
  );

  const formerPostdocs = formerMembers.filter(
    (person) => person.role === "postdoc"
  );

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.top}>
          <div className={styles.heading}>
            <span className={styles.kicker}>
              Academic Trajectory
            </span>

            <h2 className={styles.title}>
              Former Members
              <span>
                and current destinations
              </span>
            </h2>
          </div>

          <p className={styles.intro}>
            The group’s trajectory can also be seen
            through its former members: students and
            researchers who continued into graduate
            programs, postdoctoral positions,
            laboratories, and institutions in Chile and
            abroad.
          </p>
        </div>

        {sanityError ? (
          <p className={styles.errorState}>
            Former members could not be loaded at this
            moment.
          </p>
        ) : (
          <>
            <FormerMembersCarousel
              title="Former Bachelor’s Students"
              kicker="Bachelor’s"
              members={formerBachelors}
              emptyMessage="No former Bachelor’s students yet."
            />

            <FormerMembersCarousel
              title="Former Master’s Students"
              kicker="Master’s"
              members={formerMasters}
              emptyMessage="No former Master’s students yet."
            />

            <FormerMembersCarousel
              title="Former PhD Students"
              kicker="PhD"
              members={formerPhDs}
              emptyMessage="No former PhD students yet."
            />

            <FormerMembersCarousel
              title="Former Postdoctoral Researchers"
              kicker="Postdoctoral"
              members={formerPostdocs}
              emptyMessage="No former postdoctoral researchers yet."
            />
          </>
        )}
      </Container>
    </section>
  );
}