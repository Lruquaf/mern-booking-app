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
		personCount: number,
		tavernId: string
	) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = { children: React.ReactNode };

export const SearchContextProvider = ({
	children,
}: SearchContextProviderProps) => {
	const [destination, setDestination] = useState<string>("");
	const [checkIn, setCheckIn] = useState<Date>(new Date());
	const [checkOut, setCheckOut] = useState<Date>(new Date());
	const [personCount, setPersonCount] = useState<number>(1);
	const [tavernId, setTavernId] = useState<string>("");

	const saveSearchValues = (
		destination: string,
		checkIn: Date,
		checkOut: Date,
		personCount: number,
		tavernId: string
	) => {
		setDestination(destination);
		setCheckIn(checkIn);
		setCheckOut(checkOut);
		setPersonCount(personCount);
		setTavernId(tavernId);
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
