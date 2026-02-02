import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <h3 className={styles.title}>Contact</h3>

          <div className={styles.grid}>
            <div>
              <p className={styles.label}>Email</p>
              <a className={styles.link} href="mailto:hello@zamordata.com">
                hello@zamordata.com
              </a>
            </div>

            <div>
              <p className={styles.label}>Location</p>
              <p className={styles.text}>Remote • Worldwide</p>
            </div>

            <div>
              <p className={styles.label}>Response time</p>
              <p className={styles.text}>24–48 hours</p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {year} Zamor Data & Models</p>
        </div>
      </div>
    </footer>
  );
}
