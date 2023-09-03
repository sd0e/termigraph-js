import awaitData from "./functions/awaitData";
import changePage from "./functions/changePage";
import clearWindow from "./functions/clearWindow";
import Curves from "./pages/Curves";
import Welcome from "./pages/Welcome";
import Home from "./pages/home";

export const Pages = {"Welcome": Welcome, "Home": Home, "Curves": Curves };

export default async function Router(params, updateParams) {
	// clear terminal window whenever called
	clearWindow();

	// render respective page, creating a copy of the params object to prevent rogue changes
	Pages[params.currentPage]({ ...params }, updateParams);
}