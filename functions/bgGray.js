// adds a gray background to the text
export default function bgGray(text) {
	return "\x1b[100m" + text + "\x1b[0m";
}