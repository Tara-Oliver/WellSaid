import pool from "./index.js";

const createCartTable = async () => {
	try {
		const res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'cart'
      );
    `);

		if (res.rows[0].exists) {
			console.log("Cart Table already exists.");
		} else {
			await pool.query(`
        CREATE TABLE cart (
          cart_item_id UUID PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES users(user_id),
          artwork_id UUID NOT NULL REFERENCES artwork(artwork_id),
          quantity INT NOT NULL,
          price_per_unit DECIMAL(10, 2) NOT NULL,
          image_src TEXT NOT NULL,
          frame_color TEXT,
          colors JSON[],
          artwork_name TEXT NOT NULL,
          size TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
			console.log("Cart Table created successfully!");
		}
	} catch (error) {
		console.error("Error setting up cart table:", error.message);
	}
};

export default createCartTable;
