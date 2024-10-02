export type TavernType = {
	_id: string;
	userId: string;
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	capacity: number;
	pricePerNight: number;
	facilities: string[];
	starRating: number;
	imageUrls: string[];
	lastUpdated: Date;
};

export type TavernSearchResponse = {
	data: TavernType[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	};
};
