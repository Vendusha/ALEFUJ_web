import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Czech zodiac signs, in traditional calendar order.
export const ZODIAC_SIGNS = [
	'beran',
	'byk',
	'blizenci',
	'rak',
	'lev',
	'panna',
	'vahy',
	'stir',
	'strelec',
	'kozoroh',
	'vodnar',
	'ryby',
] as const;

// Each update lives at: src/content/aktuality/<slug>/index.md
// (post text + its own images sit together in one folder — the "page bundle"
// pattern). Templates live outside this folder, in src/content/_templates/,
// so they can never accidentally match this collection's loader pattern.
// `lang` + optional `translationKey` follow the same bilingual pattern as
// vendulasubert.cz's blog posts: a translation is a second, separate post
// file, linked to its sibling by sharing a translationKey.
const aktuality = defineCollection({
	loader: glob({ pattern: '*/index.md', base: './src/content/aktuality' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			lang: z.enum(['cs', 'en']),
			translationKey: z.string().optional(),
			summary: z.string(),
			heroImage: image().optional(),
		}),
});

// One file per zodiac sign, ever: src/content/horoskop/<sign>.md — the text
// is the markdown body (main paragraph + an italicized editorial aside), not
// a frontmatter field, so it renders through the normal markdown pipeline
// (needed for the aside's italics). Which sign is "featured" is worked out
// client-side from standard zodiac date ranges (see the horoskop page) — no
// month field, no rotation schedule, no archive. `excerpt` is optional and
// auto-generated from the body when omitted (see src/lib/horoskop.ts).
// `draft` marks a sign that hasn't been written yet, so the page can still
// build with all 12 present without showing placeholder text as if real.
// Czech-only, deliberately — see the "Bilingual" section of the README.
const horoskop = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/horoskop' }),
	schema: z.object({
		sign: z.enum(ZODIAC_SIGNS),
		excerpt: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

// Each poem lives at: src/content/kostovy-verse/<slug>/index.md — a page
// bundle so a poem can carry its own product photo when there is one.
// `status` only has one real value today ("coming-soon", i.e. "shown but not
// for sale yet"); it's an enum rather than a boolean so a future status like
// "hithit" or "sold-out" can be added without changing the shape of every
// existing entry. Czech-only, deliberately — see the README.
const kostovyVerse = defineCollection({
	loader: glob({ pattern: '*/index.md', base: './src/content/kostovy-verse' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			text: z.string(),
			productType: z.enum(['kapesnik', 'toaletak']),
			image: image().optional(),
			status: z.enum(['coming-soon']).default('coming-soon'),
		}),
});

// Veronika's poems and songs together, one flat file per entry:
// src/content/veronicina-tvorba/<slug>.md. `typ` groups them on the page;
// `youtubeId` is optional since poems don't need one and not every song has
// been recorded yet. Czech-only, deliberately — see the README.
const veronicinaTvorba = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/veronicina-tvorba' }),
	schema: z.object({
		title: z.string(),
		typ: z.enum(['basen', 'pisen']),
		description: z.string(),
		youtubeId: z.string().optional(),
	}),
});

// Standalone bilingual site copy — one markdown file per section per
// language: src/content/pages/<section>/<lang>/index.md. Entry id is
// "<section>/<lang>", e.g. "home/cs", which is exactly how pages look them
// up (see src/lib/pages.ts).
const pages = defineCollection({
	loader: glob({ pattern: '*/*/index.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		lang: z.enum(['cs', 'en']),
		description: z.string().optional(),
	}),
});

export const collections = { aktuality, horoskop, kostovyVerse, veronicinaTvorba, pages };
