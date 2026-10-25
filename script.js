/* Builds the page from data.js. Group members do not need to edit this file. */
(function () {
  "use strict";

  var D = window.SITE;
  if (!D) { return; }

  var $ = function (sel) { return document.querySelector(sel); };

  // Build an element safely. Text is always inserted as text, never as HTML.
  function el(tag, props, children) {
    var node = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      if (k === "class") { node.className = props[k]; }
      else if (k === "text") { node.textContent = props[k]; }
      else { node.setAttribute(k, props[k]); }
    });
    (children || []).forEach(function (c) {
      if (c == null) { return; }
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function safeUrl(u) {
    return typeof u === "string" && /^https?:\/\//i.test(u.trim()) ? u.trim() : null;
  }

  function visible(x) { return x && x.hidden !== true; }

  function initials(name) {
    var parts = String(name || "").replace(/^Dr\.?\s+/i, "").split(/\s+/).filter(Boolean);
    if (!parts.length) { return "?"; }
    var first = parts[0].charAt(0);
    var last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
  }

  function avatar(name, photo) {
    var box = el("div", { class: "avatar", "aria-hidden": "true" });
    var fallback = function () { box.textContent = initials(name); };
    if (photo) {
      var img = el("img", { src: "images/" + photo, alt: "", loading: "lazy" });
      img.addEventListener("error", function () { box.textContent = ""; fallback(); });
      box.appendChild(img);
    } else {
      fallback();
    }
    return box;
  }

  function formatDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) { return iso || ""; }
    var d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(d);
  }

  function authorList(authors) {
    var wrap = el("span");
    (authors || []).forEach(function (a, i) {
      if (i > 0) { wrap.appendChild(document.createTextNode(i === authors.length - 1 ? " and " : ", ")); }
      var isPi = a === D.pi.authorName;
      wrap.appendChild(isPi ? el("span", { class: "is-pi", text: a }) : document.createTextNode(a));
    });
    return wrap;
  }

  function links(list, cls) {
    var items = (list || []).map(function (l) {
      var url = safeUrl(l && l.url);
      return url ? el("a", { href: url, target: "_blank", rel: "noopener", text: l.label || "Link" }) : null;
    }).filter(Boolean);
    return items.length ? el("div", { class: cls }, items) : null;
  }

  /* ---------- Hero, brand, title ---------- */
  document.title = D.group.name + " | " + D.pi.university;
  $("#hero-where").textContent = D.pi.department + ", " + D.pi.university;
  $("#hero-title").textContent = D.group.name;
  $("#hero-tagline").textContent = D.group.tagline || "";
  // Optional line in the hero. Off by default.
  if (D.group.showWhere !== true) { $("#hero-where").hidden = true; }
  if (D.group.interests && D.group.interests.length) {
    $("#hero-interests").textContent = "Research interests: " + D.group.interests.join(", ") + ".";
  }
  $("#hero-super").appendChild(document.createTextNode("Supervisor: "));
  $("#hero-super").appendChild(el("strong", { text: D.pi.name }));
  $("#hero-super").appendChild(document.createTextNode(", " + D.pi.title));

  /* ---------- Ongoing research ---------- */
  var ongoing = (D.papers || []).filter(function (p) { return visible(p) && p.type === "ongoing"; });
  var ongoingBox = $("#ongoing-list");
  if (!ongoing.length) {
    ongoingBox.appendChild(el("p", { class: "empty", text: "Ongoing research will be listed here soon." }));
  }
  ongoing.forEach(function (p) {
    ongoingBox.appendChild(el("article", { class: "card" }, [
      p.status ? el("span", { class: "status", text: p.status }) : null,
      el("h3", { text: p.title }),
      p.description ? el("p", { class: "card-desc", text: p.description }) : null,
      links(p.links, "card-links"),
      el("p", { class: "card-authors" }, [authorList(p.authors)])
    ]));
  });

  /* ---------- Published papers, grouped by year ---------- */
  var published = (D.papers || []).filter(function (p) { return visible(p) && p.type === "published"; });
  var pubBox = $("#published-list");
  if (!published.length) {
    pubBox.appendChild(el("p", { class: "empty", text: "The group's first publications will be listed here once they are published." }));
  }
  var years = {};
  published.forEach(function (p) { (years[p.year] = years[p.year] || []).push(p); });
  Object.keys(years).sort(function (a, b) { return b - a; }).forEach(function (y) {
    var list = el("ul", { class: "pub-list" });
    years[y].forEach(function (p) {
      var venue = [p.venue, p.pages].filter(Boolean).join(", ");
      list.appendChild(el("li", {}, [
        el("p", { class: "pub-title", text: p.title }),
        el("p", { class: "pub-authors" }, [authorList(p.authors)]),
        venue ? el("p", { class: "pub-venue", text: venue }) : null,
        links(p.links, "pub-links")
      ]));
    });
    pubBox.appendChild(el("div", { class: "year-group" }, [el("div", { class: "year", text: y }), list]));
  });

  /* ---------- Members ---------- */
  var pi = D.pi;
  $("#pi-card").appendChild(el("div", { class: "pi" }, [
    avatar(pi.name, pi.photo),
    el("div", {}, [
      el("h3", { text: pi.name }),
      el("p", { class: "pi-role", text: pi.title + ", " + pi.department }),
      el("p", {}, [pi.university]),
      pi.email ? el("p", { class: "pi-mail", text: pi.email }) : null
    ])
  ]));

  var memberBox = $("#member-list");
  (D.members || []).filter(visible).forEach(function (m) {
    memberBox.appendChild(el("li", { class: "person" }, [
      avatar(m.name, m.photo),
      el("h3", { text: m.name }),
      m.role ? el("p", { class: "person-role", text: m.role }) : null,
      m.interest ? el("p", { class: "person-interest", text: m.interest }) : null
    ]));
  });

  /* ---------- Updates ---------- */
  var updBox = $("#update-list");
  var updates = (D.updates || []).filter(visible);
  if (!updates.length) {
    updBox.appendChild(el("li", { class: "empty", text: "No updates yet." }));
  }
  updates.forEach(function (u) {
    updBox.appendChild(el("li", {}, [
      el("span", { class: "update-date", text: formatDate(u.date) }),
      el("span", { text: u.text })
    ]));
  });

  /* ---------- Footer ---------- */
  $("#footer-contact").textContent = "Contact: " + pi.name + (pi.email ? ", " + pi.email : "");
  $("#footer-updated").textContent = "Last updated " + formatDate(D.lastUpdated);
  /* ---------- In-page links ----------
     Scroll with JavaScript so the menu and buttons also work inside sandboxed
     previews, where plain #links do nothing. */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href").slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) { return; }
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      try { history.replaceState(null, "", "#" + id); } catch (err) { /* not allowed in some previews */ }
    });
  });

  /* ---------- Section links: always scroll to the section, even inside a preview frame ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) { return; }
    var id = a.getAttribute("href").slice(1);
    var target = id ? document.getElementById(id) : null;
    if (!target) { return; }
    e.preventDefault();
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
    try { history.replaceState(null, "", "#" + id); } catch (err) { /* ignore */ }
  });
})();
