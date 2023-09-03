import Header from "../components/Header";
import MultiText from "../components/MultiText";
import Textbox from "../components/Textbox";
import awaitData from "../functions/awaitData";
import goBack from "../functions/goBack";

export default async function Curves(params, updateParams) {
	Header(params, "Press a number and start typing; press escape first before editing a different curve.");

	let curveIdx = 0;
	for (const curve of params.curves) {
		Textbox(curve, (curveIdx + 1).toString(), params.selectedCurve === curveIdx, 5, 5 + curveIdx * 2, "f(x) = ");

		curveIdx++;
	}

	let pageStillHere = true;
	let tempKeypress = null;

	while (pageStillHere) {
		const keypress = await awaitData();
		if (keypress === '\u001b[D') {
			pageStillHere = false;
			tempKeypress = 'back';
		} else if (keypress.charCodeAt(0) === 27) {
			params.selectedCurve = -1;
			pageStillHere = false;
			tempKeypress = 'changedCurve';
		} else {
			if (params.selectedCurve !== -1) {
				if (keypress.charCodeAt(0) === 8) {
					console.log('yes');
					params.curves[params.selectedCurve] = params.curves[params.selectedCurve].substring(0, params.curves[params.selectedCurve].length - 1);
				} else {
					params.curves[params.selectedCurve] += keypress;
				}
				pageStillHere = false;
				tempKeypress = 'changedCurve';
			}

			if (keypress === '1' || keypress === '2' || keypress === '3' || keypress === '4' && params.selectedCurve === -1) {
				params.selectedCurve = params.selectedCurve === -1 ? Number(keypress) - 1 : params.selectedCurve;
				pageStillHere = false;
				tempKeypress = 'changedCurve';
			}
		}
	}
	
	if (tempKeypress === 'back') updateParams(goBack(params));
	if (tempKeypress === 'changedCurve') updateParams(params);
}