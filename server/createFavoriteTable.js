import pool from "./index.js";

const createFavoriteTable = async () => {
	try {
		const res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'favorite'
      );
    `);

		if (res.rows[0].exists) {
			console.log("Favorite Table already exists.");
		} else {
			await pool.query(`
        CREATE TABLE favorite (
          favorite_item_id UUID PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES users(user_id),
          artwork_id UUID NOT NULL REFERENCES artwork(artwork_id),
          artwork JSON,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
			console.log("Favorite Table created successfully!");
		}
	} catch (error) {
		console.error("Error setting up favorite table:", error.message);
	}
};

export default createFavoriteTable;
