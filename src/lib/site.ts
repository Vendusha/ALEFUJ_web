import type { Locale } from './i18n';

// Kosťa's verses and Veronika's poems/songs are Czech-only — see the
// "Bilingual" section of the README. Kosťa's horoscope is the one
// exception among the three "character voice" collections: it IS
// translated (see src/content/horoskop/), so its sign names need an
// English form too — the standard English/Latin zodiac names, not a
// transliteration of the Czech ones.
export const ZODIAC_SIGN_LABELS: Record<Locale, Record<string, string>> = {
	cs: {
		beran: 'Beran',
		byk: 'Býk',
		blizenci: 'Blíženci',
		rak: 'Rak',
		lev: 'Lev',
		panna: 'Panna',
		vahy: 'Váhy',
		stir: 'Štír',
		strelec: 'Střelec',
		kozoroh: 'Kozoroh',
		vodnar: 'Vodnář',
		ryby: 'Ryby',
	},
	en: {
		beran: 'Aries',
		byk: 'Taurus',
		blizenci: 'Gemini',
		rak: 'Cancer',
		lev: 'Leo',
		panna: 'Virgo',
		vahy: 'Libra',
		stir: 'Scorpio',
		strelec: 'Sagittarius',
		kozoroh: 'Capricorn',
		vodnar: 'Aquarius',
		ryby: 'Pisces',
	},
};

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
	kapesnik: 'kapesník',
	toaletak: 'toaleťák',
};
