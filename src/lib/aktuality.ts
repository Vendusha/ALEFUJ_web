import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

/** All Aktuality posts in the given language, newest first. */
export async function getAktuality(lang: Locale): Promise<CollectionEntry<'aktuality'>[]> {
	const posts = await getCollection('aktuality', (entry) => entry.data.lang === lang);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** The sibling translation of a post, if one exists (matched by translationKey). */
export async function getTranslationSibling(
	current: CollectionEntry<'aktuality'>,
	otherLang: Locale,
): Promise<CollectionEntry<'aktuality'> | undefined> {
	if (!current.data.translationKey) return undefined;
	const otherPosts = await getAktuality(otherLang);
	return otherPosts.find((p) => p.data.translationKey === current.data.translationKey);
}
