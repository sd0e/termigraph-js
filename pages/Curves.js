// a template page
import Header from "../components/Header";
import MultiText from "../components/MultiText";
import awaitData from "../functions/awaitData";
import changePage from '../functions/changePage';

export default async function Curves(params, updateParams) {
	Header(params);

	let pageStillHere = true;
	let tempKeypress = null;

	while (pageStillHere) {
		const keypress = await awaitData();
		if (keypress === '\u001b[D') {
			pageStillHere = false;
			tempKeypress = 'back';
		}
	}
	
	if (tempKeypress === 'back') updateParams(changePage(params.previousPage, params));
}