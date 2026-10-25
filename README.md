# Research group page

A small static website. No installation needed.

## Files

| File | What it is | Who edits it |
|---|---|---|
| `data.js` | All content: papers, members, updates, group name | Everyone in the group |
| `images/` | Member photos | Everyone in the group |
| `index.html`, `style.css`, `script.js` | Design and layout | Usually nobody |

## Add a new ongoing paper

Open `data.js`, find the `papers:` list, and copy this block into it:

```js
{
  type: "ongoing",
  title: "Paper title",
  status: "Writing",
  description: "One or two general lines. No methods or results before publication.",
  authors: ["Md. Iqbal Bahar Chowdhury", "Member name", "Member name"],
  links: []
},
```

Keep the comma after the closing `}`.

## Move a paper to "Published"

Change `type: "ongoing"` to `type: "published"`, delete the `status` and `description` lines, and add:

```js
venue: "Journal or conference name",
pages: "pp. 1-4",
year: 2027,
links: [{ label: "DOI", url: "https://doi.org/..." }]
```

## Add a member

Add a block to the `members:` list:

```js
{ name: "Full name", role: "Research student", interest: "One line about their research", photo: "full-name.jpg" },
```

Put the photo in the `images/` folder first (square photos look best). If `photo` is empty or the file is missing, initials are shown instead.

## Add an update

Add a line at the top of `updates:` (newest first):

```js
{ date: "2027-01-15", text: "Paper accepted at ..." },
```

## Hide something without deleting it

Add `hidden: true` inside its block. This only hides it on the page; it is still readable in `data.js`, so never keep private information there.

## Rules

- Write only what is fine to show publicly. For ongoing work: a title and one or two general lines.
- Change `lastUpdated` at the top of `data.js` when you make an edit.
- Keep the quotes, commas and brackets exactly as in the examples. A missing comma stops the whole page from loading, so check the page after every edit.

## Publishing on GitHub Pages

1. Put all these files in a GitHub repository (the files must be at the top level, with `index.html` first).
2. Repository **Settings → Pages**, choose the `main` branch and the `/ (root)` folder, then save.
3. The page appears at `https://<account>.github.io/<repository>/` after a minute or two.
4. If the university later gives a domain, add it under **Settings → Pages → Custom domain**. The files do not change.

## Custom domain (when the university gives one)

1. Ask the university IT office for a subdomain with a **CNAME record** pointing to `<github-account>.github.io`.
2. **Settings → Pages → Custom domain**: enter the subdomain, save, then tick **Enforce HTTPS**.
3. A file named `CNAME` appears in the repository. Do not delete or edit it.

## Top section options

Under `group` in `data.js` (all off by default):

- `showWhere: true` shows the department and university line above the title.
- `heroImage: "group-photo.jpg"` shows a photo (put it in `images/`) at the top right. Add `heroAlt` and `heroCaption` if you like.
- `showDiagram: true` shows a quantum-well band-diagram drawing instead (only if no `heroImage` is set).
