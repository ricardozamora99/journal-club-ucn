"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import LocaleToggel from "./LocaleToggel";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  const home = `/${locale}`;

  const closeMenu = () => {
    setOpen(false);
    setMobileSection(null);
  };

  const toggleMobileSection = (section) => {
    setMobileSection((current) => (current === section ? null : section));
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.topBand}>
        <div className={styles.inner}>
          <Link
            href={`${home}/#top`}
            className={styles.brand}
            onClick={closeMenu}
          >
            <Image
              src="/brand/logoucn.png"
              alt="Universidad Católica del Norte logo"
              width={38}
              height={38}
              className={styles.logo}
              priority
            />

            <div className={styles.brandTextWrap}>
              <span className={styles.brandTitle}>UCN HEP GROUP</span>
              <span className={styles.brandSubtitle}>High Energy Physics</span>
            </div>

            <Image
              src="/brand/hepJC.png"
              alt="UCN High Energy Physics Group logo"
              width={90}
              height={90}
              className={styles.logoRight}
              priority
            />
          </Link>

          <div className={styles.rightTop}>
            <LocaleToggel className={styles.localeToggle} />

            <button
              type="button"
              className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
              aria-label={open ? t("menuClose") : t("menuOpen")}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => {
                setOpen((current) => !current);
                setMobileSection(null);
              }}
            >
              <span className={styles.srOnly}>
                {open ? t("menuClose") : t("menuOpen")}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.goldLine} />

      <nav className={styles.linkRow} aria-label={t("navigation")}>
        <div className={styles.innerLinks}>
          <div className={styles.dropdown}>
            <button type="button" className={styles.dropdownTrigger}>
              {t("about")}
              <span className={styles.chevron} aria-hidden="true" />
            </button>

            <div className={styles.dropdownMenu}>
              <Link href={`${home}/about-group`} className={styles.dropdownLink}>
                {t("aboutGroup")}
              </Link>
              <Link href={`${home}/collaborations`} className={styles.dropdownLink}>
                {t("collaborations")}
              </Link>
            </div>
          </div>

          <Link href={`${home}/research`} className={styles.link}>
            {t("research")}
          </Link>

          <Link href={`${home}/people`} className={styles.link}>
            {t("people")}
          </Link>

          <Link href={`${home}/publications`} className={styles.link}>
            {t("publications")}
          </Link>

          <div className={styles.dropdown}>
            <button type="button" className={styles.dropdownTrigger}>
              {t("academicLife")}
              <span className={styles.chevron} aria-hidden="true" />
            </button>

            <div className={styles.dropdownMenu}>
              <Link href={`${home}/activities`} className={styles.dropdownLink}>
                {t("activities")}
              </Link>
              <Link href={`${home}/journal-club`} className={styles.dropdownLink}>
                {t("journalClub")}
              </Link>
            </div>
          </div>

          <Link href={`${home}/contact`} className={styles.contactLink}>
            {t("contact")}
          </Link>
        </div>
      </nav>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-label={t("navigation")}
        aria-hidden={!open}
      >
        <div className={styles.mobileSection}>
          <button
            type="button"
            className={styles.mobileSectionButton}
            aria-expanded={mobileSection === "about"}
            onClick={() => toggleMobileSection("about")}
          >
            {t("about")}
            <span
              className={`${styles.mobileChevron} ${
                mobileSection === "about" ? styles.mobileChevronOpen : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <div
            className={`${styles.mobileSubmenu} ${
              mobileSection === "about" ? styles.mobileSubmenuOpen : ""
            }`}
          >
            <Link
              href={`${home}/about-group`}
              className={styles.mobileSubLink}
              onClick={closeMenu}
              tabIndex={mobileSection === "about" ? 0 : -1}
            >
              {t("aboutGroup")}
            </Link>
            <Link
              href={`${home}/collaborations`}
              className={styles.mobileSubLink}
              onClick={closeMenu}
              tabIndex={mobileSection === "about" ? 0 : -1}
            >
              {t("collaborations")}
            </Link>
          </div>
        </div>

        <Link href={`${home}/research`} className={styles.mobileLink} onClick={closeMenu}>
          {t("research")}
        </Link>

        <Link href={`${home}/people`} className={styles.mobileLink} onClick={closeMenu}>
          {t("people")}
        </Link>

        <Link
          href={`${home}/publications`}
          className={styles.mobileLink}
          onClick={closeMenu}
        >
          {t("publications")}
        </Link>

        <div className={styles.mobileSection}>
          <button
            type="button"
            className={styles.mobileSectionButton}
            aria-expanded={mobileSection === "academic"}
            onClick={() => toggleMobileSection("academic")}
          >
            {t("academicLife")}
            <span
              className={`${styles.mobileChevron} ${
                mobileSection === "academic" ? styles.mobileChevronOpen : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <div
            className={`${styles.mobileSubmenu} ${
              mobileSection === "academic" ? styles.mobileSubmenuOpen : ""
            }`}
          >
            <Link
              href={`${home}/activities`}
              className={styles.mobileSubLink}
              onClick={closeMenu}
              tabIndex={mobileSection === "academic" ? 0 : -1}
            >
              {t("activities")}
            </Link>
            <Link
              href={`${home}/journal-club`}
              className={styles.mobileSubLink}
              onClick={closeMenu}
              tabIndex={mobileSection === "academic" ? 0 : -1}
            >
              {t("journalClub")}
            </Link>
          </div>
        </div>

        <Link
          href={`${home}/contact`}
          className={`${styles.mobileLink} ${styles.mobileContactLink}`}
          onClick={closeMenu}
        >
          {t("contact")}
        </Link>
      </nav>
    </header>
  );
}