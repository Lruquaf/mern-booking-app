import mongoose from "mongoose";

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

const tavernSchema = new mongoose.Schema<TavernType>({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	city: { type: String, required: true },
	country: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	capacity: { type: Number, required: true },
	facilities: [{ type: String, required: true }],
	pricePerNight: { type: Number, required: true },
	starRating: { type: Number, required: true, min: 1, max: 5 },
	imageUrls: [{ type: String, required: true }],
	lastUpdated: { type: Date, required: true },
});

const Tavern = mongoose.model<TavernType>("Tavern", tavernSchema);

export default Tavern;
