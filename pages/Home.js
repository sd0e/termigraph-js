// a template page
import ChangePageText from "../components/ChangePageText";
import Header from "../components/Header";
import MultiText from "../components/MultiText";
import OptionList from "../components/OptionList";
import awaitData from "../functions/awaitData";
import changePage from '../functions/changePage';
import goBack from '../functions/goBack';

export default async function Home(params, updateParams) {
	const options = [
		ChangePageText("C", "Add curve"),
		ChangePageText("V", "View graph")
	];

	Header(params);

	OptionList(options, "", 5, 5);

	let pageStillHere = true;
	let tempKeypress = null;

	while (pageStillHere) {
		const keypress = await awaitData();
		if (keypress === '\u001b[D') {
			pageStillHere = false;
			tempKeypress = 'back';
		} else if (keypress.toLowerCase() === 'c') {
			pageStillHere = false;
			tempKeypress = 'c';
		} else if (keypress.toLowerCase() === 'v') {
			pageStillHere = false;
			tempKeypress = 'v';
		}
	}
	
	if (tempKeypress === 'back') updateParams(goBack(params));
	if (tempKeypress === 'c') updateParams(changePage("Curves", params));
	if (tempKeypress === 'v') updateParams(changePage("Graph", params));
}