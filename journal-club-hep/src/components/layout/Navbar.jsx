"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";
import LocaleToggel from "./LocaleToggel";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  // Base localized root
  const home = `/${locale}`;

  // Sections in your single landing page
  const items = [
    { label: "HOME", href: `${home}/#top` },
    { label: "ABOUT", href: `${home}/#about` },
    { label: "CALENDAR", href: `${home}/#calendar` },
    { label: "SPEAKERS", href: `${home}/#speakers` },
    { label: "PAPERS", href: `${home}/#papers` },
    { label: "JOIN", href: `${home}/#join` },
    { label: "TEAM", href: `${home}/#team` },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {/* LEFT: Brand */}
        <div className={styles.left}>
          <Link href={`${home}/#top`} className={styles.brand} onClick={() => setOpen(false)}>
            <span className={styles.brandText}>Journal Club UCN</span>
            <span className={styles.brandSpacer} aria-hidden="true" />
            <span className={styles.brandTag}>High Energy Physics</span>
          </Link>
        </div>

        {/* CENTER: Desktop links */}
        <nav className={styles.center}>
          {items.map((it) => (
            <Link key={it.label} href={it.href} className={styles.link}>
              {it.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Language + Hamburger */}
        <div className={styles.right}>
          <LocaleToggel className={styles.localeToggle} />

          <button
            className={styles.hamburger}
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <nav className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}>
        {items.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            className={styles.mobileLink}
            onClick={() => setOpen(false)}
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
