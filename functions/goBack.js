// goes back one page
export default function goBack(params) {
	let copiedParams = { ...params }

	copiedParams.pageStack.pop();

	return copiedParams;
}