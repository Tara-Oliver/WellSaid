import pool from "../../_db.js";
import { getUser } from "../../_auth.js";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const user = getUser(req, res);
	if (!user) return;

	const user_id = user.user_id;
	const { artwork_id } = req.query;
	const { artwork } = req.body;

	try {
		const checkResult = await pool.query(
			"SELECT * FROM favorite WHERE artwork_id = $1 AND user_id = $2",
			[artwork_id, user_id]
		);

		if (checkResult.rows.length > 0) {
			return res.status(409).json({ message: "Artwork is already in favorites." });
		}

		const result = await pool.query(
			"INSERT INTO favorite (favorite_item_id, user_id, artwork_id, artwork, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
			[uuidv4(), user_id, artwork_id, artwork]
		);

		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error("Error adding artwork to favorite:", error);
		res.status(500).json({
			error: "Error adding artwork to favorite",
			details: error.message,
		});
	}
}
