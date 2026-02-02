import styles from "./Team.module.css";
import Container from "@/components/layout/Container";

export default function Team() {
  return (
    <section id="team" className={styles.section}>
      <Container>
        <h2 className={styles.title}>Team</h2>

        <div className={styles.grid}>
          <div className={styles.person}>
            <div className={styles.avatar} aria-hidden="true" />
            <div>
              <p className={styles.name}>Name TBD</p>
              <p className={styles.role}>Organizer</p>
            </div>
          </div>

          <div className={styles.person}>
            <div className={styles.avatar} aria-hidden="true" />
            <div>
              <p className={styles.name}>Name TBD</p>
              <p className={styles.role}>Organizer</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
