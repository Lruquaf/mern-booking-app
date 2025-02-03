import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import TavernTypesFilter from "../components/TavernTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
	const searchContext = useSearchContext();

	const [page, setPage] = useState<number>(1);
	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
	const [selectedSortOption, setSelectedSortOption] = useState<string>("");

	const searchParams = {
		destination: searchContext.destination,
		chekIn: searchContext.checkIn.toISOString(),
		checkOut: searchContext.checkOut.toISOString(),
		personCount: searchContext.personCount.toString(),
		page: page.toString(),
		stars: selectedStars,
		types: selectedTypes,
		facilities: selectedFacilities,
		maxPrice: selectedPrice?.toString(),
		sortOption: selectedSortOption,
	};

	const { data: tavernData } = useQuery(["searchTaverns", searchParams], () =>
		apiClient.searchTaverns(searchParams)
	);

	const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const starRating = event.target.value;
		setSelectedStars((prevStars) =>
			event.target.checked
				? [...prevStars, starRating]
				: prevStars.filter((star) => star !== starRating)
		);
	};

	const handleTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const tavernType = event.target.value;
		setSelectedTypes((prevTypes) =>
			event.target.checked
				? [...prevTypes, tavernType]
				: prevTypes.filter((type) => type !== tavernType)
		);
	};

	const handleFacilitiesChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const facility = event.target.value;
		setSelectedFacilities((prevFacilities) =>
			event.target.checked
				? [...prevFacilities, facility]
				: prevFacilities.filter((faci) => faci !== facility)
		);
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
			<div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
				<div className="space-y-5">
					<h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
						Filter By:
					</h3>
					<StarRatingFilter
						selectedStars={selectedStars}
						onChange={handleStarsChange}
					/>
					<TavernTypesFilter
						selectedTypes={selectedTypes}
						onChange={handleTypesChange}
					/>
					<FacilitiesFilter
						selectedFacilities={selectedFacilities}
						onChange={handleFacilitiesChange}
					/>
					<PriceFilter
						selectedPrice={selectedPrice}
						onChange={(value?: number) => setSelectedPrice(value)}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<span className="text-xl font-bold">
						{tavernData?.pagination.total} taverns found
						{searchContext.destination
							? ` in ${searchContext.destination}`
							: ""}
					</span>
					{/* TODO: Sort Options */}
					<select
						className="p-2 border rounded-md"
						value={selectedSortOption}
						onChange={(event) =>
							setSelectedSortOption(event.target.value)
						}
					>
						<option value="">Sort by</option>
						<option value="starRating">Star Rating</option>
						<option value="pricePerNightAsc">
							Price per Night (low to high)
						</option>
						<option value="pricePerNightDesc">
							Price per Night (high to low)
						</option>
					</select>
				</div>
				{tavernData?.data.map((tavern) => (
					<SearchResultsCard tavern={tavern} />
				))}
				<div>
					<Pagination
						page={tavernData?.pagination.page || 1}
						pages={tavernData?.pagination.pages || 1}
						onPageChange={(page) => setPage(page)}
					></Pagination>
				</div>
			</div>
		</div>
	);
};

export default Search;
