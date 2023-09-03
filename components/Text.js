import setCursorPos from '../functions/setCursorPos';
import write from '../functions/write';
import addColour from '../functions/addColour';

export default function Text(text, colour, startX, startY) {
	if (startX && startY) setCursorPos(startX, startY);

	if (typeof text !== 'string') text = text.toString();

	write(addColour(text, colour));
}