/*
  ============================================================
  এই file-টাই পুরো page-এর content। Design (style.css / script.js) ছোঁয়ার দরকার নেই।
  This file is the only thing group members need to edit.

  Rules:
  - This repository is public. Only write things that are fine to show publicly.
    For ongoing work, keep it to a title and 1-2 general lines (no methods, no results).
  - Do not write personal phone numbers or personal email addresses.
  - Keep the commas, quotes and brackets exactly as in the examples.
    One missing comma can blank the whole page, so check the page after every edit.
  - A photo is optional: put the picture in the "images" folder and
    write its file name, e.g. photo: "rahim.jpg". Without a photo, initials are shown.
  - Lines that start with // are notes or ready-made templates. To use a template,
    copy it above the "// ---" line, then delete the // at the start of each line.
  - "hidden: true" only hides an entry on the page. It stays readable in this file,
    so never put private information here.
  ============================================================
*/
window.SITE = {

  // Last time this file was updated (YYYY-MM-DD). Shown in the footer.
  lastUpdated: "2026-10-25",

  group: {
    name: "Research Group",   // change when the group name is decided, e.g. "Semiconductor Devices Research Group"
    tagline: "Ongoing and published research from the Department of Electrical and Electronic Engineering.",
    interests: [
      // "Topic one",
      // "Topic two"
    ],
    // Optional, all off for now. Turn on when needed:
    showWhere: false,         // true = show "Department..., University" above the title
    showDiagram: false,       // true = show the band-diagram drawing at the top right
    heroImage: "",            // e.g. "group-photo.jpg" (file inside images/) shows a photo at the top right
    heroAlt: "",              // short description of the photo, for screen readers
    heroCaption: ""           // optional caption under the photo
  },

  pi: {
    name: "Dr. Md. Iqbal Bahar Chowdhury",
    authorName: "Md. Iqbal Bahar Chowdhury",   // spelling used in author lists, so it can be highlighted
    title: "Professor",
    department: "Department of Electrical and Electronic Engineering",
    university: "United International University",
    email: "iqbal@eee.uiu.ac.bd",
    photo: ""                                  // e.g. "iqbal-bahar.jpg" (file inside the images folder)
  },

  // Group members (the supervisor is added automatically at the top).
  members: [
    // Template - copy above this line and remove the //
    // { name: "Full name", role: "Research student", interest: "One line about their research interest", photo: "full-name.jpg" },
  ],

  // type: "ongoing" or "published"
  // status (ongoing only): e.g. "Data collection", "Writing", "Under review"
  papers: [

    // ---------- Ongoing ----------
    // Template - copy above this line and remove the //
    // {
    //   type: "ongoing",
    //   title: "Paper title",
    //   status: "Writing",
    //   description: "One or two general lines about the topic. No methods or results before publication.",
    //   authors: ["Md. Iqbal Bahar Chowdhury", "Member name", "Member name"],
    //   links: []
    // },
{
  type: "ongoing",
  title: "A 1-V Ultra-Low-Power Recycling Current-Reuse OTA for Wearable Analog Front-End Applications",
  status: "Writing",
  description: "Low-voltage, low-power analog circuit design for wearable front-end applications.",
  authors: ["Md. Iqbal Bahar Chowdhury", "Author name", "Author name"],
  links: []
},
    // ---------- Published ----------
    // Template - copy above this line and remove the //
    // {
    //   type: "published",
    //   title: "Paper title",
    //   venue: "Journal or conference name",
    //   pages: "pp. 1-4",
    //   year: 2027,
    //   authors: ["Md. Iqbal Bahar Chowdhury", "Member name", "Member name"],
    //   links: [{ label: "DOI", url: "https://doi.org/..." }]
    // },
  ],

  // Newest first. date: YYYY-MM-DD
  updates: [
    { date: "2026-10-25", text: "Group page launched." }
  ]
};
