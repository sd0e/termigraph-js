import Header from "../components/Header";
import MultiText from "../components/MultiText";
import Text from "../components/Text";
import awaitData from "../functions/awaitData";
import goBack from "../functions/goBack";
import ParseMath from "../parsemath";

export default async function Graph(params, updateParams) {
	Header(params, "Use a and d to stretch in the x-direction, and similarly with w and s.", 'B');

	const graphHeight = params.height - 8;
	const graphWidth = params.width - 10;

	const startX = 5;
	const startY = 5;

	const topGraphValue = Math.floor(graphHeight / 2) - params.yTranslate;
	const wholeHeightValue = graphHeight;
	const rightGraphValue = (Math.floor(graphWidth / 2) + params.xTranslate) / params.defaultXScaleFactor;
	const wholeWidthValue = graphWidth / params.defaultXScaleFactor;

	if (topGraphValue > 0 && topGraphValue < wholeHeightValue) for (let idx = 0; idx <= graphWidth; idx++) {
		Text('-', 'gray', startX + idx, topGraphValue + startY);
	}

	for (let idx = 0; idx <= graphHeight; idx++) {
		Text('|', 'gray', (Math.floor(graphWidth / 2) - params.xTranslate) + startX, startY + idx);
	}

	let curveIdx = 0;
	for (const curve of params.curves) {
		if (curve && curve !== "") {
			let xPointer = startX;
			for (let idx = rightGraphValue - wholeWidthValue; idx <= rightGraphValue; idx += params.resolution) {
				let value

				try {
					value = ParseMath(curve, false, { "x": idx * params.xStretch, "y": idx / params.yStretch }) * params.yStretch;
					const valuePositionY = startY + (topGraphValue - value);
	
					if (value <= topGraphValue && value >= topGraphValue - wholeHeightValue) Text('*', params.curveColours[curveIdx], Math.round(xPointer), Math.round(valuePositionY));
	
					xPointer += params.defaultXScaleFactor * params.resolution;
				} catch {
					
				}
			}
		}
		curveIdx++;
	}

	Text((((-1 * rightGraphValue) * params.xStretch)).toFixed(2).toString(), "white", startX, startY + topGraphValue);

	const posXValue = (((-1 * rightGraphValue + wholeWidthValue) * params.xStretch)).toFixed(2).toString();
	Text(posXValue, "white", params.width - 4 - posXValue.length, startY + topGraphValue);
	
	Text((((topGraphValue) / params.yStretch)).toFixed(2).toString(), "white", (Math.floor(graphWidth / 2) - params.xTranslate) + startX, startY);
	Text((((topGraphValue - wholeHeightValue) / params.yStretch)).toFixed(2).toString(), "white", (Math.floor(graphWidth / 2) - params.xTranslate) + startX, startY + graphHeight);

	let pageStillHere = true;
	let tempKeypress = null;

	while (pageStillHere) {
		const keypress = await awaitData();
		if (keypress === 'b') {
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
		} else if (['\u001b[A', '\u001b[B', '\u001b[C', '\u001b[D'].includes(keypress)) {
			if (keypress === '\u001b[D') {
				// left key
				params.xTranslate -= params.translateSensitivity
			} else if (keypress === '\u001b[A') {
				// up key
				params.yTranslate += params.translateSensitivity
			} else if (keypress === '\u001b[C') {
				// right key
				params.xTranslate += params.translateSensitivity
			} else if (keypress === '\u001b[B') {
				// down key
				params.yTranslate -= params.translateSensitivity
			}

			pageStillHere = false;
			tempKeypress = 'update';
		}
	}
	
	if (tempKeypress === 'back') updateParams(goBack(params));
	if (tempKeypress === 'update') updateParams(params);
}