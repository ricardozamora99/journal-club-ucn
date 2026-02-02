Middleware is basically a **tiny “gatekeeper” function** that runs **before Next.js decides which page to serve**.

So instead of the request going straight to your routes, it goes like:

**Browser request → middleware → Next.js routing → page**

Middleware can look at the request (URL, headers, cookies) and then **redirect / rewrite / add headers**. That’s the official definition in Next.js docs: it runs before a request is completed and can redirect or rewrite responses. ([Next.js][1])

---

## Why you need middleware for `/en/...` and `/es/...`

Because you chose strategy A: **language in the URL**.

That means your real pages will live under:

* `/en/about`
* `/es/about`
* etc.

But what happens if someone visits just:

* `/`
  or
* `/about` (no locale prefix)

Next.js can’t magically know which locale you want unless you **decide it somewhere**.

That “somewhere” is middleware.

### What middleware does for i18n (typical behavior)

When a user requests `/`:

1. Middleware checks the browser’s language (`Accept-Language` header)
2. Picks the best match (`en` or `es`)
3. Redirects to `/en` or `/es`
4. Optionally sets a cookie to remember the choice

This is exactly how `next-intl` describes its middleware flow (e.g. `/` → `/en`). ([next-intl][2])

---

## Is middleware mandatory?

If you’re okay with **always typing the locale**, you could avoid middleware, but you’ll have a worse experience:

* Visiting `/` would 404 unless you manually make `/` redirect somewhere else
* Users landing on unprefixed links might break
* Harder to “auto-pick” English vs Spanish the first time

So for a professional multilingual site, middleware is the clean standard approach. ([Next.js][3])

---

## Simple mental model (no code)

Think of middleware like the **receptionist**:

* If someone arrives without a language badge (`/`)
* the receptionist asks “English or Spanish?” (from browser settings)
* and sends them to the correct door (`/en` or `/es`)

---

## Where does middleware live?

A file called **`middleware.js`** (or `.ts`) at the **project root** (same level as `package.json`). Next.js runs it automatically for the routes you configure. ([Next.js][1])

---

If you want, I can explain it using your exact structure (your `(site)` group + the future `[locale]` folder) and show you *only* the minimal middleware you need—nothing extra.

[1]: https://nextjs.org/docs/14/app/building-your-application/routing/middleware?utm_source=chatgpt.com "Routing: Middleware"
[2]: https://next-intl.dev/docs/routing/middleware?utm_source=chatgpt.com "Proxy / middleware – Internationalization (i18n) for Next.js"
[3]: https://nextjs.org/docs/app/guides/internationalization?utm_source=chatgpt.com "Guides: Internationalization"


---


Got it — here’s the **same full plan**, but now with the **theory behind each piece**, in a way that matches how you’re learning.

---

## Big picture: what i18n “Strategy A” really means

You chose: **language in the URL**.

So your website will have **two versions of every page**:

* English: `/en/about`, `/en/services`, `/en/projects`, …
* Spanish: `/es/about`, `/es/services`, `/es/projects`, …

This is common because:

* It’s **great for SEO** (Google can index both languages separately).
* Links are **shareable** (“this exact Spanish page”).
* It’s explicit and professional.

That choice forces one key rule:

### Every request must know the locale

If someone visits `/en/about`, locale is clearly `en`.
But what about:

* `/`
* `/about`
  Those don’t include the locale. So we need a system that says:

> “If the URL doesn’t specify a language, choose one and send the user to the correct localized URL.”

That system is **middleware**.

---

## What is middleware (theory)

Middleware is a “gatekeeper” that runs **before** Next.js chooses which page to render.

Think of it like a receptionist at the building entrance:

* Visitor arrives at `/`
* Receptionist checks:

  * browser language (headers like `Accept-Language`)
  * or cookie (previous choice)
  * or default fallback
* Receptionist redirects them to:

  * `/en` or `/es`

So middleware is needed mainly to:

1. **redirect** missing-locale URLs (`/` → `/en`)
2. **keep behavior consistent** everywhere

Without middleware, you *can* still do i18n, but you’ll have annoying issues:

* `/` might not know what to show
* `/about` might 404 or show wrong language
* you’d manually fix edge cases everywhere

So middleware makes your i18n clean and automatic.

---

## Another key concept: App Router routing = folders

In Next.js **App Router**:

* A folder name becomes part of the URL
* `page.js` inside that folder is the page
* `layout.js` wraps pages below it

Route groups like `(site)` are special:

* They **do not** appear in the URL
* They’re just for organizing your code

So:
`src/app/(site)/about/page.js` → `/about`

---

## How we’ll implement Strategy A in your project

We’ll add a folder `[locale]`:

* `[locale]` is a **dynamic segment**
* It matches `en` or `es`
* So your routes become:

`src/app/[locale]/(site)/about/page.js` → `/en/about` and `/es/about`

This gives you the URL-based language system you want.

---

# Now the full setup (same steps) + explanation for each

## Step 0 — Make a “safe point” (important)

Before touching structure, commit. If something breaks, you can undo safely.

```bash
git add -A
git commit -m "chore: before i18n setup"
```

---

## Step 1 — Install the i18n helper library

We use `next-intl` because it handles:

* loading translations
* reading locale from the route
* providing translation functions (`t("...")`)
* middleware integration

```bash
npm i next-intl
```

---

## Step 2 — Create routing rules (what languages exist)

This is where you define:

* supported locales: `en`, `es`
* default locale: `en`
* locale prefix: always shown (`/en/...`, `/es/...`)

Create:

### `src/i18n/routing.js`

```js
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always' // forces /en/... and /es/...
});
```

**Theory:** This is your “language policy”.
It tells your app which languages exist and how URLs should look.

---

## Step 3 — Define how the app loads translations

Each locale needs its own text dictionary (messages).

Create:

### `src/i18n/request.js`

```js
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

**Theory:** This runs on the server and says:

* “What locale is this request?”
* “Load the correct translation JSON for that locale”

So when you’re in `/es/about`, it loads `messages/es.json`.

---

## Step 4 — Create the translation files (your actual texts)

Create:

### `src/messages/en.json`

```json
{
  "Nav": {
    "about": "About",
    "services": "Services",
    "projects": "Projects",
    "demos": "Demos",
    "contact": "Contact"
  }
}
```

### `src/messages/es.json`

```json
{
  "Nav": {
    "about": "Acerca de",
    "services": "Servicios",
    "projects": "Proyectos",
    "demos": "Demos",
    "contact": "Contacto"
  }
}
```

**Theory:** These JSON files are your “language dictionaries”.
Same keys, different values.

---

## Step 5 — Add middleware (the “receptionist”)

Create **`middleware.js`** at the **project root** (same level as `package.json`):

```js
import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};
```

**Theory:**

* If user goes to `/`, middleware redirects to `/en` (or `/es`)
* If user goes to `/about`, middleware redirects to `/en/about` (or `/es/about`)
* The matcher line just avoids applying middleware to internal Next.js assets (`_next`) and files like images/css.

So middleware is what makes the site behave “smartly”.

---

## Step 6 — Enable next-intl integration in Next config

This makes Next.js aware of the `next-intl` setup (it wires some internals correctly).

In `next.config.js` / `next.config.mjs`:

```js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({});
```

**Theory:** Think of this as “turning on the plugin that connects Next.js + i18n”.

---

## Step 7 — Move your routes under `[locale]`

Right now you have:
`src/app/(site)/...`

We want:
`src/app/[locale]/(site)/...`

Run:

```bash
git mv "src/app/(site)" "src/app/[locale]/(site)"
```

**Theory:** This is the core of Strategy A.
By adding `[locale]` in the folder tree, you *force* every page to include a locale in the URL.

---

## Step 8 — Add the `[locale]` layout (required)

Create: **`src/app/[locale]/layout.js`**

```js
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages} from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Theory (what this layout is doing):**

* It wraps every page under `/en/*` or `/es/*`
* It validates locale: if someone tries `/fr/about`, it gives 404
* It loads the right messages and provides them to React via `NextIntlClientProvider`
* It sets `<html lang="en">` or `<html lang="es">` (good practice)

---

## Step 9 — Use translations in your UI

Example:

```js
import {useTranslations} from 'next-intl';

export default function Page() {
  const t = useTranslations('Nav');
  return <h1>{t('services')}</h1>;
}
```

**Theory:**

* `useTranslations('Nav')` chooses the `Nav` section from the JSON
* `t('services')` returns `"Services"` in English and `"Servicios"` in Spanish automatically, depending on the URL.

---

## Step 10 — Run and test

```bash
npm run dev
```

Try:

* `http://localhost:3000/` → should redirect to `/en` (or `/es`)
* `http://localhost:3000/en/about`
* `http://localhost:3000/es/about`

---

# Why we do it now (before designing pages)

Because switching to Strategy A later means:

* moving folders,
* rewriting links,
* updating slugs,
* changing navigation logic.

Doing it now keeps everything clean while your project is still light.

---

If you want the smoothest “learning” flow, tell me what you want to do next and I’ll guide you in order:

1. **First implement the structure** and confirm it works
2. Then build a **language switch button** (EN/ES)
3. Then start building pages with translated content

What do you want to do right now: **install + create files**, or **move the routes first**?
