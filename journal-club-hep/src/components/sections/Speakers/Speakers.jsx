import styles from "./Speakers.module.css";
import Container from "@/components/layout/Container";

export default function Speakers() {
  return (
    <section id="speakers" className={styles.section}>
      <Container>
        <h2 className={styles.title}>Speakers</h2>

        <ul className={styles.list}>
          <li className={styles.item}>Upcoming: TBD</li>
          <li className={styles.item}>Past: TBD</li>
        </ul>
      </Container>
    </section>
  );
}
