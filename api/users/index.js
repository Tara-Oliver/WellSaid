import pool from "../_db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

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

	const { username, password, confirmPassword } = req.body;
	const emptyErrors = emptyCheck(req.body);

	if (Object.keys(emptyErrors).length > 0) {
		return res.status(400).json(emptyErrors);
	}

	if (username.length < 4) {
		return res
			.status(400)
			.json({ username: "Username must be at least 4 characters", password: "" });
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json({ username: "", password: "Password must be at least 6 characters." });
	}

	if (password !== confirmPassword) {
		return res.status(400).json({
			username: "",
			password: "Passwords must match.",
			confirmPassword: "Passwords must match.",
		});
	}

	try {
		const result = await pool.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);

		if (result.rows.length > 0) {
			return res
				.status(400)
				.json({ username: "Username already exists.", password: "" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = { username, password: hashedPassword, user_id: uuidv4() };

		await pool.query(
			"INSERT INTO users (username, password, user_id) VALUES ($1, $2, $3)",
			[newUser.username, newUser.password, newUser.user_id]
		);

		const payload = { user_id: newUser.user_id, username: newUser.username };
		const sessionToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

		res.status(200).json({ sessionToken, message: "User created successfully." });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: "Error creating user", details: error.message });
	}
}
