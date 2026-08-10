import Container from "@/components/layout/Container";
import styles from "./ContactGroups.module.css";

function alphabeticalSort(a, b) {
  return a.name.localeCompare(b.name, undefined, {
    sensitivity: "base",
  });
}

function ContactSection({
  kicker,
  title,
  people,
  emptyMessage,
}) {
  return (
    <section className={styles.group}>
      <div className={styles.groupHeader}>
        <span className={styles.kicker}>
          {kicker}
        </span>

        <h2 className={styles.groupTitle}>
          {title}
        </h2>
      </div>

      {people.length === 0 ? (
        <p className={styles.emptyState}>
          {emptyMessage}
        </p>
      ) : (
        <div className={styles.grid}>
          {people.map((person) => (
            <article
              key={person._id}
              className={styles.card}
            >
              <h3 className={styles.name}>
                {person.name?.trim()}
              </h3>

              {person.email ? (
                <a
                  href={`mailto:${person.email}`}
                  className={styles.email}
                >
                  {person.email}
                </a>
              ) : (
                <span className={styles.noEmail}>
                  Email not available
                </span>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default function ContactGroups({
  people = [],
  sanityError = false,
}) {
  const members = people
    .filter(
      (person) => person.isGroupHead !== true
    )
    .sort(alphabeticalSort);

  const faculty = members.filter(
    (person) => person.role === "professor"
  );

  const postdocs = members.filter(
    (person) => person.role === "postdoc"
  );

  const phdStudents = members.filter(
    (person) => person.role === "phd"
  );

  const mastersStudents = members.filter(
    (person) => person.role === "msc"
  );

  const bachelorsStudents = members.filter(
    (person) => person.role === "undergraduate"
  );

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.wrap}>
          {sanityError ? (
            <p className={styles.errorState}>
              Group contact information could not be loaded
              at this moment.
            </p>
          ) : (
            <>
              {faculty.length > 0 && (
                <ContactSection
                  kicker="Group Contacts"
                  title="Faculty Members"
                  people={faculty}
                  emptyMessage=""
                />
              )}

              <ContactSection
                kicker="Group Contacts"
                title="Postdoctoral Researchers"
                people={postdocs}
                emptyMessage="No current postdoctoral researchers."
              />

              <ContactSection
                kicker="Group Contacts"
                title="PhD Students"
                people={phdStudents}
                emptyMessage="No current PhD students."
              />

              <ContactSection
                kicker="Group Contacts"
                title="Master’s Students"
                people={mastersStudents}
                emptyMessage="No current Master’s students."
              />

              <ContactSection
                kicker="Group Contacts"
                title="Bachelor’s Students"
                people={bachelorsStudents}
                emptyMessage="No current Bachelor’s students."
              />
            </>
          )}
        </div>
      </Container>
    </section>
  );
}