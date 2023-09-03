// a template page
import Header from "../components/Header";
import MultiText from "../components/MultiText";
import awaitData from "../functions/awaitData";
import goBack from "../functions/goBack";

export default async function Template(params, updateParams) {
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
	
	if (tempKeypress === 'back') updateParams(goBack(params));
}