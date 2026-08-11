// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// PHASE 0: deployed at the default GitHub Pages project URL (github.io/<repo>),
// so `base` must match the repo name. Once the custom domain (alefuj.cz) is
// wired up, `site` becomes the real domain and `base` goes back to '/'.
// https://astro.build/config
export default defineConfig({
	site: 'https://vendusha.github.io',
	base: '/ALEFUJ_web/',
	integrations: [sitemap()],
});
