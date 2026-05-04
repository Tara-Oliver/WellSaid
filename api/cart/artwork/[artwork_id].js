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
	const {
		quantity,
		price_per_unit,
		image_src,
		frame_color,
		colors,
		artwork_name,
		size,
	} = req.body;

	try {
		const existingItem = await pool.query(
			"SELECT * FROM cart WHERE user_id = $1 AND artwork_id = $2 AND size = $3 AND frame_color = $4",
			[user_id, artwork_id, size, frame_color]
		);

		if (existingItem.rows.length > 0) {
			const updatedItem = await pool.query(
				"UPDATE cart SET quantity = quantity + $1 WHERE cart_item_id = $2 RETURNING *",
				[quantity, existingItem.rows[0].cart_item_id]
			);
			return res.status(200).json(updatedItem.rows[0]);
		}

		const newItem = await pool.query(
			"INSERT INTO cart (cart_item_id, user_id, artwork_id, quantity, price_per_unit, image_src, frame_color, colors, artwork_name, size, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING *",
			[
				uuidv4(),
				user_id,
				artwork_id,
				quantity,
				price_per_unit,
				image_src,
				frame_color,
				colors,
				artwork_name,
				size,
			]
		);
		return res.status(201).json(newItem.rows[0]);
	} catch (error) {
		console.error("Error adding poster to cart:", error);
		res
			.status(500)
			.json({ error: "Error adding poster to cart", details: error.message });
	}
}
