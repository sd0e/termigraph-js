import bgGray from "../functions/bgGray";
import MultiText from "./MultiText";

export default function Textbox(value, key, selected, x, y, pretext = "") {
	MultiText([[`[${key}] `, selected ? "green": "blue"], [pretext], [selected ? bgGray(value) : value, "white"]], x, y);
}