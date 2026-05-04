import pool from "../_db.js";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const result = await pool.query("SELECT * FROM artwork");
		const artwork = result.rows;

		for (let i = artwork.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[artwork[i], artwork[j]] = [artwork[j], artwork[i]];
		}

		res.status(200).json(artwork);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Error fetching artwork", details: error.message });
	}
}
