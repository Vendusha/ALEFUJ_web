// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at the custom domain root (see public/CNAME) — no `base` needed.
// https://astro.build/config
export default defineConfig({
	site: 'https://alefuj.cz',
	integrations: [sitemap()],
});
