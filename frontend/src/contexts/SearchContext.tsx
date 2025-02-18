import React, { useContext } from "react";
import { useState } from "react";

type SearchContext = {
	destination: string;
	checkIn: Date;
	checkOut: Date;
	personCount: number;
	tavernId: string;
	saveSearchValues: (
		destination: string,
		checkIn: Date,
		checkOut: Date,
		personCount: number
	) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = { children: React.ReactNode };

export const SearchContextProvider = ({
	children,
}: SearchContextProviderProps) => {
	const [destination, setDestination] = useState<string>(
		() => sessionStorage.getItem("destination") || ""
	);
	const [checkIn, setCheckIn] = useState<Date>(
		() =>
			new Date(
				sessionStorage.getItem("checkIn") || new Date().toISOString()
			)
	);
	const [checkOut, setCheckOut] = useState<Date>(
		() =>
			new Date(
				sessionStorage.getItem("checkOut") || new Date().toISOString()
			)
	);
	const [personCount, setPersonCount] = useState<number>(() =>
		parseInt(sessionStorage.getItem("personCount") || "1")
	);
	const [tavernId, setTavernId] = useState<string>(
		() => sessionStorage.getItem("tavernId") || ""
	);

	const saveSearchValues = (
		destination: string,
		checkIn: Date,
		checkOut: Date,
		personCount: number,
		tavernId?: string
	) => {
		setDestination(destination);
		setCheckIn(checkIn);
		setCheckOut(checkOut);
		setPersonCount(personCount);
		if (tavernId) {
			setTavernId(tavernId);
		}

		sessionStorage.setItem("destination", destination);
		sessionStorage.setItem("checkIn", checkIn.toISOString());
		sessionStorage.setItem("checkOut", checkOut.toISOString());
		sessionStorage.setItem("personCount", personCount.toString());
		if (tavernId) {
			sessionStorage.setItem("tavernId", tavernId);
		}
	};

	return (
		<SearchContext.Provider
			value={{
				destination,
				checkIn,
				checkOut,
				personCount,
				tavernId,
				saveSearchValues,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	return context as SearchContext;
};
