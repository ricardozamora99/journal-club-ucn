import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'], //the only languages your site supports.
  defaultLocale: 'en', //the default language of your site.
  localePrefix: 'always' // always prefix the locale in the URL
});

// So routing is basically your language rules.
// You define which languages you support, which one is the default, and whether to prefix the locale in the URL.