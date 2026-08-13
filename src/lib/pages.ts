import { getEntry, type CollectionEntry } from 'astro:content';
import { otherLocale, type Locale } from './i18n';

export interface LoadedPage {
	entry: CollectionEntry<'pages'>;
	/** The language the content is actually shown in — may differ from the
	 * requested (URL) language if that translation doesn't exist yet. */
	shownLang: Locale;
	/** Whether a version of THIS page exists in the other language — drives
	 * whether the header's language toggle can link directly to it, or has
	 * to fall back to that language's home page. */
	hasTranslation: boolean;
}

/**
 * Loads a `pages` collection entry for the given section (e.g. "home") and
 * requested language, falling back to the other language if a translation
 * doesn't exist yet — never an empty page, never a 404.
 */
export async function loadPage(section: string, requestedLang: Locale): Promise<LoadedPage> {
	const other = otherLocale(requestedLang);
	const [primary, translation] = await Promise.all([
		getEntry('pages', `${section}/${requestedLang}`),
		getEntry('pages', `${section}/${other}`),
	]);

	if (primary) {
		return { entry: primary, shownLang: requestedLang, hasTranslation: !!translation };
	}
	if (translation) {
		return { entry: translation, shownLang: other, hasTranslation: true };
	}
	throw new Error(`No content found for page "${section}" in either language.`);
}
