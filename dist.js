// ==UserScript==
// @name         USOS dark mode
// @namespace    https://greasyfork.org/en/users/901750-gooseob
// @version      1.7.1
// @description  dark mode of USOS
// @author       GooseOb
// @license      MIT
// @match        https://usosweb.uni.lodz.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=usosweb.uni.lodz.pl
// @grant        none
// ==/UserScript==

(function(){// index.ts
var applyStyles = (el, cssText) => {
  if (!el)
    return;
  const styles = new CSSStyleSheet;
  styles.replace(cssText).then(() => {
    el.adoptedStyleSheets.push(styles);
  });
};
var applyStylesForEach = (selector, styles) => {
  for (const el of document.querySelectorAll(selector))
    applyStyles(el.shadowRoot, styles);
};
var getShadowRoot = (selector, parent = document) => parent.querySelector(selector)?.shadowRoot;
applyStyles(document, ":root { --font-color-reverse: #000; --background-reverse: #ccc; --background: #222; --background-secondary: #333; --font-color: #fff; --grey: #999; } html, main-panel, #uwb-main-column .uwb-white-content, .ua-tooltip.ua-tooltip-badge .tooltipster-box, .ua-tooltip.ua-tooltip-default .tooltipster-box, .uwb-sidepanel, .wrtext table.grey > * > :is(tr.even, tr.strong) > td, .usos-ui table.grey > * > tr > td, .usos-ui table.wrnav tr.even_row td { background-color: var(--background); color: #fff } .well, .sticky-element, .panel { background: #222; } body, usos-module-link-tile, .panel select, .panel input, .panel-heading.panel-heading { background-image: none; background: #111; color: #fff } #footer-logo, #search_logo, .radio { filter: contrast(0.5); } usos-module-link-tile:hover, #uwb-side-column, .wrtext table.grey > * > tr > td, .usos-ui table.grey > * > :is(tr.even, tr.strong) > td, .usos-ui table.grey > *.autostrong > tr:nth-child(odd) > td, .usos-ui table.wrnav tr.odd_row td { background-color: var(--background-secondary); } .schedimg { filter: invert(1); } .usos-ui :is(input[type=");
applyStyles(getShadowRoot("menu-top-hamburger", getShadowRoot("menu-top")), "#hamburger { filter: invert(1); }");
applyStyles(getShadowRoot("usos-copyright"), "#layoutCopyright { color: #fff; }");
applyStylesForEach("usos-selector", "input { background-color: #000; }");
applyStyles(getShadowRoot("usos-timetable"), "#timetable { --timetable-color-6: #222; }");
applyStylesForEach("timetable-day", ":host { background: black; }");
var tableColors = {
  "rgb(236, 236, 236)": "#555",
  "rgb(216, 216, 216)": "#444",
  "rgb(238, 238, 221)": "#444",
  "rgb(222, 222, 205)": "#333",
  "rgb(156, 164, 152)": "#222",
  "rgb(255, 255, 255)": "#333"
};
setTimeout(() => {
  for (const td of document.querySelectorAll("tbody > tr > td, tbody > tr > th"))
    td.style.backgroundColor = tableColors[td.style.backgroundColor] || "#000";
}, 100);
})()