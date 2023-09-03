import MultiText from "./MultiText";

// renders a top header
export default function Header(params) {
	MultiText([[`[←] ${params.previousPage} → `], [`${params.currentPage}`, "blue"]], 5, 3);
}