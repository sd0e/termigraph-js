import Router from './Router.js';
import clearWindow from './functions/clearWindow.js';
import hideCursor from './functions/hideCursor.js';
import ParseMath from './parsemath.js';

let params = {
	width: process.stdout.columns,
	height: process.stdout.rows,

	pageStack: ['Welcome'],

	version: {
		name: "v0.1 Alpha α"
	},

	curves: ["", "", "", ""],
	curveColours: ["red", "green", "yellow", "blue"],
	selectedCurve: -1,

	xStretch: 1,
	yStretch: 1,
	// the factor by which the scroll changes on each press in graph screen
	stretchSensitivity: 2,

	// stretch the x values by a certain amount to take into account the disparity between cell height and width
	defaultXScaleFactor: 2.5,

	// the resolution of plotting points, the lower the higher resolution but also longer plotting time; adapt in graph with "O" and "P" keys
	resolution: 0.05,
}

hideCursor();

const updateParams = newParams => {
	params = newParams;

	Router(newParams, updateParams);
}

updateParams(params);