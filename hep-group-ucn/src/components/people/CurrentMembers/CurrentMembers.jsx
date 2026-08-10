"use client";

import Image from "next/image";
import styles from "./CurrentMembers.module.css";
import Container from "@/components/layout/Container";

const ROLE_LABELS = {
  professor: "Professor",
  postdoc: "Postdoctoral Researcher",
  phd: "PhD Student",
  msc: "Master’s Student",
  undergraduate: "Bachelor’s Student",
};

function countryCodeToFlag(countryCode) {
  if (!countryCode) return "";

  const code = countryCode.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(code)) {
    return "";
  }

  return String.fromCodePoint(
    ...[...code].map((char) => 127397 + char.charCodeAt(0))
  );
}

function alphabeticalSort(a, b) {
  return a.name.localeCompare(b.name, undefined, {
    sensitivity: "base",
  });
}

function getDisplayName(member) {
  const flag = countryCodeToFlag(member.countryCode);

  return flag
    ? `${member.name} - ${flag}`
    : member.name;
}

function MemberCard({ member }) {
  const roleLabel = ROLE_LABELS[member.role] ?? member.role;

  return (
    <article className={styles.memberCard}>
      <div className={styles.memberImageWrap}>
        <Image
          src={member.imageUrl || "/brand/logoucn.png"}
          alt={member.name}
          fill
          className={styles.memberImage}
          sizes="(max-width: 900px) 100vw, 33vw"
        />
      </div>

      <div className={styles.memberBody}>
        <span className={styles.memberRole}>
          {roleLabel}
        </span>

        <h3 className={styles.memberName}>
          {getDisplayName(member)}
        </h3>

        <p className={styles.memberFocus}>
          {member.description}
        </p>
      </div>
    </article>
  );
}

function MemberGroup({
  title,
  members,
  emptyMessage,
}) {
  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <span className={styles.groupKicker}>
          Current Members
        </span>

        <h3 className={styles.groupTitle}>
          {title}
        </h3>
      </div>

      {members.length === 0 ? (
        <p className={styles.emptyState}>
          {emptyMessage}
        </p>
      ) : (
        <div className={styles.grid}>
          {members.map((member) => (
            <MemberCard
              key={member._id}
              member={member}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CurrentMembers({
  people = [],
  sanityError = false,
}) {
  const currentMembers = people
    .filter(
      (person) =>
        person.membershipStatus === "current"
    )
    .sort(alphabeticalSort);

  const head =
    currentMembers.find(
      (person) => person.isGroupHead === true
    ) ?? null;

  const faculty = currentMembers.filter(
    (person) =>
      person.role === "professor" &&
      person.isGroupHead !== true
  );

  const postdocs = currentMembers.filter(
    (person) => person.role === "postdoc"
  );

  const phdStudents = currentMembers.filter(
    (person) => person.role === "phd"
  );

  const mastersStudents = currentMembers.filter(
    (person) => person.role === "msc"
  );

  const bachelorsStudents = currentMembers.filter(
    (person) => person.role === "undergraduate"
  );

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.top}>
          <div className={styles.heading}>
            <span className={styles.kicker}>
              Current Members
            </span>

            <h2 className={styles.title}>
              The group as it stands
              <span>today</span>
            </h2>
          </div>

          <p className={styles.intro}>
            A snapshot of the current structure of the
            group, from its head to researchers and
            students across different stages of academic
            formation.
          </p>
        </div>

        {sanityError ? (
          <p className={styles.errorState}>
            The current members could not be loaded at
            this moment.
          </p>
        ) : (
          <>
            {head ? (
              <article className={styles.headBlock}>
                <div className={styles.headImageWrap}>
                  <Image
                    src={
                      head.imageUrl ||
                      "/brand/logoucn.png"
                    }
                    alt={head.name}
                    fill
                    className={styles.headImage}
                    sizes="(max-width: 980px) 100vw, 40vw"
                  />
                </div>

                <div className={styles.headContent}>
                  <span className={styles.headKicker}>
                    Head
                  </span>

                  <h3 className={styles.headName}>
                    {getDisplayName(head)}
                  </h3>

                  <p className={styles.headText}>
                    {head.description}
                  </p>
                </div>
              </article>
            ) : (
              <p className={styles.emptyState}>
                No group head is currently listed.
              </p>
            )}

            {faculty.length > 0 && (
              <MemberGroup
                title="Faculty Members"
                members={faculty}
                emptyMessage=""
              />
            )}

            <MemberGroup
              title="Postdoctoral Researchers"
              members={postdocs}
              emptyMessage="No current postdoctoral researchers."
            />

            <MemberGroup
              title="PhD Students"
              members={phdStudents}
              emptyMessage="No current PhD students."
            />

            <MemberGroup
              title="Master’s Students"
              members={mastersStudents}
              emptyMessage="No current Master’s students."
            />

            <MemberGroup
              title="Bachelor’s Students"
              members={bachelorsStudents}
              emptyMessage="No current Bachelor’s students."
            />
          </>
        )}
      </Container>
    </section>
  );
}