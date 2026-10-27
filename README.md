# Personal site

Built with [Zola](https://www.getzola.org) and the [tabi](https://github.com/welpo/tabi) theme, deployed to GitHub Pages. No local tooling needed: push to `main` and GitHub builds and publishes the site.

## Publish it (one time, ~10 minutes)

1. On GitHub, create a new **public** repository named exactly `<your-username>.github.io` (for example `younghjun.github.io`). Leave it empty: no README, no .gitignore.
2. Upload everything in this folder to that repo. Either drag the files onto the repo page in the browser (GitHub's "Add file → Upload files"), or from a terminal:
   ```
   cd this-folder
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
4. Open the **Actions** tab. The "Build and deploy" workflow runs on its own; when it's green, the site is live at `https://<your-username>.github.io`.

If you use a different username than `younghjun`, change `base_url` at the top of `config.toml` first.

## Edit it

| What | Where |
|---|---|
| Home page greeting and intro | `content/_index.md` |
| About page | `content/pages/about.md` |
| Resume page text and "Updated" date | `content/pages/resume.md` |
| The resume PDF itself | replace `static/resume.pdf` |
| Research & Projects page | `content/pages/work.md` |
| Menu, social links, colors | `config.toml` |
| Photos | `static/img/`; the carousel list is at the bottom of `content/_index.md` (`start` = index of the centered photo) |

Pages are Markdown. Edit on GitHub's website or locally; every push to `main` redeploys in about a minute.

## Preview locally (optional)

Install Zola (`brew install zola` on a Mac), then run `zola serve` in this folder and open http://127.0.0.1:1111.

## Theme

`themes/tabi/` is a copy of tabi (main branch, Oct 2026) with its demo content removed. Everything about colors, fonts, and layout is documented at https://welpo.github.io/tabi/blog/mastering-tabi-settings/. To change the accent color, edit `skin` in `config.toml`; the options are the filenames in `themes/tabi/sass/skins/`.
