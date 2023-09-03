import Router from './Router.js';
import clearWindow from './functions/clearWindow.js';
import hideCursor from './functions/hideCursor.js';
import ParseMath from './parsemath.js';

let params = {
	width: process.stdout.columns,
	height: process.stdout.rows,

	currentPage: 'Welcome',
	previousPage: null,

	version: {
		name: "v0.1 Alpha α"
	}
}

hideCursor();

const updateParams = newParams => {
	params = newParams;

	Router(newParams, updateParams);
}

updateParams(params);