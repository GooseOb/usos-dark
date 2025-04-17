declare const sGLOBAL: "global.css",
	sSELECTOR: "selector.css",
	sCOPYRIGHT: "copyright.css",
	sHAMBURGER: "hamburger.css",
	sTIMETABLE_DAY: "timetable-day.css",
	sTIMETABLE: "timetable.css",
	sTEXT_FIELD: "text-field.css";

const applyStyles = (el: DocumentOrShadowRoot, cssText: string) => {
	if (el) {
		const styles = new CSSStyleSheet();
		styles.replace(cssText).then(() => {
			el.adoptedStyleSheets.push(styles);
		});
	}
};

const forEachShadowRoot = (
	selector: string,
	callback: (el: ShadowRoot) => void,
) => {
	for (const { shadowRoot } of document.querySelectorAll(selector)) {
		if (shadowRoot) callback(shadowRoot);
	}
};

const applyStylesForEach = (selector: string, styles: string) => {
	forEachShadowRoot(selector, (shadowRoot) => {
		applyStyles(shadowRoot, styles);
	});
};

const getShadowRoot = (selector: string, parent: ParentNode = document) =>
	parent.querySelector(selector)?.shadowRoot;

applyStyles(document, sGLOBAL);

applyStyles(
	getShadowRoot("menu-top-hamburger", getShadowRoot("menu-top")),
	sHAMBURGER,
);

applyStyles(getShadowRoot("usos-copyright"), sCOPYRIGHT);

forEachShadowRoot("usos-selector", (shadowRoot) => {
	applyStyles(shadowRoot, sSELECTOR);
	applyStyles(getShadowRoot("text-field", shadowRoot), sTEXT_FIELD);
});

applyStyles(getShadowRoot("usos-timetable"), sTIMETABLE);
applyStylesForEach("timetable-day", sTIMETABLE_DAY);

type RgbString = `rgb(${number}, ${number}, ${number})`;

const tableColors = {
	"rgb(236, 236, 236)": "#555",
	"rgb(216, 216, 216)": "#444",
	"rgb(238, 238, 221)": "#444",
	"rgb(222, 222, 205)": "#333",
	"rgb(156, 164, 152)": "#222",
	"rgb(255, 255, 255)": "#333",
} satisfies Record<RgbString, string>;
type TableColor = keyof typeof tableColors;

setTimeout(() => {
	for (const td of document.querySelectorAll<HTMLTableCellElement>(
		"tbody > tr > td, tbody > tr > th",
	))
		td.style.backgroundColor =
			tableColors[td.style.backgroundColor as TableColor] || "#000";
}, 100);
