import Container from "@/components/layout/Container";
import styles from "./ContactIntro.module.css";

export default function ContactIntro({
  head,
  sanityError = false,
}) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.wrap}>
          <div className={styles.top}>
            <div className={styles.heading}>
              <span className={styles.kicker}>
                Contact
              </span>

              <h1 className={styles.title}>
                Get in <span>Touch</span>
              </h1>
            </div>

            <p className={styles.intro}>
              For academic inquiries, research collaboration,
              or student contact, please use the information
              below.
            </p>
          </div>

          {sanityError ? (
            <p className={styles.errorState}>
              The main contact information could not be loaded
              at this moment.
            </p>
          ) : head ? (
            <article className={styles.mainCard}>
              <div className={styles.mainLeft}>
                <span className={styles.mainLabel}>
                  Main Contact Information
                </span>

                <h2 className={styles.mainTitle}>
                  Group Contact Details
                </h2>

                <p className={styles.mainText}>
                  For general academic inquiries and
                  collaboration requests, please contact the
                  group head.
                </p>
              </div>

              <div className={styles.mainRight}>
                {head.office && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoKey}>
                      Office
                    </span>

                    <p className={styles.infoValue}>
                      {head.office}
                    </p>
                  </div>
                )}

                {head.phone && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoKey}>
                      Phone
                    </span>

                    <p className={styles.infoValue}>
                      {head.phone}
                    </p>
                  </div>
                )}

                <div className={styles.infoItem}>
                  <span className={styles.infoKey}>
                    Head
                  </span>

                  <p className={styles.infoValue}>
                    {head.name?.trim()}
                  </p>

                  {head.email && (
                    <a
                      href={`mailto:${head.email}`}
                      className={styles.email}
                    >
                      {head.email}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ) : (
            <p className={styles.emptyState}>
              Group head contact information is not currently
              available.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}