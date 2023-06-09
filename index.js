// ==UserScript==
// @name         USOS dark mode
// @namespace    https://greasyfork.org/en/users/901750-gooseob
// @version      1.4
// @description  dark mode of USOS
// @author       GooseOb
// @license      MIT
// @match        https://usosweb.uni.lodz.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=usosweb.uni.lodz.pl
// @grant        none
// ==/UserScript==

(function(){
const sGLOBAL = `:root {
	--font-color-reverse: #000;
	--background-reverse: #ccc;

	--background: #222;
	--background-secondary: #333;

	--font-color: #fff;

	--grey: #999;
}

html,
main-panel,
#uwb-main-column .uwb-white-content,
.ua-tooltip.ua-tooltip-badge .tooltipster-box,
.ua-tooltip.ua-tooltip-default .tooltipster-box,
.uwb-sidepanel,
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

usos-module-link-tile:hover,
#uwb-side-column,
.wrtext table.grey > * > tr > td,
.usos-ui table.grey > * > :is(tr.even, tr.strong) > td,
.usos-ui table.grey > *.autostrong > tr:nth-child(odd) > td,
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
}

tbody > tr > td:has(div) {
	background-color: var(--background-secondary) !important;
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
const applyStyles = async (el, cssText) => {
	if (!el)
		return;
	const styles = new CSSStyleSheet;
	await styles.replace(cssText);
	el.adoptedStyleSheets.push(styles);
};
const hamburger = document.querySelector('menu-top')?.shadowRoot
	.querySelector('menu-top-hamburger')?.shadowRoot;
const copyright = document.querySelector('usos-copyright')?.shadowRoot;
applyStyles(document, sGLOBAL);
applyStyles(hamburger, sHAMBURGER);
applyStyles(copyright, sCOPYRIGHT);
for (const el of document.querySelectorAll('usos-selector'))
	applyStyles(el.shadowRoot, sSELECTOR);
const tableColors = {
	'rgb(236, 236, 236)': '#555',
	'rgb(216, 216, 216)': '#444',
	'rgb(238, 238, 221)': '#444',
	'rgb(222, 222, 205)': '#333',
	'rgb(156, 164, 152)': '#222',
	'rgb(255, 255, 255)': '#333',
};
for (const td of document.querySelectorAll('tbody > tr > td, tbody > tr > th')) {
	const clr = tableColors[td.style.backgroundColor];
	if (clr)
		td.style.backgroundColor = clr;
}
})();