import addColour from "../functions/addColour";

export default function ChangePageText(key, text) {
	return addColour(`[${key}] `, "blue", false) + text;
}