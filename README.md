# alefuj.cz

Marketing/update site for the comic novel **ALEFUJ!** by Vendula Maulerová — bilingual (cs/en), built with [Astro](https://astro.build), hosted on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

**Status: live at `alefuj.cz`.** Publishing pipeline, all sections (Home — with its "O knize" section, Kosťovy verše, Veroničina tvorba, Kosťův horoskop), the bilingual frame, and this README are done. There's no regularly-updated news feed on this site by design (see "What happened to Aktuality" below) — just occasional edits to the sections below as things change.

---

## How to update this site

Written for future-you, having forgotten all of this. There's no regular content type to write anymore (see "What happened to Aktuality" below) — you'll occasionally edit one of the sections listed under "Editing each section", then publish. No terminal, no GitHub Desktop — everything below uses VS Code's built-in panels, plus a browser fallback if you're away from your laptop.

If you get properly stuck, you can also just ask Claude Code (or another AI coding assistant) to do any of this for you — describe what you want in plain language ("update the book-status paragraph to say X") and point it at this repo.

### Publish (go live)

1. Open the **Source Control** panel: click its icon in the Activity Bar, or press `Ctrl+Shift+G`.
2. Under **Changes**, you'll see your new/edited files listed.
3. Hover over the word **Changes** and click the **+** that appears to stage everything (or stage files one at a time).
4. Click into the message box and type a short commit message, e.g. `Aktualizovaný stav knihy`.
5. Click the blue **checkmark (✓)** to commit.
6. Click **Sync Changes** (circular-arrows icon) to push to GitHub. Let it pull first if it offers to.
7. Wait about a minute, then check the **Actions** tab on the repository's GitHub.com page — a workflow run should appear and turn green. Once green, it's live.

That's the whole loop, every time: **write/edit in VS Code → Source Control panel → stage → commit message → checkmark → Sync Changes → wait for the green checkmark on GitHub.**

---

## Publishing from github.com (fallback, no laptop)

**Editing an existing file:** go to the file on github.com, click the pencil (✏️) icon, edit, then scroll down to **Commit changes → Commit directly to the `main` branch**.

**Adding a photo to a Kosťovy verše poem:** navigate into the poem's folder under `src/content/kostovy-verse/`, **Add file → Upload files**, commit.

---

## Bilingual (cs/en)

The site frame (navigation, buttons, the homepage opening/status text, the "O knize" section, credits) is bilingual. **Kosťa's horoscope, Kosťa's verses, and Veronika's poems and songs are Czech-only, on purpose** — their humour and rhymes depend on a register that doesn't survive translation. Visitors on `/en/` see a short note explaining that, then the original Czech content below it, rather than a machine translation or a missing page. Don't add English versions of these three collections; there's nothing to add them *to* — the schemas don't have a `lang` field.

`/` redirects visitors to `/cs/` or `/en/` based on their browser language (defaulting to Czech). Everything else always lives under `/cs/...` or `/en/...`.

**UI strings** (nav labels, buttons, the horoscope/verses/tvorba page chrome) live in `src/lib/i18n.ts` — edit the `cs` and `en` objects there directly, no content file needed.

**The homepage opening + current status paragraph**, **the "O knize" section**, and **the credits section**, are the one place ordinary prose is bilingual content rather than a code string — they're markdown files, so you don't need to touch `i18n.ts` to update them:

- `src/content/pages/home/cs/index.md` and `home/en/index.md` — the "Ahoj." opening and the current production-status paragraph. Update the status one every few months as the book moves through production; there's no separate status constant anymore, just these two files.
- `src/content/pages/o-knize/cs/index.md` and `o-knize/en/index.md` — the "O knize" / "About the book" section on the homepage (the plot summary). Changes far less often than the status paragraph.
- `src/content/pages/credits/cs/index.md` and `credits/en/index.md` — the illustrator/editor/cover attribution and the "two Báras" note.

Edit both language files together when you change either — if one is missing, the page automatically falls back to showing the other with a small "only available in [language]" note, so it degrades gracefully rather than breaking, but that's a fallback, not something to rely on.

## What happened to Aktuality

The site used to have an Aktuality section — a reverse-chronological list of short update posts, plus a preview of the latest few on the homepage. It's been removed entirely (not hidden, not archived): no collection, no pages, no nav item. The reasoning: maintaining a regularly-updated news feed takes more upkeep than this site needs, and the homepage's book-status paragraph (`src/content/pages/home/`) already covers what a visitor would want to know. If a "what's new" feed ever comes back, it'd need rebuilding from scratch rather than un-hiding — there's nothing left to restore.

## Editing each section

Here's how each section works when you need to edit it. Kosťův horoskop, Kosťovy verše, and Veroničina tvorba are all Czech-only (see "Bilingual" above) — there's no `lang` field to fill in for any of them.

- **Kosťův horoskop** (`src/content/horoskop/`) — exactly 12 files, one per zodiac sign, forever: `beran.md`, `byk.md`, `blizenci.md`, `rak.md`, `lev.md`, `panna.md`, `vahy.md`, `stir.md`, `strelec.md`, `kozoroh.md`, `vodnar.md`, `ryby.md`. There's no month field and nothing to add — you write each sign once and edit it occasionally if you want. The page works out which sign is "in season" from standard zodiac date ranges, read from the visitor's own device (client-side, no server, no scheduled rebuild), and shows it full-size up top with the other 11 as click-to-expand tiles below. To edit a sign, open its file directly — no template-copying needed since the file already exists. The horoscope text is the markdown body (not a frontmatter field), so the trailing italicized aside (`*...*`) renders as real italics. `excerpt` in the frontmatter is optional — leave it out and the preview tile auto-generates one from the first sentence of the body. If a sign's file is ever deleted, or you set `draft: true` on it, the page treats it as not-yet-written and shows a graceful "still being prepared" message in the featured slot instead of blank or draft text — the other 11 tiles keep working regardless.
- **Kosťovy verše** (`src/content/kostovy-verse/`) — one folder per poem (a "page bundle": the poem's text plus its own images, if any, live together). Copy `src/content/_templates/kostuv-vers/index.md` to add a new one. `productType` (`kapesnik` or `toaletak`) and `status` (`coming-soon`, the only value it supports right now) still exist in the frontmatter and still matter for the data model — they're just not surfaced in the page copy anymore, since the "future Hithit campaign reward" framing was dropped from the visible text. Still no cart, no checkout, no payment logic.
- **Veroničina tvorba** (`src/content/veronicina-tvorba/`) — Veronika's poems and songs together, one flat file per entry, no folder needed. Copy `src/content/_templates/veronicina-tvorba.md`. `typ` must be exactly `basen` or `pisen` — it controls which group (Básně / Písně) the entry is shown under. `youtubeId` is optional (skip it for poems, or for songs not yet recorded) — when present, it's just the ID portion of the YouTube URL (`youtube.com/watch?v=`**`THIS_PART`**). There's no separate Video page anymore; a video belongs next to the song it's for.

## Project structure

```
src/
  content/
    _templates/              ← copy from here, never published (outside every collection's own folder)
      horoskop.md, kostuv-vers/index.md, veronicina-tvorba.md
    horoskop/<sign>.md                  ← exactly 12 files, one per zodiac sign forever, Czech-only
    kostovy-verse/<slug>/index.md       ← Kosťa's poems, page-bundle, Czech-only
    veronicina-tvorba/<slug>.md         ← Veronika's poems + songs, flat file, Czech-only
    pages/<section>/<lang>/index.md     ← bilingual prose: home/{cs,en}, o-knize/{cs,en}, credits/{cs,en}
  content.config.ts          ← typed frontmatter schemas for all four collections
  assets/ilustrace/          ← cover art, house-sketch accents, the 45 hand-drawn vignettes
  lib/
    i18n.ts                  ← UI strings (nav, footer, page chrome) in both languages, MailerLite endpoint
    site.ts                  ← Czech-only display labels (zodiac signs, kapesník/toaleťák)
    pages.ts                 ← loads a `pages` entry with cs/en fallback (never a 404 or empty page)
    horoskop.ts               ← zodiac date-range → featured sign, excerpt auto-generation
  layouts/Layout.astro       ← shared HTML shell: fonts, Header, Footer, OG meta tags
  components/                 ← Header (nav + language toggle), Footer, Newsletter, TranslationNotice, CzechOnlyNotice
  pages/
    index.astro                          ← redirects to /cs/ or /en/ by browser language
    [lang]/index.astro                   ← Home (hero, "O knize" section, read-now cards, newsletter, credits)
    [lang]/kostovy-verse/index.astro     ← Kosťovy verše showcase
    [lang]/veronicina-tvorba/index.astro ← Veroničina tvorba (poems + songs, grouped)
    [lang]/horoskop/index.astro          ← Kosťův horoskop (client-side "in season" sign, expandable tiles for the rest)
.github/workflows/deploy.yml  ← builds and deploys to GitHub Pages on push to main
```

"O knize" isn't its own route — it's a `<section id="o-knize">` on the homepage. The header's nav link to it is a full-path anchor (`/cs/#o-knize`, not just `#o-knize`), so it works correctly when clicked from any other page, not just when already on the homepage.

### The newsletter endpoint

The footer (and homepage) signup form (`src/components/Newsletter.astro`) posts straight to a list on MailerLite — `MAILERLITE_ALEFUJ_FORM_ENDPOINT` in `src/lib/i18n.ts` (a different provider/account from vendulasubert.cz's Ecomail newsletter). It's a plain HTML form POST, no JavaScript embed or tracking script from MailerLite. The form's `target` is a same-page hidden `<iframe>` rather than a new tab, so the visitor never leaves the page; a small vanilla-JS snippet in the same component swaps the form for a "check your email" message once that iframe finishes loading. That swap fires on the iframe *loading*, not on a confirmed-accepted response (can't be read cross-origin), so a genuinely malformed submission would still show success — an accepted tradeoff for a simple signup form. If the form ever needs to move to a different MailerLite list or account, `MAILERLITE_ALEFUJ_FORM_ENDPOINT` is the one constant to update.

The on-page copy (`i18n.ts` → `footer.newsletterHeading` / `newsletterBody`) frames this as a low-frequency, campaign-only list ("email me when the Hithit campaign launches"), not a general newsletter — the list itself is still internally named `alefuj-novinky` in the MailerLite dashboard, a naming mismatch worth cleaning up there if it ever gets confusing (doesn't affect anything on the site either way).

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. In the repository's **Settings → Pages**, the source must be set to **GitHub Actions** (not "Deploy from a branch") for this to work.

### Custom domain

The site is served from the root of `alefuj.cz`, not a GitHub Pages project subpath — `astro.config.mjs` has no `base` set, and `site` is `'https://alefuj.cz'`. `public/CNAME` (containing just `alefuj.cz`) is copied verbatim into every build so GitHub Pages knows which domain to serve; the repository's **Settings → Pages → Custom domain** is also set to `alefuj.cz`, which is where the HTTPS certificate lives. If the domain is ever changed, update both places, plus `site` in `astro.config.mjs`.

Only `alefuj.cz` is in scope for now — no `.com` registration yet (that's a future defensive-registration decision, not a technical one).
