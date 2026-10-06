// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at the custom domain root (see public/CNAME) — no `base` needed.
// The sitemap i18n block makes each URL list its /cs/ and /en/ alternates,
// matching the hreflang links in src/layouts/Layout.astro.
// https://astro.build/config
export default defineConfig({
	site: 'https://alefuj.cz',
	integrations: [
		sitemap({
			// The root URL is only a language redirect, so it's left out —
			// otherwise two URLs would claim the same cs-CZ alternate.
			filter: (page) => page !== 'https://alefuj.cz/',
			i18n: {
				defaultLocale: 'cs',
				locales: { cs: 'cs-CZ', en: 'en-US' },
			},
		}),
	],
});
