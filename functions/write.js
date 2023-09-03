import ttys from 'ttys';

export default function write(string) {
	const stdout = ttys.stdout;

	stdout.write(string);
}