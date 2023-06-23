declare const sGLOBAL: string; // global.css
declare const sSELECTOR: string; // selector.css
declare const sCOPYRIGHT: string; // copyright.css
declare const sHAMBURGER: string; // hamburger.css

const applyStyles = async (el: DocumentOrShadowRoot, cssText: string) => {
	if (!el) return;
	const styles = new CSSStyleSheet;
	await styles.replace(cssText);
	el.adoptedStyleSheets.push(styles)
};
const hamburger = document.querySelector('menu-top')?.shadowRoot
	.querySelector('menu-top-hamburger')?.shadowRoot;
const copyright = document.querySelector('usos-copyright')?.shadowRoot;

applyStyles(document, sGLOBAL);
applyStyles(hamburger, sHAMBURGER);
applyStyles(copyright, sCOPYRIGHT);
for (const el of document.querySelectorAll('usos-selector'))
	applyStyles(el.shadowRoot, sSELECTOR);

type RgbString = `rgb(${number}, ${number}, ${number})`;

const tableColors = {
	'rgb(236, 236, 236)': '#555',
	'rgb(216, 216, 216)': '#444',
	'rgb(238, 238, 221)': '#444',
	'rgb(222, 222, 205)': '#333',
	'rgb(156, 164, 152)': '#222',
	'rgb(255, 255, 255)': '#333',
} satisfies Record<RgbString, string>;
type TableColor = keyof typeof tableColors;

for (const td of document.querySelectorAll('tbody > tr > td, tbody > tr > th') as NodeListOf<HTMLTableCellElement>) {
	const clr = tableColors[td.style.backgroundColor as TableColor];
	if (clr) td.style.backgroundColor = clr;
}