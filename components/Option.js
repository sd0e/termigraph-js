import bgGray from '../functions/bgGray';
import Text from './Text';

export default function Option(text, x, y, isCheckOption = false, isChecked, isHighlighted) {
	if (isCheckOption) {
		const preText = `[${isChecked ? 'x' : ' '}] `;
		text = preText + text;
	}

	if (isHighlighted) text = bgGray(text);
	
	Text(text, "gray", x, y);
}