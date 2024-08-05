import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import ImageSection from "./ImageSection";
import { TavernType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

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
	imageUrls: string[];
};

type Props = {
	tavern?: TavernType;
	onSave: (tavernFormData: FormData) => void;
	isLoading: boolean;
};

const ManageTavernForm = ({ onSave, isLoading, tavern }: Props) => {
	const formMethods = useForm<TavernFormData>();
	const { handleSubmit, reset } = formMethods;

	useEffect(() => {
		reset(tavern);
	}, [tavern, reset]);

	const onSubmit = handleSubmit((formDataJSON: TavernFormData) => {
		const formData = new FormData();
		if (tavern) {
			formData.append("tavernId", tavern._id);
		}
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

		if (formDataJSON.imageUrls) {
			formDataJSON.imageUrls.forEach((url, index) => {
				formData.append(`imageUrls[${index}]`, url);
			});
		}

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
