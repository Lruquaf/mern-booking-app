import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
	const { isLoggedIn } = useAppContext();
	return (
		<div className="bg-blue-900 py-5">
			<div className="container mx-auto flex justify-between">
				<span className="text-5xl text-white font-bold tracking-tight">
					<Link to="/">MedievalHolidays.com</Link>
				</span>
				{isLoggedIn ? (
					<div className="flex justify-between">
						<span>
							<Link
								to="/my-bookings"
								className="flex items-center text-white px-3 font-bold hover:bg-slate-500 rounded"
							>
								My Bookings
							</Link>
						</span>
						<span>
							<Link
								to="/my-taverns"
								className="flex items-center text-white px-3 font-bold hover:bg-slate-500 rounded"
							>
								My Taverns
							</Link>
						</span>
						<LogoutButton />
					</div>
				) : (
					<span className="flex space-x-2">
						<Link
							to="/login"
							className="flex items-center bg-slate-50 text-blue-400 px-3 font-bold hover:bg-slate-500"
						>
							Login
						</Link>
					</span>
				)}
			</div>
		</div>
	);
};

export default Header;
