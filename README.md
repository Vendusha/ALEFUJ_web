# alefuj.cz

Marketing/update site for the comic novel **ALEFUJ!** by Vendula Maulerová — Czech-only, built with [Astro](https://astro.build), hosted on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`.

**Status: live at `alefuj.cz`.** Publishing pipeline, all six sections (Home, Aktuality, Video, Kosťovy verše, Veroniččiny písně, Kosťův horoskop), and this README are done. Everything visible on the site right now is placeholder text — replace it with the real thing whenever you're ready (see below).

---

## How to update this site

Written for future-you, having forgotten all of this. Three things you'll routinely do: write an Aktualita, add a month to the horoscope, and publish. No terminal, no GitHub Desktop — everything below uses VS Code's built-in panels, plus a browser fallback if you're away from your laptop.

If you get properly stuck, you can also just ask Claude Code (or another AI coding assistant) to do any of this for you — describe what you want in plain language ("add a new Aktualita about X") and point it at this repo.

### 1. Write a new Aktualita (update post)

1. In the **Explorer** panel (top icon in the left-hand Activity Bar), right-click `src/content/aktuality/` → **New Folder**, and name it today's date plus a short slug, e.g. `2026-09-03-nazev-aktuality` (lowercase, hyphens, no spaces or accents — this becomes part of the post's URL).
2. Open `src/content/_templates/aktualita/index.md`, right-click it → **Copy**, then right-click your new folder → **Paste**.
3. Open the pasted `index.md` and fill in `title`, `date`, `summary` between the `---` lines, then write the post body below the second `---` in plain Markdown (`**bold**`, `_italics_`, `[link](https://example.com)`).
4. Optional photo: drag the image file onto that same folder in the Explorer, then reference it in the text as `![Popisek](nazev-obrazku.jpg)` — filename only, no path. To use it as the post's header image instead, add `heroImage: nazev-obrazku.jpg` to the frontmatter.
5. Save (`Ctrl+S`), then publish (see step 3 below).

### 2. Add a new monthly horoscope entry

Horoscope entries don't need scheduling or a script — the page reads the visitor's own device date in the browser and shows whichever month's entry matches. You just need the entry to exist before that month comes around.

1. Open `src/content/_templates/horoskop.md`, copy it.
2. Paste it into `src/content/horoskop/`, then rename the pasted copy to `NN-mesic.md` (two-digit month + Czech month name), e.g. `09-zari.md` for September. The filename is just for you browsing the folder — the page actually goes by the `month:` number inside the file, so double-check that number matches.
3. Fill in all 12 signs under `signs:` — the site refuses to build if any are missing (better a build error than a horoscope that silently skips a sign). Keep Kosťa's voice: ornate, formal Czech, dry self-deprecating irony, connectives like *nýbrž*, *pročež*, *načež*, *neboť*.
4. Save, then publish. You can write and commit a whole year's worth of these in one sitting whenever you have time — nothing needs to happen "on" the month itself.

The horoscope page also shows a small **archive** of every other month you've already written, so old entries never disappear as you add new ones.

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

## The other three sections

These change far less often, so they're not part of the routine loop above, but here's how they work when you do need them:

- **Kosťovy verše** (`src/content/kostovy-verse/`) — one folder per poem, same page-bundle pattern as Aktuality. Copy `src/content/_templates/kostuv-vers/index.md`. `productType` must be exactly `kapesnik` or `toaletak`. `status` should stay `coming-soon` until there's an actual Hithit campaign to link to — that's the only status this field supports right now, on purpose, so nothing here can accidentally look like a working checkout.
- **Veroniččiny písně** (`src/content/veroniccinypisne/`) — one flat file per song, no folder needed. Copy `src/content/_templates/veronicina-pisen.md`. `youtubeId` is just the ID portion of the YouTube URL (`youtube.com/watch?v=`**`THIS_PART`**).
- **Video** — a single embedded video, not a content collection. Set the real YouTube ID in `INTRO_VIDEO_ID_PLACEHOLDER` in `src/lib/site.ts`.

## Project structure

```
src/
  content/
    _templates/              ← copy from here, never published (outside every collection's own folder)
      aktualita/index.md, horoskop.md, kostuv-vers/index.md, veronicina-pisen.md
    aktuality/<date-slug>/index.md      ← update posts, page-bundle (post + its own images)
    horoskop/NN-mesic.md                ← one file per calendar month, `month:` field drives display
    kostovy-verse/<slug>/index.md       ← Kosťa's poems, page-bundle
    veroniccinypisne/<slug>.md          ← Veronika's songs, flat file
  content.config.ts          ← typed frontmatter schemas for all four collections
  assets/ilustrace/          ← cover art, house-sketch accents, the 45 hand-drawn vignettes
  lib/site.ts                ← editable constants: SITE_NAME, BOOK_STATUS, video ID, Ecomail endpoint
  layouts/Layout.astro       ← shared HTML shell: fonts, Header, Footer, OG meta tags
  components/                ← Header, Footer, Newsletter
  pages/
    index.astro                        ← Home
    aktuality/index.astro              ← Aktuality list
    aktuality/[slug].astro             ← a single Aktualita
    video/index.astro                  ← Video
    kostovy-verse/index.astro          ← Kosťovy verše showcase
    veroniccinypisne/index.astro       ← Veroniččiny písně
    horoskop/index.astro               ← Kosťův horoskop (client-side month detection + archive)
.github/workflows/deploy.yml  ← builds and deploys to GitHub Pages on push to main
```

### Site status and the newsletter endpoint

`BOOK_STATUS` in `src/lib/site.ts` is the one-line status shown on the home page ("v redakci" etc.) — update it as the book moves through production, no other file needs touching.

The footer newsletter form (`src/components/Newsletter.astro`) posts to `ECOMAIL_ALEFUJ_FORM_ENDPOINT_PLACEHOLDER` in `src/lib/site.ts` — a placeholder. Once the real "ALEFUJ! novinky" list exists in Ecomail (same account as vendulasubert.cz, separate list), copy its embed code's `<form action="...">` URL in there, and check whether Ecomail's own snippet includes extra hidden fields (list id, signature, redirect) that need copying into the form too.

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
