import Option from "./Option";

export default function OptionList(options, highlighted, x, y) {
	for (let idx = 0; idx < options.length; idx++) {
		const option = options[idx];
		
		Option(option, x, y + idx * 2);
	}
}