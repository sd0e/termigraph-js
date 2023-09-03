import MultiText from "./MultiText";

// renders a top header
export default function Header(params, tip) {
	let previousPages = '[←] ';

	for (let idx = 1; idx < params.pageStack.length - 1; idx++) {
		let tempText = `${params.pageStack[idx]} → `;

		previousPages += tempText;
	}

	MultiText([[previousPages], [`${params.pageStack[params.pageStack.length - 1]}`, "blue"]], 5, 3);

	if (tip) {
		const totalLength = 4 + tip.length;
		MultiText([["TIP ", "white"], [tip]], params.width - totalLength - 5, 3);
	}
}