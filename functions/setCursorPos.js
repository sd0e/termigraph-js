import write from "./write";

export default function setCursorPos(x, y) {
	write(`\x1b[${y};${x}H`);
}