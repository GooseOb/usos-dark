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