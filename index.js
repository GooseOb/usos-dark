// ==UserScript==
// @name         USOS dark mode
// @namespace    https://greasyfork.org/en/users/901750-gooseob
// @version      1
// @description  dark mode of USOS
// @author       GooseOb
// @license      MIT
// @match        https://usosweb.uni.lodz.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=usosweb.uni.lodz.pl
// @grant        none
// ==/UserScript==

const sGLOBAL = `:root {
--font-color-reverse: #000;
--background-reverse: #ccc;

--background: #222;
--background-secondary: #333;

--font-color: #fff;
}

html,
main-panel,
.wrtext table.grey > * > :is(tr.even, tr.strong) > td,
.usos-ui table.grey > * > tr > td,
.usos-ui table.wrnav tr.even_row td {
background-color: var(--background);
}

p {
mix-blend-mode: difference;
}

body {
background: #111;
}

#footer-logo, #search_logo, .radio {
filter: contrast(0.5);
}

.wrtext table.grey > * > tr > td,
usos-module-link-tile:hover,
.usos-ui table.wrnav tr.odd_row td {
background-color: var(--background-secondary);
}

usos-module-link-tile {
background-color: #111;
}

.schedimg {
filter: invert(1);
}

.usos-ui :is(input[type="text"], input[type="textbox"], input[type="file"], input[type="email"], input[type="url"], input[type="number"], input[type="date"], textarea, select) {
background-color: #111;
}`;
const sSELECTOR = `input {
background-color: #000;
}`;
const sCOPYRIGHT = `#layoutCopyright {
color: #fff;
}`;
const sHAMBURGER = `#hamburger {
filter: invert(1);
}`;
(function () {
const applyStyles = async (el, cssText) => {
	const styles = new CSSStyleSheet;
	await styles.replace(cssText);
	el.adoptedStyleSheets.push(styles);
};
const hamburger = document.querySelector('menu-top').shadowRoot
	.querySelector('menu-top-hamburger').shadowRoot;
const copyright = document.querySelector('usos-copyright').shadowRoot;
applyStyles(document, sGLOBAL);
applyStyles(hamburger, sHAMBURGER);
applyStyles(copyright, sCOPYRIGHT);
for (const el of document.querySelectorAll('usos-selector'))
	applyStyles(el.shadowRoot, sSELECTOR);
})();
