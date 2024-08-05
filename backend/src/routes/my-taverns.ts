import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Tavern from "../models/taverns";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { TavernType } from "../shared/types";

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

			const imageUrls = await uploadImages(imageFiles);

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
		return res.json(taverns);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error fetching taverns" });
	}
});

router.get("/:tavernId", verifyToken, async (req: Request, res: Response) => {
	const id = req.params.tavernId.toString();
	try {
		const tavern = await Tavern.findOne({ _id: id, userId: req.userId });
		return res.json(tavern);
	} catch (error) {
		return res.status(500).json({ message: "Error fetching tavern" });
	}
});

router.put(
	"/:tavernId",
	verifyToken,
	upload.array("imageFiles"),
	async (req: Request, res: Response) => {
		const id = req.params.tavernId.toString();
		try {
			const updatedTavern: TavernType = req.body;
			updatedTavern.lastUpdated = new Date();

			const tavern = await Tavern.findByIdAndUpdate(
				{
					_id: id,
					userId: req.userId,
				},
				updatedTavern,
				{ new: true }
			);

			if (!tavern) {
				return res.status(404).json({ message: "Tavern not found" });
			}

			const files = req.files as Express.Multer.File[];
			const updatedImageUrls = await uploadImages(files);

			tavern.imageUrls = [
				...updatedImageUrls,
				...(updatedTavern.imageUrls || []),
			];

			await tavern.save();
			res.status(201).json(tavern);
		} catch (error) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
);

export default router;

async function uploadImages(imageFiles: Express.Multer.File[]) {
	const uploadPromises = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString("base64");
		let dataUri = "data:" + image.mimetype + ";base64," + b64;
		const res = await cloudinary.v2.uploader.upload(dataUri);
		return res.url;
	});
	const imageUrls = await Promise.all(uploadPromises);
	return imageUrls;
}
