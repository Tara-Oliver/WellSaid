import pool from "./index.js";

const createOrderTable = async () => {
	try {
		const res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'orders'
      );
    `);

		if (res.rows[0].exists) {
			console.log("Order Table already exists.");
		} else {
			await pool.query(`
        CREATE TABLE orders (
          order_item_id UUID PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES users(user_id),
          order_date TEXT NOT NULL,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          street_address TEXT NOT NULL,
          apt TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          zip TEXT NOT NULL,
          cart JSON[],
          name_on_card TEXT NOT NULL,
          card_number TEXT NOT NULL,
          exp_month TEXT NOT NULL,
          exp_year TEXT NOT NULL,
          subtotal NUMERIC NOT NULL,
          shipping_fee NUMERIC NOT NULL,
          total NUMERIC NOT NULL,
          ccv TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
			console.log("Order Table created successfully!");
		}
	} catch (error) {
		console.error("Error setting up order table:", error.message);
	}
};

export default createOrderTable;
