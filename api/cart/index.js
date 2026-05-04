import pool from "../_db.js";
import { getUser } from "../_auth.js";

export default async function handler(req, res) {
	const user = getUser(req, res);
	if (!user) return;

	const user_id = user.user_id;

	if (req.method === "GET") {
		try {
			const result = await pool.query(
				"SELECT * FROM cart WHERE user_id = $1 ORDER BY created_at ASC",
				[user_id]
			);
			res.status(200).json(result.rows);
		} catch (err) {
			res
				.status(500)
				.json({ error: "Error fetching cart", details: err.message });
		}
	} else if (req.method === "DELETE") {
		try {
			const result = await pool.query("DELETE FROM cart WHERE user_id = $1", [
				user_id,
			]);

			if (result.rowCount === 0) {
				return res.status(404).json({ error: "No cart items to delete" });
			}

			res.status(204).send();
		} catch (err) {
			res
				.status(500)
				.json({ error: "Error removing items from cart", details: err.message });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
