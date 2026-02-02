import styles from "./Hero.module.css";
import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section id="top" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <h1 className={styles.title}>Journal Club UCN</h1>
          <p className={styles.subtitle}>High Energy Physics</p>
          <p className={styles.text}>
            Weekly talks, discussions, and paper reading sessions.
          </p>

          <div className={styles.actions}>
            <a className={styles.button} href="#join">Join</a>
            <a className={styles.buttonGhost} href="#calendar">Next session</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
