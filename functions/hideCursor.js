import write from "./write";

export default function hideCursor() {
	write('\x1b[?25l');
}