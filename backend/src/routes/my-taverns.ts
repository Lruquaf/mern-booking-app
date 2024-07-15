import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Tavern, { TavernType } from "../models/taverns";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

router.post(
	"/",
	verifyToken,
	body("name").notEmpty().withMessage("Name is required"),
	body("city").notEmpty().withMessage("City is required"),
	body("country").notEmpty().withMessage("Country is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("type").notEmpty().withMessage("Type is required"),
	body("pricePerNight")
		.notEmpty()
		.isNumeric()
		.withMessage("Price per night is required and must be a number"),
	body("facilities")
		.notEmpty()
		.isArray()
		.withMessage("Facilities is required and must be array"),

	upload.array("imageFiles", 6),
	async (req: Request, res: Response) => {
		try {
			const imageFiles = req.files as Express.Multer.File[];
			const newTavern: TavernType = req.body;

			const uploadPromises = imageFiles.map(async (image) => {
				const b64 = Buffer.from(image.buffer).toString("base64");
				let dataUri = "data:" + image.mimetype + ";base64," + b64;
				const res = await cloudinary.v2.uploader.upload(dataUri);
				return res.url;
			});
			const imageUrls = await Promise.all(uploadPromises);

			newTavern.imageUrls = imageUrls;
			newTavern.lastUpdated = new Date();
			newTavern.userId = req.userId;

			const tavern = new Tavern(newTavern);
			await tavern.save();

			res.status(201).send(tavern);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
	try {
		const taverns = await Tavern.find({ userId: req.userId });
		res.json(taverns);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error fetching taverns" });
	}
});

export default router;
