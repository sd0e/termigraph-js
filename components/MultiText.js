import Text from "./Text";

export default function MultiText(texts, startX, startY) {
	for (let a = 0; a < texts.length; a++) {
		let text = texts[a];

		const colour = text[1] ? text[1] : "gray";

		if (a === 0) Text(text[0], colour, startX ? startX : 0, startY ? startY : 0)
		else Text(text[0], colour);
	}
}