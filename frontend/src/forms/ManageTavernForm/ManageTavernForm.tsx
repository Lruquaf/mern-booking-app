import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import ImageSection from "./ImageSection";

export type TavernFormData = {
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	pricePerNight: number;
	starRating: number;
	capacity: number;
	facilities: string[];
	imageFiles: FileList;
};

type Props = {
	onSave: (tavernFormData: FormData) => void;
	isLoading: boolean;
};

const ManageTavernForm = ({ onSave, isLoading }: Props) => {
	const formMethods = useForm<TavernFormData>();
	const { handleSubmit } = formMethods;

	const onSubmit = handleSubmit((formDataJSON: TavernFormData) => {
		const formData = new FormData();
		formData.append("name", formDataJSON.name);
		formData.append("country", formDataJSON.country);
		formData.append("city", formDataJSON.city);
		formData.append("description", formDataJSON.description);
		formData.append("type", formDataJSON.type);
		formData.append("pricePerNight", formDataJSON.pricePerNight.toString());
		formData.append("starRating", formDataJSON.starRating.toString());
		formData.append("capacity", formDataJSON.capacity.toString());
		formDataJSON.facilities.forEach((facility, index) => {
			formData.append(`facilities[${index}]`, facility);
		});
		Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
			formData.append("imageFiles", imageFile);
		});

		onSave(formData);
		console.log(formData);
	});
	return (
		<FormProvider {...formMethods}>
			<form className="flex flex-col gap-10" onSubmit={onSubmit}>
				<DetailsSection />
				<TypeSection />
				<FacilitiesSection />
				<ImageSection />
				<span className="justify-end flex">
					<button
						disabled={isLoading}
						type="submit"
						className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
					>
						{isLoading ? "Saving" : "Save"}
					</button>
				</span>
			</form>
		</FormProvider>
	);
};

export default ManageTavernForm;
