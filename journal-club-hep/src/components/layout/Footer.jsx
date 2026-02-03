import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const home = `/${locale}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandTitle}>{t("siteName")}</div>
            <div className={styles.brandSub}>{t("affiliation")}</div>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <Link className={styles.navLink} href={`${home}/#about`}>
              {t("nav.about")}
            </Link>
            <Link className={styles.navLink} href={`${home}/#calendar`}>
              {t("nav.calendar")}
            </Link>
            <Link className={styles.navLink} href={`${home}/#join`}>
              {t("nav.join")}
            </Link>
          </nav>
        </div>

        <div className={styles.grid}>
          <div className={styles.block}>
            <div className={styles.label}>{t("contact.title")}</div>
            <a className={styles.link} href={`mailto:${t("contact.emailValue")}`}>
              {t("contact.emailValue")}
            </a>
            <div className={styles.meta}>{t("contact.note")}</div>
          </div>

          <div className={styles.block}>
            <div className={styles.label}>{t("location.title")}</div>
            <div className={styles.text}>{t("location.value")}</div>
            <div className={styles.meta}>{t("location.note")}</div>
          </div>

          {/* SOCIAL block with icon + QR on the right */}
          <div className={`${styles.block} ${styles.socialBlock}`}>
            <div className={styles.socialLeft}>
              <div className={styles.label}>{t("social.title")}</div>

              <a
                className={styles.socialLink}
                href="https://www.instagram.com/fisicaucn/?hl=en"
                target="_blank"
                rel="noreferrer"
              >
                {t("social.instagram")}
              </a>

              <div className={styles.meta}>{t("social.note")}</div>
            </div>

            <div className={styles.socialRight}>
              <a
                className={styles.iconCell}
                href="https://www.instagram.com/fisicaucn/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <Image
                  src="/footer/instagram.png"
                  alt="Instagram"
                  width={44}
                  height={44}
                  className={styles.iconImg}
                />
              </a>

              <a
                className={styles.qrCell}
                href="https://www.instagram.com/fisicaucn/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram QR"
                title="Instagram QR"
              >
                <Image
                  src="/footer/qr_inst.png"
                  alt="Instagram QR"
                  width={64}
                  height={64}
                  className={styles.qrImg}
                />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            © {year} {t("copyright")}
          </div>

          <div className={styles.disclaimer}>{t("disclaimer")}</div>

          {/* very subtle credits */}
          <div className={styles.credits}>
            <span className={styles.creditsLabel}>{t("credits.label")}</span>


            <a
              className={styles.creditsLink}
              href="https://www.linkedin.com/in/ricardo-zamora-80b714193/"
              target="_blank"
              rel="noreferrer"
            >
              {t("credits.linkedin")}
            </a>
                        <span className={styles.creditsSep}>·</span>
                        <a
              className={styles.creditsLink}
              href="https://github.com/ricardozamora99"
              target="_blank"
              rel="noreferrer"
            >
              {t("credits.github")}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
