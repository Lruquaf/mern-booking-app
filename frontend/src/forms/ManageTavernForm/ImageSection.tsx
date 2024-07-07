import { useFormContext } from "react-hook-form";
import { TavernFormData } from "./ManageTavernForm";

const ImageSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<TavernFormData>();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">Images</h2>
			<div className="border-2 border-gray-500 rounded p-4 flex flex-col gap-4">
				<input
					type="file"
					multiple
					accept="image/*"
					className="w-full text-gray-700 font-normal"
					{...register("imageFiles", {
						validate: (imageFiles) => {
							if (imageFiles.length === 0) {
								return "At least one image is required";
							} else if (imageFiles.length > 6) {
								return "Total number of images cannot be more than 6";
							}
						},
					})}
				/>
			</div>
			{errors.imageFiles && (
				<span className="text-red-500">
					{errors.imageFiles.message}
				</span>
			)}
		</div>
	);
};

export default ImageSection;
