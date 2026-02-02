'use client'; // This file is a Client Component (runs in the browser). Required because we use React/Next hooks.

import {useLocale} from 'next-intl';           // Hook that tells us the current language/locale from next-intl
import {usePathname, useRouter} from 'next/navigation'; // Next.js hooks to read the current URL and navigate

// LocaleToggel: a small button that switches between English (en) and Spanish (es)
// className is passed from the Navbar so we can style the button from Navbar.module.css
export default function LocaleToggel({ className = "" }) {
  const locale = useLocale();        // Current locale string: 'en' or 'es'
  const router = useRouter();        // Lets us navigate programmatically (router.push)
  const pathname = usePathname();    // Current path, e.g. "/en/services" or "/es/about"

  // Decide what the next locale will be when the user clicks the button
  // If we are in English, switch to Spanish; if in Spanish, switch to English.
  const nextLocale = locale === 'en' ? 'es' : 'en';

  // Runs when the user clicks the toggle button
  function onToggle() {
    // Replace the first "/en" or "/es" part of the current URL with the next locale
    // Example: "/en/services" -> "/es/services"
    const newPath = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${nextLocale}`);

    // Navigate to the new URL (changes language but keeps the same page)
    router.push(newPath);
  }

  // Text + flag shown on the button depending on the current locale
  const label = locale === 'en' ? 'EN' : 'ES';
  const flag  = locale === 'en' ? '🇺🇸' : '🇪🇸'; // You can change 🇪🇸 to 🇨🇴 if you prefer

  // Render the button. className comes from the Navbar (CSS Modules).
  return (
    <button type="button" onClick={onToggle} className={className}>
      {flag} {label}
    </button>
  );
}
