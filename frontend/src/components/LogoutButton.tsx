import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const LogoutButton = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();
	const mutation = useMutation(apiClient.logout, {
		onSuccess: async () => {
			showToast({ message: "Logout successful!", type: "SUCCESS" });
			await queryClient.invalidateQueries("validateToken");
		},
		onError: (error: Error) => {
			console.log(error.message);
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};
	return (
		<button
			className="flex items-center bg-slate-50 text-blue-400 px-3 font-bold hover:bg-slate-500"
			onClick={handleClick}
		>
			Logout
		</button>
	);
};

export default LogoutButton;
