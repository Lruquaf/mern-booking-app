import express, { Request, Response } from "express";
import Tavern from "../models/taverns";
import { TavernSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
	try {
		const query = constructSearchQuery(req.query);

		let sortOptions = {};
		switch (req.query.sortOption) {
			case "starRating":
				sortOptions = { starRating: -1 };
				break;
			case "pricePerNightAsc":
				sortOptions = {
					pricePerNight: 1,
				};
				break;
			case "pricePerNightDesc":
				sortOptions = {
					pricePerNight: -1,
				};
				break;
		}

		const pageSize = 5;
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : "1"
		);
		const skip = (pageNumber - 1) * pageSize;
		const taverns = await Tavern.find(query)
			.sort(sortOptions)
			.skip(skip)
			.limit(pageSize);

		const total = await Tavern.countDocuments(query);

		const response: TavernSearchResponse = {
			data: taverns,
			pagination: {
				total: total,
				page: pageNumber,
				pages: Math.ceil(total / pageSize),
			},
		};
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
});

router.get(
	"/:id",
	[param("id").notEmpty().withMessage("Tavern Id is required")],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const id = req.params.id.toString();

		try {
			const tavern = await Tavern.findById(id);
			return res.status(200).json(tavern);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
);

const constructSearchQuery = (queryParams: any) => {
	let constructedQuery: any = {};

	if (queryParams.destination) {
		constructedQuery.$or = [
			{ city: new RegExp(queryParams.destination, "i") },
			{ country: new RegExp(queryParams.destination, "i") },
		];
	}
	if (queryParams.personCount) {
		constructedQuery.capacity = {
			$gte: parseInt(queryParams.personCount),
		};
	}

	if (queryParams.facilities) {
		constructedQuery.facilities = {
			$all: Array.isArray(queryParams.facilities)
				? queryParams.facilities
				: [queryParams.facilities],
		};
	}

	if (queryParams.types) {
		constructedQuery.type = {
			$in: Array.isArray(queryParams.types)
				? queryParams.types
				: [queryParams.types],
		};
	}

	if (queryParams.stars) {
		const starRatings = Array.isArray(queryParams.stars)
			? queryParams.stars.map((star: string) => parseInt(star))
			: parseInt(queryParams.stars);

		constructedQuery.starRating = { $in: starRatings };
	}

	if (queryParams.maxPrice) {
		constructedQuery.pricePerNight = {
			$lte: parseInt(queryParams.maxPrice).toString(),
		};
	}

	return constructedQuery;
};

export default router;
