import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddTavern from "./pages/AddTavern";
import { useAppContext } from "./contexts/AppContext";
import MyTaverns from "./pages/MyTaverns";
import EditTavern from "./pages/EditTavern";

const App = () => {
	const { isLoggedIn } = useAppContext();
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<p>Home Page</p>
						</Layout>
					}
				/>
				<Route
					path="/search"
					element={
						<Layout>
							<p>Search Page</p>
						</Layout>
					}
				/>
				<Route
					path="/register"
					element={
						<Layout>
							<Register />
						</Layout>
					}
				></Route>
				<Route
					path="/login"
					element={
						<Layout>
							<Login />
						</Layout>
					}
				></Route>
				{isLoggedIn && (
					<>
						<Route
							path="/add-tavern"
							element={
								<Layout>
									<AddTavern />
								</Layout>
							}
						></Route>
					</>
				)}
				{isLoggedIn && (
					<>
						<Route
							path="/my-taverns"
							element={
								<Layout>
									<MyTaverns />
								</Layout>
							}
						></Route>
					</>
				)}
				{isLoggedIn && (
					<>
						<Route
							path="/edit-tavern/:tavernId"
							element={
								<Layout>
									<EditTavern />
								</Layout>
							}
						></Route>
					</>
				)}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Router>
	);
};

export default App;
