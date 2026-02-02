import styles from "./Calendar.module.css";
import Container from "@/components/layout/Container";

export default function Calendar() {
  return (
    <section id="calendar" className={styles.section}>
      <Container>
        <h2 className={styles.title}>Calendar</h2>

        <div className={styles.card}>
          <p className={styles.line}><strong>Next session:</strong> TBD</p>
          <p className={styles.line}><strong>Time:</strong> TBD</p>
          <p className={styles.line}><strong>Location:</strong> TBD</p>
        </div>
      </Container>
    </section>
  );
}
