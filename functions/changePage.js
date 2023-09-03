// takes a parameters list and updates the page
export default function changePage(newPage, params) {
	let copiedParams = { ...params }

	copiedParams.previousPage = copiedParams.currentPage;
	copiedParams.currentPage = newPage;

	return copiedParams;
}