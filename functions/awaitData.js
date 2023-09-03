export default function awaitData() {
	return new Promise((resolve) => {
		const stdin = process.stdin;

		stdin.setRawMode(true);

		stdin.resume();

		stdin.setEncoding('utf8');

		stdin.on('data', key => {
			if (key === '\u0003') {
			  process.exit();
			}

			// remove all event listeners to prevent memory leaks
			stdin.removeAllListeners();

			resolve(key);
		});
	});
}