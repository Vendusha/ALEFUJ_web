// Kosťa's horoscope, verses, and Veronika's poems/songs are Czech-only —
// see the "Bilingual" section of the README. These labels are part of that
// same Czech-only content (Kosťa's own labeling of his work), so they are
// never translated or run through src/lib/i18n.ts.
export const ZODIAC_SIGN_LABELS: Record<string, string> = {
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
};

export const MONTH_LABELS: Record<number, string> = {
	1: 'leden',
	2: 'únor',
	3: 'březen',
	4: 'duben',
	5: 'květen',
	6: 'červen',
	7: 'červenec',
	8: 'srpen',
	9: 'září',
	10: 'říjen',
	11: 'listopad',
	12: 'prosinec',
};

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
	kapesnik: 'kapesník',
	toaletak: 'toaleťák',
};
