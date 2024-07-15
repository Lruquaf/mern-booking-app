import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyTaverns = () => {
	const { data: tavernData } = useQuery(
		"fetchMyTaverns",
		apiClient.fetchMyTaverns,
		{ onError: () => {} }
	);
	return (
		<div className="space-y-5">
			<span className="flex justify-between">
				<h1 className="text-3xl font-bold">My Taverns</h1>
				<Link
					to="/add-tavern"
					className="flex bg-blue-600 text-white text-xl font-boldp-2 border rounded p-2 hover:bg-blue-500"
				>
					Add Tavern
				</Link>
			</span>
			<div className="grid grid-cols-1 gap-8">
				{tavernData?.map((tavern) =>
					!tavernData ? (
						<div>No taverns found</div>
					) : (
						<div className="flex flex-col justify-between border border-slate-700 rounded-lg p-5">
							<h2 className="text-2xl font-bold">
								{tavern.name}
							</h2>
							<div className="whitespace-pre-line py-2">
								{tavern.description}
							</div>
							<div className="cols-5 flex gap-2">
								<div className="border border-slate-400 rounded-lg p-2 flex items-center">
									<BsMap className="mr-2" />
									{tavern.city}, {tavern.country}
								</div>
								<div className="border border-slate-400 rounded-lg p-2 flex items-center">
									<BsBuilding className="mr-2" />
									{tavern.type}
								</div>
								<div className="border border-slate-400 rounded-lg p-2 flex items-center">
									<BiMoney className="mr-2" />
									{tavern.pricePerNight} denar (per night)
								</div>
								<div className="border border-slate-400 rounded-lg p-2 flex items-center">
									<BiHotel className="mr-2" />
									Capacity: {tavern.capacity}
								</div>
								<div className="border border-slate-400 rounded-lg p-2 flex items-center">
									<BiStar className="mr-2" />
									{tavern.starRating} Star Rating
								</div>
							</div>
							<span className="flex justify-end">
								<Link
									to={`/edit-tavern/${tavern._id}`}
									className="flex bg-blue-600 text-white text-xl font-boldp-2 border rounded p-2 mt-2 hover:bg-blue-500"
								>
									View Details
								</Link>
							</span>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default MyTaverns;
