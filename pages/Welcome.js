import MultiText from "../components/MultiText";
import awaitData from "../functions/awaitData";
import changePage from '../functions/changePage';

export default async function Welcome(params, updateParams) {
	MultiText([["Termigraph ", "white"], [params.version.name]], 5, 3);

	MultiText([["By "], ["sd0e", "green"]], 5, 5);

	MultiText([["Based on the "], ["parsemath", "blue"], [" algorithm"]], 5, 9);

	MultiText([["Press "], ["[A]", "blue"], [" to continue"]], 5, params.height - 3);

	const displayTip = tip => {
		// total length, including tip intro length
		const totalLength = 4 + tip.length;

		MultiText([["TIP ", "white"], ["Press the left arrow to go back on any page."]], params.width - totalLength - 5, params.height - 3);
	}

	displayTip("Press the left arrow to go back on any page.");

	let pageStillHere = true;
	let tempKeypress = null;

	while (pageStillHere) {
		const keypress = await awaitData();
		if (keypress.toLowerCase() === 'a') {
			pageStillHere = false;
			tempKeypress = 'a';
		} else if (keypress === '\u001b[D') {
			pageStillHere = false;
			tempKeypress = 'back';
		}
	}

	if (tempKeypress === 'a') updateParams(changePage('Home', params));
	if (tempKeypress === 'back') updateParams(changePage(params.previousPage, params));
}