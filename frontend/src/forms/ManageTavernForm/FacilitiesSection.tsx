import { useFormContext } from "react-hook-form";
import { TavernFormData } from "./ManageTavernForm";
import { tavernFacilities } from "../../config/tavern-options-config";

const FacilitiesSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<TavernFormData>();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Facilities</h2>
			<div className="grid grid-cols-5 gap-3">
				{tavernFacilities.map((facility) => (
					<label
						key={facility}
						className="text-m flex gap-1 text-gray-700 font-semibold px-2 py-1 hover:bg-gray-100 hover:rounded-xl hover:cursor-pointer"
					>
						<input
							type="checkbox"
							value={facility}
							className=""
							{...register("facilities", {
								validate: (facilities) => {
									if (facilities && facilities.length > 0) {
										return true;
									} else {
										return "At least one facility is required";
									}
								},
							})}
						/>
						{facility}
					</label>
				))}
			</div>
			{errors.facilities && (
				<span className="text-red-500">
					{errors.facilities.message}
				</span>
			)}
		</div>
	);
};

export default FacilitiesSection;
