import { useFormContext } from "react-hook-form";
import { TavernFormData } from "./ManageTavernForm";
import { tavernTypes } from "../../config/tavern-options-config";

const TypeSection = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<TavernFormData>();
	const typeWatch = watch("type");

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Type</h2>
			<div className="grid grid-cols-5 gap-2">
				{tavernTypes.map((type) => (
					<label
						key={type}
						className={
							typeWatch === type
								? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-3 font-semibold"
								: "cursor-pointer bg-gray-300 text-sm rounded-full px-3 py-3 font-semibold"
						}
					>
						<input
							type="radio"
							value={type}
							{...register("type", {
								required: "This field is required",
							})}
							className="hidden"
						/>
						<span>{type}</span>
					</label>
				))}
			</div>
			{errors.type && (
				<span className="text-red-500">{errors.type.message}</span>
			)}
		</div>
	);
};

export default TypeSection;
