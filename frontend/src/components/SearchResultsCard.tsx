import { Link } from "react-router-dom";
import { TavernType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
	tavern: TavernType;
};

const SearchResultsCard = ({ tavern }: Props) => {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg gap-8 p-4">
			<div className="w-full h-full">
				<img
					src={tavern.imageUrls[0]}
					className="w-full h-full object-cover object-center"
				/>
			</div>
			<div className="grid grid-rows-[1fr_2fr_1fr]">
				<div>
					<div className="flex items-center">
						<span className="flex">
							{Array.from({ length: tavern.starRating }).map(
								() => (
									<AiFillStar className="fill-yellow-400" />
								)
							)}
						</span>
						<span className="ml-1 text-sm"> {tavern.type} </span>
					</div>
					<div>
						<Link
							to={`/detail/${tavern._id}`}
							className="text-2xl font-bold cursor-pointer"
						>
							{tavern.name}
						</Link>
					</div>
				</div>
				<div>
					<div className="line-clamp-4">{tavern.description}</div>
				</div>
				<div className="grid grid-cols-2 items-end whitespace-nowrap">
					<div className="flex gap-1 items-center">
						{tavern.facilities.slice(0, 2).map((facility) => (
							<span className="bg-slate-300 p-2 rounded-lg font-semibold text-xs whitespace-nowrap">
								{facility}
							</span>
						))}
						<span className="text-sm">
							{tavern.facilities.length > 2 &&
								`+${tavern.facilities.length - 2} more`}
						</span>
					</div>
					<div className="flex flex-col items-end gap-1">
						<span className="font-semibold">
							{tavern.pricePerNight} denar (per night)
						</span>
						<Link
							to={`/detail/${tavern._id}`}
							className="bg-blue-700 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-300 rounded"
						>
							View Details
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchResultsCard;
