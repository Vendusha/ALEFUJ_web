#!/usr/bin/env node
// Pings Bing's IndexNow API with every URL from the just-built sitemap, so
// Bing (and anything else that watches IndexNow, e.g. some AI crawlers)
// picks up new/changed pages without waiting for its own crawl schedule.
//
// Run manually after a build, whenever you want to nudge Bing about
// something you just published:
//
//   npm run build
//   npm run indexnow
//
// Not wired into the GitHub Actions deploy — IndexNow is meant for "this
// changed, go look", not "re-submit the whole site on every push", so it's
// a deliberate, occasional step rather than an automatic one.
//
// Same key as vendulasubert.cz's copy of this script (IndexNow allows
// reusing one key across sites you own) — each site still hosts its own
// key file at its own root, since that's what Bing fetches to verify it.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const HOST = 'alefuj.cz';
const KEY = 'c74bb07e7c0d4c87abbc5ef4a68d78e7';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DIST_DIR = new URL('../dist/', import.meta.url);

async function collectSitemapUrls() {
	const entries = await readdir(DIST_DIR);
	const sitemapFiles = entries.filter((name) => /^sitemap-\d+\.xml$/.test(name));
	if (sitemapFiles.length === 0) {
		throw new Error('No dist/sitemap-*.xml found — run `npm run build` first.');
	}
	const urls = [];
	for (const file of sitemapFiles) {
		const xml = await readFile(new URL(file, DIST_DIR), 'utf8');
		for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
			urls.push(match[1]);
		}
	}
	return urls;
}

async function main() {
	if (!existsSync(DIST_DIR)) {
		throw new Error('dist/ not found — run `npm run build` first.');
	}
	const urlList = await collectSitemapUrls();
	console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

	const res = await fetch('https://api.indexnow.org/indexnow', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify({
			host: HOST,
			key: KEY,
			keyLocation: KEY_LOCATION,
			urlList,
		}),
	});

	// IndexNow returns 200 or 202 on success, with an empty body either way.
	if (res.ok) {
		console.log(`IndexNow accepted the submission (HTTP ${res.status}).`);
	} else {
		const body = await res.text().catch(() => '');
		throw new Error(`IndexNow submission failed: HTTP ${res.status} ${res.statusText}\n${body}`);
	}
}

main().catch((err) => {
	console.error(err.message ?? err);
	process.exitCode = 1;
});
