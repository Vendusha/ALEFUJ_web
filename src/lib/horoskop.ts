import type { ZODIAC_SIGNS } from '../content.config';

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

// Standard zodiac date ranges, expressed as month*100+day so a plain number
// comparison works without any date-library or leap-year handling. Kozoroh
// wraps the year boundary (22.12–19.1), so it's checked separately rather
// than fitting the same start/end-in-range shape as the other eleven.
const RANGES: { sign: Exclude<ZodiacSign, 'kozoroh'>; start: number; end: number }[] = [
	{ sign: 'beran', start: 321, end: 419 },
	{ sign: 'byk', start: 420, end: 520 },
	{ sign: 'blizenci', start: 521, end: 620 },
	{ sign: 'rak', start: 621, end: 722 },
	{ sign: 'lev', start: 723, end: 822 },
	{ sign: 'panna', start: 823, end: 922 },
	{ sign: 'vahy', start: 923, end: 1022 },
	{ sign: 'stir', start: 1023, end: 1121 },
	{ sign: 'strelec', start: 1122, end: 1221 },
	{ sign: 'vodnar', start: 120, end: 218 },
	{ sign: 'ryby', start: 219, end: 320 },
];

/** Which sign is "in season" for the given date (visitor's local date — call with `new Date()`). */
export function getFeaturedSign(date: Date): ZodiacSign {
	const md = (date.getMonth() + 1) * 100 + date.getDate();
	if (md >= 1222 || md <= 119) return 'kozoroh';
	const match = RANGES.find((r) => md >= r.start && md <= r.end);
	return match?.sign ?? 'kozoroh';
}

/** The first paragraph of a markdown body — the main horoscope text, excluding the italicized aside that follows it. */
export function getFirstParagraph(body: string): string {
	return body.split(/\n\s*\n/)[0]?.trim() ?? '';
}

/** Truncates to roughly the first sentence or `maxWords`, whichever is shorter, ending cleanly. */
export function autoExcerpt(paragraph: string, maxWords = 25): string {
	const plain = paragraph.replace(/[*_`]/g, '').trim();
	const sentenceMatch = plain.match(/^.*?[.!?…]/);
	const firstSentence = (sentenceMatch ? sentenceMatch[0] : plain).trim();
	const words = firstSentence.split(/\s+/);
	if (words.length <= maxWords) return firstSentence;
	return `${words.slice(0, maxWords).join(' ')}…`;
}
