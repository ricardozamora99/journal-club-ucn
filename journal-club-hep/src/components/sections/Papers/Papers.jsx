import styles from "./Papers.module.css";
import Container from "@/components/layout/Container";

export default function Papers() {
  return (
    <section id="papers" className={styles.section}>
      <Container>
        <h2 className={styles.title}>Papers</h2>
        <p className={styles.text}>
          Placeholder list of papers (later: links, tags, arXiv IDs).
        </p>

        <div className={styles.card}>
          <p className={styles.small}><strong>Next paper:</strong> TBD</p>
          <p className={styles.small}><strong>Archive:</strong> coming soon</p>
        </div>
      </Container>
    </section>
  );
}
