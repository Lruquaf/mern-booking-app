import express, { Request, Response } from "express";
import Tavern from "../models/taverns";
import { TavernSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
	try {
		const pageSize = 3;
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : "1"
		);
		const taverns = await Tavern.find()
			.skip(pageNumber - 1 * pageSize)
			.limit(pageSize);

		const total = await Tavern.countDocuments();

		const response: TavernSearchResponse = {
			data: taverns,
			pagination: {
				total: total,
				page: pageNumber,
				pages: Math.ceil(total / pageNumber),
			},
		};
		return res.json(response);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
});

export default router;
