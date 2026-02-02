'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import LocaleToggel from './LocaleToggel';

import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  const l = (path) => `/${locale}${path}`;

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>

        {/* LEFT: Logo */}
        <div className={styles.left}>
          <Link href={l('/')} className={styles.brand}>
            <img
              src="/brand/ZDM1.png"
              alt="Zamor Data & Models"
              className={styles.logo}
            />
          </Link>
        </div>

        {/* CENTER: Desktop links */}
        <nav className={styles.center}>
          <Link href={l('/')} className={styles.link}>HOME</Link>
          <Link href={l('/services')} className={styles.link}>SERVICES</Link>
          <Link href={l('/demos')} className={styles.link}>DEMOS</Link>
          <Link href={l('/projects')} className={styles.link}>PROJECTS</Link>
          <Link href={l('/about')} className={styles.link}>ABOUT</Link>
          <Link href={l('/contact')} className={styles.link}>CONTACT</Link>
        </nav>

        {/* RIGHT: Language + Hamburger */}
        <div className={styles.right}>
          <LocaleToggel className={styles.localeToggle} />

          <button
            className={styles.hamburger}
            aria-label="Open menu"
            onClick={() => setOpen(o => !o)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
    
<nav className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}>
  <Link href={l('/')} className={styles.mobileLink} onClick={() => setOpen(false)}>HOME</Link>
  <Link href={l('/services')} className={styles.mobileLink} onClick={() => setOpen(false)}>SERVICES</Link>
  <Link href={l('/demos')} className={styles.mobileLink} onClick={() => setOpen(false)}>DEMOS</Link>
  <Link href={l('/projects')} className={styles.mobileLink} onClick={() => setOpen(false)}>PROJECTS</Link>
  <Link href={l('/about')} className={styles.mobileLink} onClick={() => setOpen(false)}>ABOUT</Link>
  <Link href={l('/contact')} className={styles.mobileLink} onClick={() => setOpen(false)}>CONTACT</Link>
</nav>

      
    </header>
  );
}
