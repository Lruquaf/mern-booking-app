import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type LoginFormData = {
	email: string;
	password: string;
};

const Login = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginFormData>();

	const mutation = useMutation(apiClient.login, {
		onSuccess: async () => {
			console.log("Login successful!");
			showToast({ message: "Login successful!", type: "SUCCESS" });
			await queryClient.invalidateQueries("validateToken");
			navigate("/");
		},
		onError: (error: Error) => {
			console.log(error.message);
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});
	return (
		<form className="flex flex-col gap-5" onSubmit={onSubmit}>
			<h2 className="text-3xl font-bold">Login</h2>
			<label className="text-gray-800 text-sm font-bold flex-1">
				Email
				<input
					type="email"
					className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
					{...register("email", {
						required: "This field is required",
					})}
				/>
				{errors.email && (
					<span className="text-red-500">{errors.email.message}</span>
				)}
			</label>
			<label className="text-gray-800 text-sm font-bold flex-1">
				Password
				<input
					type="password"
					className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
					})}
				/>
				{errors.password && (
					<span className="text-red-500">
						{errors.password.message}
					</span>
				)}
			</label>
			<span className="flex items-center justify-between">
				<span>
					Not registered?{" "}
					<Link to="/register" className="underline">
						Create an account
					</Link>
				</span>

				<button
					type="submit"
					className="bg-blue-800 text-white p-2 font-bold hover:bg-blue-600 rounded text-xl"
				>
					Login
				</button>
			</span>
		</form>
	);
};

export default Login;
