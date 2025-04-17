declare const sGLOBAL: "global.css",
	sSELECTOR: "selector.css",
	sCOPYRIGHT: "copyright.css",
	sHAMBURGER: "hamburger.css",
	sTIMETABLE_DAY: "timetable-day.css",
	sTIMETABLE: "timetable.css",
	sTEXT_FIELD: "text-field.css",
	sDIALOG: "dialog.css";

const style = (el: DocumentOrShadowRoot, cssText: string) => {
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

const styleEach = (selector: string, styles: string) => {
	forEachShadowRoot(selector, (shadowRoot) => {
		style(shadowRoot, styles);
	});
};

const getShadowRoot = (selector: string, parent: ParentNode = document) =>
	parent.querySelector(selector)?.shadowRoot;

style(document, sGLOBAL);

style(
	getShadowRoot("menu-top-hamburger", getShadowRoot("menu-top")),
	sHAMBURGER,
);

style(getShadowRoot("usos-copyright"), sCOPYRIGHT);

forEachShadowRoot("usos-selector", (shadowRoot) => {
	style(shadowRoot, sSELECTOR);
	style(getShadowRoot("text-field", shadowRoot), sTEXT_FIELD);
});

style(getShadowRoot("usos-timetable"), sTIMETABLE);
styleEach("timetable-day", sTIMETABLE_DAY);

style(getShadowRoot("usos-dialog"), sDIALOG);

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
