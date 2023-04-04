import RoutesMain from "./RoutesMain";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/Components/css/style.scss";
import "../src/Components/css/athletestyle.scss";
import "../src/Components/css/coach.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import { RoleStore } from "./contexts/roleContext";

export default function App() {
	return (
		<>
			<RoleStore>
				<ToastContainer autoClose={1000} theme="dark" position="bottom-left" />
				<RoutesMain />
			</RoleStore>
		</>
	);
}
