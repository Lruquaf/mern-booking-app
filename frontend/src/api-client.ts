import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import {
	TavernSearchResponse,
	TavernType,
} from "../../backend/src/shared/types";

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

export const fetchMyTavernById = async (
	tavernId: string
): Promise<TavernType> => {
	const response = await fetch(`${API_BASE_URL}/api/my-taverns/${tavernId}`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error fetching tavern");
	}

	return response.json();
};

export const updateMyTavernById = async (tavernFormData: FormData) => {
	const response = await fetch(
		`${API_BASE_URL}/api/my-taverns/${tavernFormData.get("tavernId")}`,
		{
			method: "PUT",
			body: tavernFormData,
			credentials: "include",
		}
	);

	if (!response.ok) {
		throw new Error("Failed to update tavern");
	}

	return response.json();
};

export type SearchParams = {
	destination?: string;
	checkIn?: string;
	checkOut?: string;
	personCount?: string;
	page?: string;
	maxPrice?: string;
	sortOption?: string;
	facilities?: string[];
	types?: string[];
	stars?: string[];
};

export const searchTaverns = async (
	searchParams: SearchParams
): Promise<TavernSearchResponse> => {
	const queryParams = new URLSearchParams();
	queryParams.append("destination", searchParams.destination || "");
	queryParams.append("checkIn", searchParams.checkIn || "");
	queryParams.append("checkOut", searchParams.checkOut || "");
	queryParams.append("personCount", searchParams.personCount || "");
	queryParams.append("page", searchParams.page || "");

	queryParams.append("maxPrice", searchParams.maxPrice || "");
	queryParams.append("sortOption", searchParams.sortOption || "");

	searchParams.facilities?.forEach((facility) =>
		queryParams.append("facilities", facility)
	);

	searchParams.types?.forEach((type) => queryParams.append("types", type));
	searchParams.stars?.forEach((star) => queryParams.append("stars", star));

	const response = await fetch(
		`${API_BASE_URL}/api/taverns/search?${queryParams}`
	);

	if (!response.ok) {
		throw new Error("Error fetching taverns");
	}

	return response.json();
};
