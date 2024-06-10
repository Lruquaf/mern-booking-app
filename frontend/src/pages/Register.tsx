import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	citizenship: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();
	const navigate = useNavigate();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const mutation = useMutation(apiClient.register, {
		onSuccess: async () => {
			console.log("Registration successful!");
			showToast({ message: "Registration successful!", type: "SUCCESS" });
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
			<h2 className="text-3xl font-bold">Create an Account</h2>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-gray-800 text-sm font-bold flex-1">
					First Name
					<input
						className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
						{...register("firstName", {
							required: "This field is required",
						})}
					/>
					{errors.firstName && (
						<span className="text-red-500">
							{errors.firstName.message}
						</span>
					)}
				</label>
				<label className="text-gray-800 text-sm font-bold flex-1">
					Last Name
					<input
						className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
						{...register("lastName", {
							required: "This field is required",
						})}
					/>
					{errors.lastName && (
						<span className="text-red-500">
							{errors.lastName.message}
						</span>
					)}
				</label>
				<label className="text-gray-800 text-sm font-bold flex-1">
					Citizenship
					<select
						className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
						{...register("citizenship", {
							required: "This field is required",
						})}
						defaultValue=""
					>
						<option value="" disabled>
							Select Citizenship
						</option>
						<option value="Khergit">Khergit</option>
						<option value="Nord">Nord</option>
						<option value="Rhodok">Rhodok</option>
						<option value="Sarranid">Sarranid</option>
						<option value="Swadia">Swadia</option>
						<option value="Vaegir">Vaegir</option>
					</select>
					{errors.citizenship && (
						<span className="text-red-500">
							{errors.citizenship.message}
						</span>
					)}
				</label>
			</div>
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
			<label className="text-gray-800 text-sm font-bold flex-1">
				Confirm Password
				<input
					type="password"
					className="border border-gray-500 rounded w-full py-1 px-2 font-normal"
					{...register("confirmPassword", {
						validate: (val) => {
							if (!val) {
								return "This field is required";
							} else if (watch("password") !== val) {
								return "Your passwords do not match";
							}
						},
					})}
				/>
				{errors.confirmPassword && (
					<span className="text-red-500">
						{errors.confirmPassword.message}
					</span>
				)}
			</label>
			<span className="flex items-center justify-between">
				<span className="sm">
					Already registered?{" "}
					<Link to="/login" className="underline">
						Log in
					</Link>
				</span>
				<button
					type="submit"
					className="bg-blue-800 text-white p-2 font-bold hover:bg-blue-600 rounded text-xl"
				>
					Create Account
				</button>
			</span>
		</form>
	);
};

export default Register;
