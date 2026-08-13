export const locales = ['cs', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'cs';

export const siteName = 'ALEFUJ!';

// "ALEFUJ! novinky" list on MailerLite (a separate provider/account from
// vendulasubert.cz's Ecomail newsletter — and a separate form/list from
// vendulasubert.cz's own MailerLite form, despite sharing an account id).
// This is the bare JSONP "subscribe" action URL with no `callback` param,
// so a plain (no-JS) form POST to it gets a normal HTML response back
// rather than a JSONP-wrapped one — see src/components/Newsletter.astro
// for how that's used with the hidden-iframe submit pattern.
export const MAILERLITE_ALEFUJ_FORM_ENDPOINT =
	'https://assets.mailerlite.com/jsonp/2569527/forms/195688773516789161/subscribe';

interface Translations {
	nav: {
		home: string;
		aktuality: string;
		kostovyVerse: string;
		veronicinaTvorba: string;
		horoskop: string;
		langToggleTo: string; // e.g. "EN" shown while on the Czech site
	};
	home: {
		heading: string;
		readNowHeading: string;
		readNowHoroskop: { title: string; desc: string };
		readNowVerse: { title: string; desc: string };
		readNowTvorba: { title: string; desc: string };
		aktualityHeading: string;
		aktualityAllLink: string;
		aktualityEmpty: string;
	};
	footer: {
		newsletterHeading: string;
		newsletterBody: string;
		emailLabel: string;
		emailPlaceholder: string;
		submitLabel: string;
		successMessage: string;
		copyright: string;
	};
	translationNotice: {
		onlyInCzech: string;
		onlyInEnglish: string;
	};
	aktuality: {
		heading: string;
		backLink: string;
		empty: string;
	};
	kostovyVerse: {
		heading: string;
		intro: string;
		hithitNote: string;
		empty: string;
		czechOnlyNote: string;
	};
	veronicinaTvorba: {
		heading: string;
		poemsHeading: string;
		songsHeading: string;
		empty: string;
		czechOnlyNote: string;
	};
	horoskop: {
		heading: string;
		otherSignsHeading: string;
		loading: string;
		fallback: string;
		czechOnlyNote: string;
	};
}

export const translations: Record<Locale, Translations> = {
	cs: {
		nav: {
			home: 'Domů',
			aktuality: 'Aktuality',
			kostovyVerse: 'Kosťovy verše',
			veronicinaTvorba: 'Veroničina tvorba',
			horoskop: 'Kosťův horoskop',
			langToggleTo: 'EN',
		},
		home: {
			heading: 'Ahoj.',
			readNowHeading: 'Co si tu teď můžete přečíst',
			readNowHoroskop: {
				title: 'Kosťův horoskop',
				desc: 'Horoskop na tenhle měsíc sepsal Kosťa, jeden z vypravěčů knihy.',
			},
			readNowVerse: {
				title: 'Kosťovy verše',
				desc: 'Básně, které Kosťa vytvořil za účelem sezení na záchodě nebo za účelem smrkání.',
			},
			readNowTvorba: {
				title: 'Veroničina tvorba',
				desc: 'Veronika je jedna z vedlejších postav. Neustále vymýšlí básničky a písničky na ukulele a na klavír. Časem si možná dovolím některou z její tvorby zhudebnit jako interpret na YouTube.',
			},
			aktualityHeading: 'Aktuality',
			aktualityAllLink: 'Všechny aktuality →',
			aktualityEmpty: 'Zatím žádné aktuality.',
		},
		footer: {
			newsletterHeading: 'ALEFUJ! novinky',
			newsletterBody: 'Ať vám neuteče, až kniha vyjde. Žádný spam, jen upřímné novinky o knize.',
			emailLabel: 'E-mail',
			emailPlaceholder: 'váš e-mail',
			submitLabel: 'Přihlásit se',
			successMessage: 'Díky! Zkontrolujte e-mail a potvrďte přihlášení k odběru.',
			copyright: 'Vendula Maulerová',
		},
		translationNotice: {
			onlyInCzech: 'Tento obsah je zatím jen v češtině.',
			onlyInEnglish: 'This content is only available in English.',
		},
		aktuality: {
			heading: 'Aktuality',
			backLink: '← Zpět na Aktuality',
			empty: 'Zatím žádné aktuality.',
		},
		kostovyVerse: {
			heading: 'Kosťovy verše',
			intro: 'Básně, které Kosťa píše na kapesníky a toaleťáky — running gag z knihy. Zatím jde jen o ukázku: prodej je plánovaný jako odměna budoucí kampaně na Hithit, žádný nákup tu tedy zatím nenajdete.',
			hithitNote: '→ budoucí kampaň Hithit, zatím jen k nahlédnutí',
			empty: 'Zatím žádné verše.',
			czechOnlyNote:
				'Kosťa píše ozdobnou, záměrně archaickou češtinou, kterou překlad nepřežije, pročež jeho verše zůstávají v originále.',
		},
		veronicinaTvorba: {
			heading: 'Veroničina tvorba',
			poemsHeading: 'Básně',
			songsHeading: 'Písně',
			empty: 'Zatím žádná tvorba.',
			czechOnlyNote: 'Veroniččiny básně a písně zůstávají v originále — v angličtině zatím nejsou.',
		},
		horoskop: {
			heading: 'Kosťův horoskop',
			otherSignsHeading: 'Ostatní znamení',
			loading: 'Horoskop se načítá…',
			fallback: 'Kosťův horoskop pro toto znamení se připravuje.',
			czechOnlyNote:
				'Kosťa, jeden z vypravěčů knihy, píše horoskop ozdobnou, záměrně archaickou češtinou, kterou překlad nepřežije, pročež zůstává v originále. Jde o suché, nijak zvlášť lichotivé čtení pro všech dvanáct znamení.',
		},
	},
	en: {
		nav: {
			home: 'Home',
			aktuality: 'Updates',
			kostovyVerse: "Kosťa's Verses",
			veronicinaTvorba: "Veronika's Work",
			horoskop: "Kosťa's Horoscope",
			langToggleTo: 'CS',
		},
		home: {
			heading: 'Hi.',
			readNowHeading: 'What you can read here right now',
			readNowHoroskop: {
				title: "Kosťa's Horoscope",
				desc: "This month's horoscope, written by Kosťa, one of the book's narrators.",
			},
			readNowVerse: {
				title: "Kosťa's Verses",
				desc: 'Poems Kosťa wrote for sitting on the toilet, or for blowing your nose.',
			},
			readNowTvorba: {
				title: "Veronika's Work",
				desc: "Veronika is a side character who's always coming up with poems and songs on ukulele and piano. I might eventually record some of her work myself, on YouTube.",
			},
			aktualityHeading: 'Updates',
			aktualityAllLink: 'All updates →',
			aktualityEmpty: 'No updates yet.',
		},
		footer: {
			newsletterHeading: 'ALEFUJ! updates',
			newsletterBody: "Don't miss it when the book comes out. No spam, just honest updates about the book.",
			emailLabel: 'Email',
			emailPlaceholder: 'your email',
			submitLabel: 'Subscribe',
			successMessage: 'Thanks! Check your email to confirm your subscription.',
			copyright: 'Vendula Maulerová',
		},
		translationNotice: {
			onlyInCzech: 'Tento obsah je zatím jen v češtině.',
			onlyInEnglish: 'This content is only available in English.',
		},
		aktuality: {
			heading: 'Updates',
			backLink: '← Back to Updates',
			empty: 'No updates yet.',
		},
		kostovyVerse: {
			heading: "Kosťa's Verses",
			intro: "Poems Kosťa writes on tissues and toilet paper — a running joke from the book. This is just a preview for now: selling them is planned as a future Hithit campaign reward, so there's nothing to buy here yet.",
			hithitNote: '→ future Hithit campaign, preview only for now',
			empty: 'No verses yet.',
			czechOnlyNote:
				"Kosťa writes in an ornate, deliberately old-fashioned Czech that doesn't survive translation, so his verses stay in the original. Here's what they are: poems he wrote for tissue paper and toilet paper, a running joke from the book.",
		},
		veronicinaTvorba: {
			heading: "Veronika's Work",
			poemsHeading: 'Poems',
			songsHeading: 'Songs',
			empty: 'Nothing here yet.',
			czechOnlyNote:
				"Veronika's poems and songs are written in Czech and lean on rhyme and wordplay that don't survive translation, so they stay in the original below. She's a side character in the book who's always coming up with verses and tunes on ukulele and piano.",
		},
		horoskop: {
			heading: "Kosťa's Horoscope",
			otherSignsHeading: 'Other signs',
			loading: 'Loading horoscope…',
			fallback: "Kosťa's horoscope for this sign is still being written.",
			czechOnlyNote:
				"Kosťa, one of the book's narrators, writes this horoscope in an ornate, deliberately old-fashioned Czech that doesn't survive translation, so it stays in the original below. It's a dry, not-especially-flattering read for all twelve signs.",
		},
	},
};

export function t(locale: Locale): Translations {
	return translations[locale];
}

export function otherLocale(locale: Locale): Locale {
	return locale === 'cs' ? 'en' : 'cs';
}

export function dateLocale(locale: Locale): string {
	return locale === 'cs' ? 'cs-CZ' : 'en-GB';
}
