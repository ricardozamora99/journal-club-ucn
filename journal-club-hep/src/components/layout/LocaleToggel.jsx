"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LocaleToggel({ className = "" }) {
  const locale = useLocale();     // 'en' or 'es'
  const router = useRouter();
  const pathname = usePathname();

  function go(toLocale) {
    const newPath = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${toLocale}`);
    router.push(newPath);
  }

  const currentLabel = locale === "en" ? "EN" : "ES";

  return (
    <div className={className} role="group" aria-label="Language selector">
      <span className="cur">{currentLabel}</span>
      <span className="sep" aria-hidden="true">|</span>

      <span className="box">
        <button
          type="button"
          className={`opt ${locale === "en" ? "active" : ""}`}
          onClick={() => go("en")}
          aria-current={locale === "en" ? "true" : "false"}
        >
          🇺🇸 <span className="txt">EN</span>
        </button>

        <span className="colon" aria-hidden="true">:</span>

        <button
          type="button"
          className={`opt ${locale === "es" ? "active" : ""}`}
          onClick={() => go("es")}
          aria-current={locale === "es" ? "true" : "false"}
        >
          🇪🇸 <span className="txt">ES</span>
        </button>
      </span>
    </div>
  );
}
