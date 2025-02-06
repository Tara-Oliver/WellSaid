import pool from "./index.js"; // Import your database connection

const createUserTable = async () => {
	try {
		const res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'users'
      );
    `);

		if (res.rows[0].exists) {
			console.log("User Table already exists.");
		} else {
			await pool.query(`
        CREATE TABLE users (
          user_id UUID PRIMARY KEY,
          username VARCHAR(100),
          password TEXT,
CONSTRAINT user_unique UNIQUE (user_id)
        );
      `);
			console.log("User Table created successfully!");
		}
	} catch (error) {
		console.error("Error setting up user table:", error.message);
	}
};

export default createUserTable;
