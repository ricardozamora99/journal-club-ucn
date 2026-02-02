import styles from "./About.module.css";
import Container from "@/components/layout/Container";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <Container>
        <h2 className={styles.title}>About</h2>
        <p className={styles.text}>
          A community space at UCN to learn and discuss High Energy Physics papers.
        </p>
      </Container>
    </section>
  );
}