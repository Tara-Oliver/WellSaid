import pool from "../_db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const emptyCheck = (body) => {
	const emptyFields = {};
	for (let field in body) {
		const label = field === "confirmPassword" ? "confirm password" : field;
		if (body[field].length === 0) {
			emptyFields[field] = `${label} is required`;
		}
	}
	return emptyFields;
};

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { username, password } = req.body;
	const emptyErrors = emptyCheck(req.body);

	if (Object.keys(emptyErrors).length > 0) {
		return res.status(400).json(emptyErrors);
	}

	try {
		const { rows } = await pool.query(
			"SELECT * FROM users WHERE username = $1",
			[username]
		);

		if (rows.length === 0) {
			return res.status(400).json({ username: "Invalid username", password: "" });
		}

		const user = rows[0];
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ username: "", password: "Invalid password." });
		}

		const payload = { user_id: user.user_id, username: user.username };
		const sessionToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

		res.status(200).json({ sessionToken, message: "Login successful" });
	} catch (error) {
		res.status(500).json({ error: "Error logging in", details: error.message });
	}
}
