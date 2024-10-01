import { useMutation } from "react-query";
import ManageTavernForm from "../forms/ManageTavernForm/ManageTavernForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddTavern = () => {
	const { showToast } = useAppContext();

	const { mutate, isLoading } = useMutation(apiClient.addTavern, {
		onSuccess: () => {
			showToast({
				message: "Tavern saved successfully!",
				type: "SUCCESS",
			});
		},
		onError: () => {
			showToast({
				message: "Error saving tavern!",
				type: "ERROR",
			});
		},
	});

	const handleSave = (tavernFormData: FormData) => {
		mutate(tavernFormData);
	};
	return <ManageTavernForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddTavern;
