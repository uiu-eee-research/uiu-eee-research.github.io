# Research group page

A small static website for the group's ongoing and published research, hosted on GitHub Pages.
No installation, no build step. **All content lives in one file: `data.js`.**

> সংক্ষেপে: শুধু `data.js` edit করবেন। Design file (`index.html`, `style.css`, `script.js`) ছোঁবেন না।

## Files

| File / folder | What it is | Who edits it |
|---|---|---|
| `data.js` | All content: group info, supervisor, members, papers | Everyone in the group |
| `images/` | Photos (supervisor and members) | Everyone in the group |
| `index.html`, `style.css`, `script.js` | Design and layout | Usually nobody |
| `README.md` | This guide | Anyone |

## How to make an edit (on GitHub, no software needed)

1. Open the repository, click **`data.js`**, then click the pencil icon (✏️).
2. Find your section. `data.js` has big `=====` banners:
   **1. GROUP**, **2. SUPERVISOR**, **3. MEMBERS**, **4A. ONGOING PAPERS**, **4B. PUBLISHED PAPERS**.
3. Copy the **template** at the bottom of that section, paste it **just above the template**, and delete the `//` at the start of each pasted line. Keep the comma `,` after the closing `}`.
4. Change `lastUpdated` at the top to today's date (`"YYYY-MM-DD"`).
5. Click **Commit changes**. If the repository has approval rules turned on, choose **Create a new branch and start a pull request**; an admin will review and merge it.
6. Wait 1-2 minutes, open the page, and check that it still loads. Press **Ctrl + F5** if you still see the old version.

## Recipes

### Add an ongoing paper (section 4A)

```js
{
  type: "ongoing",
  title: "Paper title",
  status: "Writing",
  description: "One or two general lines about the topic. No methods or results before publication.",
  authors: ["Md. Iqbal Bahar Chowdhury", "Member name", "Member name"],
  links: []
},
```

- Required: `type`, `title`. Everything else may be left empty (`""` or `[]`).
- `status` examples: `"Data collection"`, `"Writing"`, `"Under review"`.
- Write authors in the order shown on the paper. Use Sir's name exactly as `"Md. Iqbal Bahar Chowdhury"` so it is highlighted.

### Move a paper to Published when it is published

Do it in place: change `type: "ongoing"` to `type: "published"`, delete `status` and `description`, and add `venue`, `pages`, `year` (and `links` if you have a DOI or PDF).

### Add a published paper (section 4B)

```js
{
  type: "published",
  title: "Paper title",
  venue: "Journal or conference name",
  pages: "pp. 1-4",
  year: 2027,
  authors: ["Md. Iqbal Bahar Chowdhury", "Member name", "Member name"],
  links: [{ label: "DOI", url: "https://doi.org/..." }]
},
```

- Required: `type`, `title`, `year` (without a year the paper is listed in the wrong place).
- Published papers are grouped by year, newest first, automatically.
- Links must start with `https://`.

### Add yourself as a member (section 3)

```js
{ name: "Full name", role: "Research student", interest: "One line about your research", photo: "full-name.jpg" },
```

- Required: `name`. `role`, `interest` and `photo` may be `""`.
- Without a photo, your initials are shown.

### Add a photo

1. Prepare a **square** photo (about 400 x 400 px or more), under **500 KB**. Name it in lowercase with no spaces, for example `rahim-hasan.jpg`.
2. On GitHub, open the **`images`** folder, click **Add file → Upload files**, drop the photo, and **Commit changes**.
3. In `data.js`, write the **exact** file name: `photo: "rahim-hasan.jpg"`. Capital and small letters matter (`.JPG` is not `.jpg`).
4. If the photo does not show, your initials are shown instead. That usually means the file name does not match.

Ask the person first before putting their photo on a public page.

### Change the group name or the one-line description (section 1)

Edit `name` and `tagline` under `group`. `showWhere: true` shows the department and university line above the title (off by default). `interests` is an optional list of topics.

### Hide an entry without deleting it

Add `hidden: true` inside its block. This only hides it on the page; it stays readable in `data.js`, so never keep private information there.

## Rules

- **The repository is public.** Write only what is fine to show to everyone. For ongoing work: a title and one or two general lines. No methods, no results.
- No personal phone numbers or personal email addresses.
- Keep the quotes `" "`, commas `,` and brackets `{ } [ ]` exactly as in the examples. One missing comma can stop the page from loading.
- Lines starting with `//` are notes or templates; they do nothing.
- Do not edit `index.html`, `style.css` or `script.js`, and do not delete the `CNAME` file if one appears.

## If the page shows "The page content could not be loaded"

There is a mistake in `data.js`, most often a missing comma, quote or bracket in your last edit.

1. Open `data.js` on GitHub and look at your last edit.
2. Or click **History**, open the previous version, and restore it (or ask an admin to revert the commit).
3. Wait 1-2 minutes and check the page again.

## Publishing on GitHub Pages (admin)

1. Put all these files at the top level of a GitHub repository (`index.html` must be at the top).
2. Repository **Settings → Pages**: choose the `main` branch and the `/ (root)` folder, then save.
3. The page appears at `https://<account>.github.io/<repository>/` after a minute or two.
4. Add group members under **Settings → Collaborators** (or the organization's People page).
5. Optional approval rules: **Settings → Rules (Rulesets)**, require a pull request with one approval before merging into `main`.

## Custom domain (when the university gives one)

1. Ask the university IT office for a subdomain with a **CNAME record** pointing to `<github-account>.github.io`.
2. **Settings → Pages → Custom domain**: enter the subdomain, save, then tick **Enforce HTTPS**.
3. A file named `CNAME` appears in the repository. Do not delete or edit it.
4. Update the link on the supervisor's faculty profile. The page files do not change.
