import pool from "../_db.js";
import { getUser } from "../_auth.js";

export default async function handler(req, res) {
	const user = getUser(req, res);
	if (!user) return;

	const user_id = user.user_id;

	if (req.method === "GET") {
		try {
			const result = await pool.query(
				"SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at ASC",
				[user_id]
			);
			res.status(200).json(result.rows);
		} catch (err) {
			res
				.status(500)
				.json({ error: "Error fetching orders", details: err.message });
		}
	} else if (req.method === "POST") {
		const {
			order_item_id,
			order_date,
			first_name,
			last_name,
			street_address,
			apt,
			city,
			state,
			zip,
			cart,
			name_on_card,
			card_number,
			exp_month,
			exp_year,
			subtotal,
			shipping_fee,
			total,
			ccv,
		} = req.body;

		const emptyFields = {};
		for (let field in req.body) {
			if (req.body[field].length === 0 && field !== "apt") {
				emptyFields[field] = "This field is required";
			}
		}
		if (Object.keys(emptyFields).length > 0) {
			return res.status(400).json(emptyFields);
		}

		try {
			const result = await pool.query(
				`INSERT INTO orders (order_item_id, user_id, order_date, first_name, last_name, street_address, apt, city, state, zip, cart, name_on_card, card_number, exp_month, exp_year, subtotal, shipping_fee, total, ccv, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW()) RETURNING *`,
				[
					order_item_id,
					user_id,
					order_date,
					first_name,
					last_name,
					street_address,
					apt,
					city,
					state,
					zip,
					cart,
					name_on_card,
					card_number,
					exp_month,
					exp_year,
					subtotal,
					shipping_fee,
					total,
					ccv,
				]
			);
			res.status(201).json(result.rows[0]);
		} catch (error) {
			console.error("Error adding order to orders:", error);
			res.status(500).json({
				error: "Error adding order to orders",
				details: error.message,
			});
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
