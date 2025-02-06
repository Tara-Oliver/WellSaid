import pool from "../server/index.js";
import { artworks } from "../src/shared-components/util.js";

const populateArtwork = async () => {
	for (const artwork of artworks) {
		try {
			// Prepare the artwork data for insertion
			const { artwork_id, name, quote, images, category } = artwork;

			// Insert artwork into the artwork table
			const result = await pool.query(
				"INSERT INTO artwork (artwork_id, name, quote, images, category) VALUES ($1, $2, $3, $4, $5)",
				[artwork_id, name, quote, images, category]
			);

			console.log(`Artwork "${name}" added successfully!`);
		} catch (error) {
			console.error("Error adding artwork:", artwork.name);
			console.error("Error details:", error.message);
			console.error("Error stack:", error.stack);
		}
	}
};

export default populateArtwork;

// populateArtwork().catch((error) =>
// 	console.error("Error populating artwork table:", error.message)
// );
