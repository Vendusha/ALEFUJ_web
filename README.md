# alefuj.cz

Marketing/update site for the comic novel **ALEFUJ!** by Vendula Maulerová — bilingual (cs/en), built with [Astro](https://astro.build), hosted on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

**Status: live at `alefuj.cz`.** Publishing pipeline, all five sections (Home, Aktuality, Kosťovy verše, Veroničina tvorba, Kosťův horoskop), the bilingual frame, and this README are done. Much of the text on the site right now is placeholder — replace it with the real thing whenever you're ready (see below).

---

## How to update this site

Written for future-you, having forgotten all of this. Three things you'll routinely do: write an Aktualita, add a month to the horoscope, and publish. No terminal, no GitHub Desktop — everything below uses VS Code's built-in panels, plus a browser fallback if you're away from your laptop.

If you get properly stuck, you can also just ask Claude Code (or another AI coding assistant) to do any of this for you — describe what you want in plain language ("add a new Aktualita about X") and point it at this repo.

### 1. Write a new Aktualita (update post)

1. In the **Explorer** panel (top icon in the left-hand Activity Bar), right-click `src/content/aktuality/` → **New Folder**, and name it today's date plus a short slug, e.g. `2026-09-03-nazev-aktuality` (lowercase, hyphens, no spaces or accents — this becomes part of the post's URL).
2. Open `src/content/_templates/aktualita/index.md`, right-click it → **Copy**, then right-click your new folder → **Paste**.
3. Open the pasted `index.md` and fill in `title`, `date`, `lang`, `summary` between the `---` lines, then write the post body below the second `---` in plain Markdown (`**bold**`, `_italics_`, `[link](https://example.com)`).
4. Optional photo: drag the image file onto that same folder in the Explorer, then reference it in the text as `![Popisek](nazev-obrazku.jpg)` — filename only, no path. To use it as the post's header image instead, add `heroImage: nazev-obrazku.jpg` to the frontmatter.
5. Save (`Ctrl+S`), then publish (see step 3 below).

**Translating a post:** a translation is a *second, separate* post file, not a second language inside the same file. Do everything above again with `lang: en` (or `lang: cs`) in a new folder, then give **both** files the same `translationKey` value in the frontmatter (anything you like, as long as it's identical in both) — the language toggle in the header will then jump straight between them instead of falling back to the Aktuality list. Not every post needs a translation; an Aktualita with no sibling in the other language just doesn't show up in that language's list.

### 2. Add a new monthly horoscope entry

Horoscope entries don't need scheduling or a script — the page reads the visitor's own device date in the browser and shows whichever month's entry matches. You just need the entry to exist before that month comes around.

1. Open `src/content/_templates/horoskop.md`, copy it.
2. Paste it into `src/content/horoskop/`, then rename the pasted copy to `NN-mesic.md` (two-digit month + Czech month name), e.g. `09-zari.md` for September. The filename is just for you browsing the folder — the page actually goes by the `month:` number inside the file, so double-check that number matches.
3. Fill in all 12 signs under `signs:` — the site refuses to build if any are missing (better a build error than a horoscope that silently skips a sign). Keep Kosťa's voice: ornate, formal Czech, dry self-deprecating irony, connectives like *nýbrž*, *pročež*, *načež*, *neboť*.
4. Save, then publish. You can write and commit a whole year's worth of these in one sitting whenever you have time — nothing needs to happen "on" the month itself.

The horoscope page also shows a small **archive** of every other month you've already written, so old entries never disappear as you add new ones. The horoscope is Czech-only by design (see "Bilingual" below) — there's nothing to translate here, ever.

### 3. Publish (go live)

1. Open the **Source Control** panel: click its icon in the Activity Bar, or press `Ctrl+Shift+G`.
2. Under **Changes**, you'll see your new/edited files listed.
3. Hover over the word **Changes** and click the **+** that appears to stage everything (or stage files one at a time).
4. Click into the message box and type a short commit message, e.g. `Nová aktualita: Název`.
5. Click the blue **checkmark (✓)** to commit.
6. Click **Sync Changes** (circular-arrows icon) to push to GitHub. Let it pull first if it offers to.
7. Wait about a minute, then check the **Actions** tab on the repository's GitHub.com page — a workflow run should appear and turn green. Once green, it's live.

That's the whole loop, every time: **write/edit in VS Code → Source Control panel → stage → commit message → checkmark → Sync Changes → wait for the green checkmark on GitHub.**

---

## Publishing from github.com (fallback, no laptop)

**Editing an existing file:** go to the file on github.com, click the pencil (✏️) icon, edit, then scroll down to **Commit changes → Commit directly to the `main` branch**.

**Creating a new Aktualita or horoscope entry:** navigate into `src/content/aktuality/` or `src/content/horoskop/`, click **Add file → Create new file**, type the new path in one go (e.g. `2026-09-03-nazev-aktuality/index.md` — GitHub creates the folder automatically), paste in the contents of the matching template from `src/content/_templates/`, and commit.

**Adding a photo:** navigate into the post's folder, **Add file → Upload files**, commit.

---

## Bilingual (cs/en)

The site frame (navigation, buttons, dates, the homepage opening/status text, credits, Aktuality posts) is bilingual. **Kosťa's horoscope, Kosťa's verses, and Veronika's poems and songs are Czech-only, on purpose** — their humour and rhymes depend on a register that doesn't survive translation. Visitors on `/en/` see a short note explaining that, then the original Czech content below it, rather than a machine translation or a missing page. Don't add English versions of these three collections; there's nothing to add them *to* — the schemas don't have a `lang` field.

`/` redirects visitors to `/cs/` or `/en/` based on their browser language (defaulting to Czech). Everything else always lives under `/cs/...` or `/en/...`.

**UI strings** (nav labels, buttons, "back to updates" links, the horoscope/verses/tvorba page chrome) live in `src/lib/i18n.ts` — edit the `cs` and `en` objects there directly, no content file needed.

**The homepage opening + current status paragraph**, and **the credits section**, are the one place ordinary prose is bilingual content rather than a code string — they're markdown files, so you don't need to touch `i18n.ts` to update them:

- `src/content/pages/home/cs/index.md` and `home/en/index.md` — the "Ahoj." opening and the current production-status paragraph. Update the status one every few months as the book moves through production; there's no separate status constant anymore, just these two files.
- `src/content/pages/credits/cs/index.md` and `credits/en/index.md` — the illustrator/editor/cover attribution and the "two Báras" note.

Edit both language files together when you change either — if one is missing, the page automatically falls back to showing the other with a small "only available in [language]" note, so it degrades gracefully rather than breaking, but that's a fallback, not something to rely on.

## The other two sections

These change far less often, so they're not part of the routine loop above, but here's how they work when you do need them. Both are Czech-only (see "Bilingual" above) — there's no `lang` field to fill in.

- **Kosťovy verše** (`src/content/kostovy-verse/`) — one folder per poem, same page-bundle pattern as Aktuality. Copy `src/content/_templates/kostuv-vers/index.md`. `productType` must be exactly `kapesnik` or `toaletak`. `status` should stay `coming-soon` until there's an actual Hithit campaign to link to — that's the only status this field supports right now, on purpose, so nothing here can accidentally look like a working checkout.
- **Veroničina tvorba** (`src/content/veronicina-tvorba/`) — Veronika's poems and songs together, one flat file per entry, no folder needed. Copy `src/content/_templates/veronicina-tvorba.md`. `typ` must be exactly `basen` or `pisen` — it controls which group (Básně / Písně) the entry is shown under. `youtubeId` is optional (skip it for poems, or for songs not yet recorded) — when present, it's just the ID portion of the YouTube URL (`youtube.com/watch?v=`**`THIS_PART`**). There's no separate Video page anymore; a video belongs next to the song it's for.

## Project structure

```
src/
  content/
    _templates/              ← copy from here, never published (outside every collection's own folder)
      aktualita/index.md, horoskop.md, kostuv-vers/index.md, veronicina-tvorba.md
    aktuality/<date-slug>/index.md      ← update posts, page-bundle (post + its own images), bilingual
    horoskop/NN-mesic.md                ← one file per calendar month, `month:` field drives display, Czech-only
    kostovy-verse/<slug>/index.md       ← Kosťa's poems, page-bundle, Czech-only
    veronicina-tvorba/<slug>.md         ← Veronika's poems + songs, flat file, Czech-only
    pages/<section>/<lang>/index.md     ← bilingual prose: home/{cs,en}, credits/{cs,en}
  content.config.ts          ← typed frontmatter schemas for all five collections
  assets/ilustrace/          ← cover art, house-sketch accents, the 45 hand-drawn vignettes
  lib/
    i18n.ts                  ← UI strings (nav, footer, page chrome) in both languages, MailerLite endpoint
    site.ts                  ← Czech-only display labels (zodiac signs, months, kapesník/toaleťák)
    pages.ts                 ← loads a `pages` entry with cs/en fallback (never a 404 or empty page)
    aktuality.ts              ← per-language Aktuality queries + translation-sibling lookup
  layouts/Layout.astro       ← shared HTML shell: fonts, Header, Footer, OG meta tags
  components/                 ← Header (nav + language toggle), Footer, Newsletter, TranslationNotice, CzechOnlyNotice
  pages/
    index.astro                          ← redirects to /cs/ or /en/ by browser language
    [lang]/index.astro                   ← Home
    [lang]/aktuality/index.astro         ← Aktuality list
    [lang]/aktuality/[slug].astro        ← a single Aktualita
    [lang]/kostovy-verse/index.astro     ← Kosťovy verše showcase
    [lang]/veronicina-tvorba/index.astro ← Veroničina tvorba (poems + songs, grouped)
    [lang]/horoskop/index.astro          ← Kosťův horoskop (client-side month detection + archive)
.github/workflows/deploy.yml  ← builds and deploys to GitHub Pages on push to main
```

### The newsletter endpoint

The footer (and homepage) newsletter form (`src/components/Newsletter.astro`) posts straight to the "ALEFUJ! novinky" list on MailerLite — `MAILERLITE_ALEFUJ_FORM_ENDPOINT` in `src/lib/i18n.ts` (a different provider/account from vendulasubert.cz's Ecomail newsletter). It's a plain HTML form POST, no JavaScript embed or tracking script from MailerLite. The form's `target` is a same-page hidden `<iframe>` rather than a new tab, so the visitor never leaves the page; a small vanilla-JS snippet in the same component swaps the form for a "check your email" message once that iframe finishes loading. That swap fires on the iframe *loading*, not on a confirmed-accepted response (can't be read cross-origin), so a genuinely malformed submission would still show success — an accepted tradeoff for a simple signup form. If the form ever needs to move to a different MailerLite list or account, `MAILERLITE_ALEFUJ_FORM_ENDPOINT` is the one constant to update.

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
