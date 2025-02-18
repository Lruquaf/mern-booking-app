import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
	const { tavernId } = useParams();

	const { data: tavern } = useQuery(
		"fetchTavernById",
		() => apiClient.fetchTavernById((tavernId as string) || ""),
		{ enabled: !!tavernId }
	);

	if (!tavern) {
		return <></>;
	}

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<span className="text-3xl font-sans font-bold">
					{tavern.name}
				</span>
				<span className="flex justify-end">
					{Array.from({ length: tavern.starRating }).map(() => (
						<AiFillStar className="fill-yellow-400 text-3xl" />
					))}
				</span>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{tavern.imageUrls.map((image) => (
					<div className="h-[300px]">
						<img
							src={image}
							alt={tavern.name}
							className="rounded-md w-full h-full object-cover object-center"
						/>
					</div>
				))}
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
				{tavern.facilities.map((facility) => (
					<div className="border border-slate-500 hover:bg-slate-50 rounded-lg p-3">
						{facility}
					</div>
				))}
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
				<div className="whitespace-pre-line">{tavern.description}</div>
				<div className="h-fit">
					<GuestInfoForm
						pricePerNight={tavern.pricePerNight}
						tavernId={tavern._id}
					/>
				</div>
			</div>
		</div>
	);
};

export default Detail;
