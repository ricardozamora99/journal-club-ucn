import styles from "./Join.module.css";
import Container from "@/components/layout/Container";

export default function Join() {
  return (
    <section id="join" className={styles.section}>
      <Container>
        <h2 className={styles.title}>Join</h2>
        <p className={styles.text}>
          Want to present a paper or attend sessions? Contact us.
        </p>

        <div className={styles.card}>
          <p className={styles.small}><strong>Email:</strong> TBD</p>
          <p className={styles.small}><strong>Form / WhatsApp:</strong> TBD</p>
        </div>
      </Container>
    </section>
  );
}
