import pool from "../_db.js";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { artwork_id } = req.query;

	try {
		const result = await pool.query(
			"SELECT * FROM artwork WHERE artwork_id = $1",
			[artwork_id]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Artwork not found" });
		}

		res.status(200).json(result.rows[0]);
	} catch (error) {
		console.error("Error fetching artwork:", error);
		res
			.status(500)
			.json({ error: "Error fetching artwork", details: error.message });
	}
}
