import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { TavernType } from "../../backend/src/models/taverns";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/users/register`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();
	if (!response.ok) {
		throw new Error(responseBody.message);
	}
};

export const login = async (formData: LoginFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});
	const responseBody = await response.json();
	if (!response.ok) {
		throw new Error(responseBody.message);
	}
};

export const validateToken = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Invalid token");
	}

	return response.json();
};

export const logout = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
		method: "POST",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error during logout!");
	}
};

export const addTavern = async (tavernFormData: FormData) => {
	const response = await fetch(`${API_BASE_URL}/api/my-taverns`, {
		method: "POST",
		credentials: "include",
		body: tavernFormData,
	});

	if (!response.ok) {
		throw new Error("Failed to add tavern");
	}

	return response.json();
};

export const fetchMyTaverns = async (): Promise<TavernType[]> => {
	const response = await fetch(`${API_BASE_URL}/api/my-taverns`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error fetching taverns");
	}

	return response.json();
};
