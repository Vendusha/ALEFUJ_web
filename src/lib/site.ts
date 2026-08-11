export const SITE_NAME = 'ALEFUJ!';
export const SITE_AUTHOR = 'Vendula Maulerová';

// Shown on the home page as the current production status. Edit this string
// whenever the book moves to its next stage (e.g. "v tisku", "vyšlo!").
export const BOOK_STATUS = 'v redakci';

// TODO(Ecomail): placeholder — replace with the real "action" URL from
// Ecomail's embed code for the "ALEFUJ! novinky" list (Ecomail dashboard →
// Forms → your form → Embed code). This is a *separate* list from the
// vendulasubert.cz "novinky" list, on the same Ecomail account. Check
// whether Ecomail's snippet expects extra hidden fields (list id, signature,
// redirect URL) and copy those into src/components/Newsletter.astro too.
export const ECOMAIL_ALEFUJ_FORM_ENDPOINT_PLACEHOLDER = 'https://PLACEHOLDER.ecomailapp.cz/public/subscribe';

// TODO(YouTube): placeholder video ID for the Video page — replace with the
// real 11-character ID from the YouTube URL (youtube.com/watch?v=THIS_PART).
export const INTRO_VIDEO_ID_PLACEHOLDER = 'PLACEHOLDER_VIDEO_ID';

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
