import Header from "../components/Header";
import MultiText from "../components/MultiText";
import Text from "../components/Text";
import awaitData from "../functions/awaitData";
import goBack from "../functions/goBack";
import ParseMath from "../parsemath";

export default async function Graph(params, updateParams) {
	Header(params, "Use a and d to stretch in the x-direction, and similarly with w and s.");

	const graphHeight = params.height - 8;
	const graphWidth = params.width - 10;

	const startX = 5;
	const startY = 5;

	const topGraphValue = Math.floor(graphHeight / 2);
	const rightGraphValue = Math.floor(graphWidth / 2) / params.defaultXScaleFactor;

	for (let idx = 0; idx <= graphWidth; idx++) {
		Text('-', 'gray', startX + idx, Math.floor(graphHeight / 2) + startY);
	}

	for (let idx = 0; idx <= graphHeight; idx++) {
		Text('|', 'gray', Math.floor(graphWidth / 2) + startX, startY + idx);
	}

	let curveIdx = 0;
	for (const curve of params.curves) {
		if (curve && curve !== "") {
			let xPointer = startX;
			for (let idx = -rightGraphValue; idx <= rightGraphValue; idx += params.resolution) {
				let value

				try {
					value = ParseMath(curve, false, { "x": idx * params.xStretch, "y": idx / params.yStretch }) * params.yStretch;
					const valuePositionY = startY + (topGraphValue - value);
	
					if (value <= topGraphValue && value >= -1 * topGraphValue) Text('*', params.curveColours[curveIdx], Math.round(xPointer), Math.round(valuePositionY));
	
					xPointer += params.defaultXScaleFactor * params.resolution;
				} catch {
					
				}
			}
		}
		curveIdx++;
	}

	Text((((-1 * rightGraphValue) * params.xStretch)).toFixed(2).toString(), "white", startX, startY + topGraphValue);

	const posXValue = (((rightGraphValue) * params.xStretch)).toFixed(2).toString();
	Text(posXValue, "white", params.width - 4 - posXValue.length, startY + topGraphValue);
	
	Text((((topGraphValue) / params.yStretch)).toFixed(2).toString(), "white", startX + Math.floor(graphWidth / 2), startY);
	Text((((-1 * topGraphValue) / params.yStretch)).toFixed(2).toString(), "white", startX + Math.floor(graphWidth / 2), startY + graphHeight);

	let pageStillHere = true;
	let tempKeypress = null;

	while (pageStillHere) {
		const keypress = await awaitData();
		if (keypress === '\u001b[D') {
			pageStillHere = false;
			tempKeypress = 'back';
		} else if (['w', 'a', 's', 'd', 'o', 'p'].includes(keypress)) {
			if (keypress === 'w') params.yStretch = params.yStretch * params.stretchSensitivity;
			if (keypress === 's') params.yStretch = params.yStretch / params.stretchSensitivity;
			if (keypress === 'a') params.xStretch = params.xStretch * params.stretchSensitivity;
			if (keypress === 'd') params.xStretch = params.xStretch / params.stretchSensitivity;
			if (keypress === 'o') params.resolution *= 1.1;
			if (keypress === 'p') params.resolution /= 1.1;
			pageStillHere = false;
			tempKeypress = 'update';
		}
	}
	
	if (tempKeypress === 'back') updateParams(goBack(params));
	if (tempKeypress === 'update') updateParams(params);
}