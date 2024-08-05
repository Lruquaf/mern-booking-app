import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageTavernForm from "../forms/ManageTavernForm/ManageTavernForm";
import { useAppContext } from "../contexts/AppContext";

const EditTavern = () => {
	const { showToast } = useAppContext();

	const { tavernId } = useParams();

	const { data: tavern } = useQuery(
		"fetchMyTavernById",
		() => apiClient.fetchMyTavernById(tavernId || ""),
		{ enabled: !!tavernId }
	);

	const { mutate, isLoading } = useMutation(apiClient.updateMyTavernById, {
		onSuccess: () => {
			showToast({
				message: "Tavern saved successfully!",
				type: "SUCCESS",
			});
		},
		onError: () => {
			showToast({ message: "Error saving tavern!", type: "ERROR" });
		},
	});

	const handleSave = (tavernFormData: FormData) => {
		mutate(tavernFormData);
	};

	return (
		<ManageTavernForm
			tavern={tavern}
			onSave={handleSave}
			isLoading={isLoading}
		/>
	);
};

export default EditTavern;
