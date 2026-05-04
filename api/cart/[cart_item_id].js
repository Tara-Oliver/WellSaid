import pool from "../_db.js";
import { getUser } from "../_auth.js";

export default async function handler(req, res) {
	const user = getUser(req, res);
	if (!user) return;

	const user_id = user.user_id;
	const { cart_item_id } = req.query;

	if (req.method === "PUT") {
		const { quantity, frame_color, size, price_per_unit, image_src, artwork_id } =
			req.body;

		try {
			const duplicateItem = await pool.query(
				"SELECT * FROM cart WHERE user_id = $1 AND artwork_id = $2 AND size = $3 AND frame_color = $4 AND cart_item_id != $5",
				[user_id, artwork_id, size, frame_color, cart_item_id]
			);

			if (duplicateItem.rows.length > 0) {
				return res.status(400).json({
					error:
						"This item with the same size and frame color is already in your cart.",
				});
			}

			const result = await pool.query(
				"UPDATE cart SET quantity = $1, frame_color = $2, size = $3, price_per_unit = $4, image_src = $5 WHERE cart_item_id = $6 AND user_id = $7 RETURNING *",
				[quantity, frame_color, size, price_per_unit, image_src, cart_item_id, user_id]
			);

			if (result.rowCount === 0) {
				return res.status(404).json({ error: "Cart item not found" });
			}

			res.status(200).json(result.rows[0]);
		} catch (err) {
			res
				.status(500)
				.json({ error: "Error updating cart item", details: err.message });
		}
	} else if (req.method === "DELETE") {
		try {
			const result = await pool.query(
				"DELETE FROM cart WHERE cart_item_id = $1 AND user_id = $2",
				[cart_item_id, user_id]
			);

			if (result.rowCount === 0) {
				return res.status(404).json({ error: "Item not found in cart" });
			}

			res.status(204).send();
		} catch (err) {
			res
				.status(500)
				.json({ error: "Error removing item from cart", details: err.message });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
