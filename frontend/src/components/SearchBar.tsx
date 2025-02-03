import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const navigate = useNavigate();
	const searchContext = useSearchContext();

	const [destination, setDestination] = useState<string>(
		searchContext.destination
	);
	const [checkIn, setCheckIn] = useState<Date>(searchContext.checkIn);
	const [checkOut, setCheckOut] = useState<Date>(searchContext.checkOut);
	const [personCount, setPersonCount] = useState<number>(
		searchContext.personCount
	);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		searchContext.saveSearchValues(
			destination,
			checkIn,
			checkOut,
			personCount
		);
		navigate("/search");
	};

	const handleClear = () => {
		setDestination("");
		setCheckIn(new Date());
		setCheckOut(new Date());
		setPersonCount(1);
	};

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	return (
		<form
			onSubmit={handleSubmit}
			className="-mt-3 p-3 bg-blue-950 rounded shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center"
		>
			{/* Destination Input */}
			<div className="flex flex-row w-full lg:w-72 items-center rounded bg-blue-100 p-2">
				<MdTravelExplore size={25} className="mr-2" />
				<input
					placeholder="Next stop of the campaign?"
					className="text-md w-full focus:outline-none bg-blue-100"
					value={destination}
					onChange={(event) => setDestination(event.target.value)}
				/>
			</div>

			{/* People Count Input */}
			<div className="flex rounded bg-blue-100 p-2">
				<label className="flex items-center">
					People:
					<input
						className="ml-2 text-center w-12 focus:outline-none font-bold bg-blue-100"
						type="number"
						min={1}
						max={20}
						value={personCount}
						onChange={(event) =>
							setPersonCount(parseInt(event.target.value))
						}
					/>
				</label>
			</div>

			{/* Date Inputs */}
			<div className="flex w-full">
				<DatePicker
					selected={checkIn}
					onChange={(date) => setCheckIn(date as Date)}
					selectsStart
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					placeholderText="Check-in Date"
					className="w-full rounded bg-blue-100 p-2 focus:outline-none"
				/>
			</div>
			<div className="flex w-full">
				<DatePicker
					selected={checkOut}
					onChange={(date) => setCheckOut(date as Date)}
					selectsEnd
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					placeholderText="Check-out Date"
					className="w-full rounded bg-blue-100 p-2 focus:outline-none"
				/>
			</div>

			{/* Buttons */}
			<div className="flex gap-2 w-full lg:w-60">
				<button
					type="submit"
					className="flex-grow bg-green-800 text-white p-2 font-bold text-lg rounded-md hover:bg-green-600"
				>
					Search
				</button>
				<button
					type="button"
					onClick={handleClear}
					className="flex-grow bg-orange-800 text-white p-2 font-bold text-lg rounded-md hover:bg-orange-600"
				>
					Clear
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
