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
const aktuality = defineCollection({
	loader: glob({ pattern: '*/index.md', base: './src/content/aktuality' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			summary: z.string(),
			heroImage: image().optional(),
		}),
});

// One file per calendar month: src/content/horoskop/01-leden.md ... 12-prosinec.md.
// `month` (not the filename) is what the page actually reads to find the
// current entry, so the filename is just for humans browsing the folder.
// Every sign is required so an entry is never published half-finished.
const horoskop = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/horoskop' }),
	schema: z.object({
		month: z.number().int().min(1).max(12),
		signs: z
			.array(
				z.object({
					sign: z.enum(ZODIAC_SIGNS),
					text: z.string(),
				}),
			)
			.length(12),
	}),
});

// Each poem lives at: src/content/kostovy-verse/<slug>/index.md — a page
// bundle so a poem can carry its own product photo when there is one.
// `status` only has one real value today ("coming-soon", i.e. "shown but not
// for sale yet"); it's an enum rather than a boolean so a future status like
// "hithit" or "sold-out" can be added without changing the shape of every
// existing entry.
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

// Flat files (no images): src/content/veroniccinypisne/<slug>.md
const veroniccinyPisne = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/veroniccinypisne' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		youtubeId: z.string(),
	}),
});

export const collections = { aktuality, horoskop, kostovyVerse, veroniccinyPisne };
