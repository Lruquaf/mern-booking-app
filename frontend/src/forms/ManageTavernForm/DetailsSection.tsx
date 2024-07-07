import { useFormContext } from "react-hook-form";
import { TavernFormData } from "./ManageTavernForm";
import { cities } from "../../config/tavern-options-config";

const DetailsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<TavernFormData>();

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold mb-3">Add Tavern</h1>
			<label className="text-gray-800 text-sm font-bold flex-1">
				Name
				<input
					type="text"
					className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
					{...register("name", {
						required: "This field is required",
					})}
				/>
				{errors.name && (
					<span className="text-red-500">{errors.name.message}</span>
				)}
			</label>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-gray-800 text-sm font-bold flex-1">
					Country
					<select
						className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
						{...register("country", {
							required: "This field is required",
						})}
						defaultValue=""
					>
						<option value="" disabled>
							Select Country
						</option>
						<option value="Khergit">Khergit</option>
						<option value="Nord">Nord</option>
						<option value="Rhodok">Rhodok</option>
						<option value="Sarranid">Sarranid</option>
						<option value="Swadia">Swadia</option>
						<option value="Vaegir">Vaegir</option>
					</select>
					{errors.country && (
						<span className="text-red-500">
							{errors.country.message}
						</span>
					)}
				</label>
				<label className="text-gray-800 text-sm font-bold flex-1">
					City
					<select
						className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
						{...register("city", {
							required: "This field is required",
						})}
						defaultValue=""
					>
						<option value="" disabled>
							Select City
						</option>
						{cities.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
					{errors.city && (
						<span className="text-red-500">
							{errors.city.message}
						</span>
					)}
				</label>
			</div>
			<label className="text-gray-800 text-sm font-bold flex-1">
				Description
				<textarea
					rows={5}
					className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
					{...register("description", {
						required: "This field is required",
					})}
				/>
				{errors.description && (
					<span className="text-red-500">
						{errors.description.message}
					</span>
				)}
			</label>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-gray-800 text-sm font-bold flex-1">
					Price Per Night
					<input
						type="number"
						min={1}
						className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
						{...register("pricePerNight", {
							required: "This field is required",
						})}
					/>
					{errors.pricePerNight && (
						<span className="text-red-500">
							{errors.pricePerNight.message}
						</span>
					)}
				</label>
				<label className="text-gray-800 text-sm font-bold flex-1">
					Star Rating
					<select
						className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
						{...register("starRating", {
							required: "This field is required",
						})}
						defaultValue=""
					>
						<option value="" disabled>
							Select Star Rating
						</option>
						{[1, 2, 3, 4, 5].map((num) => (
							<option key={num} value={num}>
								{num}
							</option>
						))}
					</select>
					{errors.starRating && (
						<span className="text-red-500">
							{errors.starRating.message}
						</span>
					)}
				</label>
				<label className="text-gray-800 text-sm font-bold flex-1">
					Capacity
					<input
						type="number"
						min={1}
						className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
						{...register("capacity", {
							required: "This field is required",
						})}
					/>
					{errors.capacity && (
						<span className="text-red-500">
							{errors.capacity.message}
						</span>
					)}
				</label>
			</div>
		</div>
	);
};

export default DetailsSection;
