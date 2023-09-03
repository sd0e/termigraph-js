import MultiText from "./MultiText";

// renders a top header
export default function Header(params) {
	let previousPages = '[←] ';

	for (let idx = 0; idx < params.pageStack.length - 1; idx++) {
		let tempText = `${params.pageStack[idx]} → `;

		previousPages += tempText;
	}

	MultiText([[previousPages], [`${params.pageStack[params.pageStack.length - 1]}`, "blue"]], 5, 3);
}