import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
	tavernId: string;
	pricePerNight: number;
};

type GuestInfoFormData = {
	checkIn: Date;
	checkOut: Date;
	personCount: number;
};

const GuestInfoForm = ({ tavernId, pricePerNight }: Props) => {
	const search = useSearchContext();
	const { isLoggedIn } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();
	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<GuestInfoFormData>({
		defaultValues: {
			checkIn: search.checkIn,
			checkOut: search.checkOut,
			personCount: search.personCount,
		},
	});

	const onSignInClick = (data: GuestInfoFormData) => {
		search.saveSearchValues(
			"",
			data.checkIn,
			data.checkOut,
			data.personCount
		);
		navigate("/login", { state: { from: location } });
	};

	const onSubmit = (data: GuestInfoFormData) => {
		search.saveSearchValues(
			"",
			data.checkIn,
			data.checkOut,
			data.personCount
		);
		navigate(`/tavern/${tavernId}/booking`, { state: { from: location } });
	};

	const checkIn = watch("checkIn");
	const checkOut = watch("checkOut");

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	return (
		<div className="flex flex-col p-4 bg-blue-400 gap-4 rounded-md">
			<h3 className="text-md font-bold ">
				{pricePerNight} denar (per Night)
			</h3>
			<form
				onSubmit={
					isLoggedIn
						? handleSubmit(onSubmit)
						: handleSubmit(onSignInClick)
				}
			>
				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-2 gap-4 items-center">
						<div>
							<DatePicker
								required
								selected={checkIn}
								onChange={(date) =>
									setValue("checkIn", date as Date)
								}
								selectsStart
								startDate={checkIn}
								endDate={checkOut}
								minDate={minDate}
								maxDate={maxDate}
								placeholderText="Check-in Date"
								className="w-full rounded bg-blue-100 p-2 focus:outline-none"
							/>
						</div>
						<div>
							<DatePicker
								required
								selected={checkOut}
								onChange={(date) =>
									setValue("checkOut", date as Date)
								}
								selectsStart
								startDate={checkIn}
								endDate={checkOut}
								minDate={minDate}
								maxDate={maxDate}
								placeholderText="Check-out Date"
								className="w-full rounded bg-blue-100 p-2 focus:outline-none"
							/>
						</div>
					</div>
					<div className="flex rounded bg-blue-100 p-2">
						<label className="flex items-center">
							People:
							<input
								className="ml-2 text-center w-12 focus:outline-none font-bold bg-blue-100"
								type="number"
								min={1}
								max={20}
								{...register("personCount", {
									required: "This field is required",
									min: {
										value: 1,
										message:
											"There must be at least one person",
									},
									valueAsNumber: true,
								})}
							/>
						</label>
						{errors.personCount && (
							<span className="text-red-500 font-semibold text-sm">
								{errors.personCount.message}
							</span>
						)}
					</div>
					{isLoggedIn ? (
						<button className="bg-blue-600 rounded-md text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
							Book now
						</button>
					) : (
						<button className="bg-blue-600 rounded-md text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
							Login to book
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default GuestInfoForm;
