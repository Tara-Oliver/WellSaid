import pool from "./index.js";

const createArtworkTable = async () => {
	try {
		const res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'artwork'
      );
    `);

		if (res.rows[0].exists) {
			console.log("Artwork Table already exists.");
		} else {
			await pool.query(`
        CREATE TABLE artwork (
          artwork_id UUID PRIMARY KEY,
          category VARCHAR(100),
          images JSON[],
					name TEXT,
					quote TEXT,
					CONSTRAINT artwork_unique UNIQUE (artwork_id)
        );
      `);
			console.log("Artwork Table created successfully!");
		}
	} catch (error) {
		console.error("Error setting up artwork table:", error.message);
	}
};

export default createArtworkTable;
