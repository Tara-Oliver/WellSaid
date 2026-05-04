import pool from "../_db.js";
import { getUser } from "../_auth.js";

export default async function handler(req, res) {
	if (req.method !== "DELETE") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const user = getUser(req, res);
	if (!user) return;

	const user_id = user.user_id;
	const { artwork_id } = req.query;

	try {
		const result = await pool.query(
			"DELETE FROM favorite WHERE artwork_id = $1 AND user_id = $2",
			[artwork_id, user_id]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "Item not found in favorite" });
		}

		res.status(204).send();
	} catch (err) {
		res.status(500).json({
			error: "Error removing item from favorite",
			details: err.message,
		});
	}
}
