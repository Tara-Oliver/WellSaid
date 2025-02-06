import pkg from "pg";
import bcrypt from "bcrypt";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const connectToDB = async () => {
	try {
		await pool.connect();
		console.log("Connected to PostgreSQL!");
	} catch (error) {
		console.error("Failed to connect to PostgreSQL:", error);
		process.exit(1);
	}
};

connectToDB();

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",") || [];


app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});


app.use(express.json());


app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true, // Allow credentials (e.g., cookies, headers)
	})
);

export default pool;

// //////////////////////// USERS///////////////////////

const emptyCheck = (body) => {
	const emptyFields = {};

	for (let field in body) {
		let newField = field === "confirmPassword" ? "confirm password" : field;
		if (body[field].length === 0) {
			emptyFields[field] = `${newField} is required`;
		}
	}
	return emptyFields;
};

// User registration
app.post("/users", async (req, res) => {
	const { username, password, confirmPassword } = req.body;
	const emptyErrors = emptyCheck(req.body);

	if (Object.keys(emptyErrors).length > 0) {
		return res.status(400).json(emptyErrors);
	}


	if (username.length < 4) {
		return res.status(400).json({
			username: "Username must be at least 4 characters",
			password: "",
		});
	}

	if (password.length < 6) {
		return res.status(400).json({
			username: "",
			password: "Password must be at least 6 characters.",
		});
	}

	if (password !== confirmPassword) {
		return res.status(400).json({
			username: "",
			password: "Passwords must match.",
			confirmPassword: "Passwords must match.",
		});
	}

	try {
		QL
		const result = await pool.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);

		if (result.rows.length > 0) {
			return res.status(400).json({
				username: "Username already exists.",
				password: "",
			});
		}


		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = {
			username,
			password: hashedPassword,
			user_id: uuidv4(),
		};


		await pool.query(
			"INSERT INTO users (username, password, user_id) VALUES ($1, $2, $3)",
			[newUser.username, newUser.password, newUser.user_id]
		);


		const payload = {
			user_id: newUser.user_id,
			username: newUser.username,
		};


		const sessionToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

		res
			.status(200)
			.json({ sessionToken, message: "User created successfully." });
	} catch (error) {
		console.error(error.message);
		res
			.status(500)
			.json({ error: "Error creating user", details: error.message });
	}
});

// // User login
app.post("/users/session", async (req, res) => {
	const { username, password } = req.body;
	const emptyErrors = emptyCheck(req.body);

	if (Object.keys(emptyErrors).length > 0) {
		return res.status(400).json(emptyErrors);
	}

	try {

		const query = "SELECT * FROM users WHERE username = $1";
		const { rows } = await pool.query(query, [username]);

		if (rows.length === 0) {
			return res.status(400).json({
				username: "Invalid username",
				password: "",
			});
		}


		const user = rows[0];


		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({
				username: "",
				password: "Invalid password.",
			});
		}


		const payload = {
			user_id: user.user_id,
			username: user.username,
		};


		const sessionToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

		res.status(200).json({ sessionToken, message: "Login successful" });
	} catch (error) {
		res.status(500).json({ error: "Error logging in", details: error.message });
	}
});

// //////////////////////// ARTWORK///////////////////////

// // Fetch all posters (GET /posters)
app.get("/artwork", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM artwork");

		const artwork = result.rows;


		for (let i = artwork.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[artwork[i], artwork[j]] = [artwork[j], artwork[i]];
		}

		res.status(200).json(artwork);
	} catch (error) {
		res.status(500).json({
			error: "Error fetching artwork",
			details: error.message,
		});
	}
});

// // Fetch a single poster (GET /posters/:artwork_id)
app.get("/artwork/:artwork_id", async (req, res) => {
	const { artwork_id } = req.params;

	try {

		const result = await pool.query(
			"SELECT * FROM artwork WHERE artwork_id = $1",
			[artwork_id]
		);


		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Artwork not found" });
		}


		res.status(200).json(result.rows[0]);
	} catch (error) {
		console.error("Error fetching artwork:", error);
		res
			.status(500)
			.json({ error: "Error fetching artwork", details: error.message });
	}
});

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) return res.status(401).json({ error: "Token required" });

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: "Invalid token" });
		req.user = user;
		next();
	});
};

// //////////////////////// CART///////////////////////

// Fetch all cart items
app.get("/cart", authenticateToken, async (req, res) => {
	const user_id = req.user.user_id;

	try {
		const result = await pool.query(
			"SELECT * FROM cart WHERE user_id = $1 ORDER BY created_at ASC",
			[user_id]
		);

		if (result.rows.length === 0) {
			return res.status(200).json([]);
		}


		const cart = result.rows;

		res.status(200).json(cart);
	} catch (err) {
		res
			.status(500)
			.json({ error: "Error fetching cart", details: err.message });
	}
});

// // Add a poster to the cart
app.post("/cart/artwork/:artwork_id", authenticateToken, async (req, res) => {
	const { artwork_id } = req.params;

	const user_id = req.user.user_id;
	const {
		quantity,
		price_per_unit,
		image_src,
		frame_color,
		colors,
		artwork_name,
		size,
	} = req.body;

	try {
		const existingItem = await pool.query(
			"SELECT * FROM cart WHERE user_id = $1 AND artwork_id = $2 AND size = $3 AND frame_color = $4",
			[user_id, artwork_id, size, frame_color]
		);

		if (existingItem.rows.length > 0) {

			const updatedItem = await pool.query(
				"UPDATE cart SET quantity = quantity + $1 WHERE cart_item_id = $2 RETURNING *",
				[quantity, existingItem.rows[0].cart_item_id]
			);
			return res.status(200).json(updatedItem.rows[0]);
		} else {

			const newItem = await pool.query(
				"INSERT INTO cart (cart_item_id, user_id, artwork_id, quantity, price_per_unit,image_src,frame_color,colors,artwork_name,size,created_at) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING *",
				[
					uuidv4(),
					user_id,
					artwork_id,
					quantity,
					price_per_unit,
					image_src,
					frame_color,
					colors,
					artwork_name,
					size,
				]
			);

			return res.status(201).json(newItem.rows[0]);
		}
	} catch (error) {
		console.error("Error adding poster to cart:", error);
		res
			.status(500)
			.json({ error: "Error adding poster to cart", details: error.message });
	}
});

// Edit cart item

app.put("/cart/:cart_item_id", authenticateToken, async (req, res) => {
	const { cart_item_id } = req.params;
	const { quantity, frame_color, size, price_per_unit, image_src, artwork_id } =
		req.body;

	try {
		const user_id = req.user.user_id;


		const duplicateItem = await pool.query(
			"SELECT * FROM cart WHERE user_id = $1 AND artwork_id = $2 AND size = $3 AND frame_color = $4 AND cart_item_id != $5",
			[user_id, artwork_id, size, frame_color, cart_item_id]
		);


		if (duplicateItem.rows.length > 0) {
			return res.status(400).json({
				error:
					"This item with the same size and frame color is already in your cart.",
			});
		}


		const result = await pool.query(
			"UPDATE cart SET quantity = $1, frame_color = $2, size = $3, price_per_unit = $4, image_src = $5 WHERE cart_item_id = $6 AND user_id = $7 RETURNING *",
			[
				quantity,
				frame_color,
				size,
				price_per_unit,
				image_src,
				cart_item_id,
				user_id,
			]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "Cart item not found" });
		}


		res.status(200).json(result.rows[0]);
	} catch (err) {
		res
			.status(500)
			.json({ error: "Error updating cart item", details: err.message });
	}
});

// // Remove a poster from the cart
app.delete("/cart/:cart_item_id", authenticateToken, async (req, res) => {
	const { cart_item_id } = req.params;

	try {
		const user_id = req.user.user_id;


		const result = await pool.query(
			"DELETE FROM cart WHERE cart_item_id = $1 AND user_id = $2",
			[cart_item_id, user_id]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "Item not found in cart" });
		}

		res.status(204).send();
	} catch (err) {
		res
			.status(500)
			.json({ error: "Error removing item from cart", details: err.message });
	}
});

// // Remove all posters from the cart
app.delete("/cart", authenticateToken, async (req, res) => {
	try {
		const user_id = req.user.user_id;


		const result = await pool.query("DELETE FROM cart WHERE user_id = $1", [
			user_id,
		]);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "No cart items to delete" });
		}

		res.status(204).send();
	} catch (err) {
		res.status(500).json({
			error: "Error removing items from cart",
			details: err.message,
		});
	}
});

// //////////////////////// FAVORITES///////////////////////
// // Fetch all favorites
app.get("/favorite", authenticateToken, async (req, res) => {
	const user_id = req.user.user_id;

	try {
		const result = await pool.query(
			"SELECT * FROM favorite WHERE user_id = $1 ORDER BY created_at ASC",
			[user_id]
		);

		if (result.rows.length === 0) {
			return res.status(200).json([]);
		}

		const favorite = result.rows;

		res.status(200).json(favorite);
	} catch (err) {
		res
			.status(500)
			.json({ error: "Error fetching favorite", details: err.message });
	}
});

// // Add a poster to favorites
app.post(
	"/favorite/artwork/:artwork_id",
	authenticateToken,
	async (req, res) => {
		const { artwork_id } = req.params;
		const user_id = req.user.user_id;
		const { artwork } = req.body;

		try {
			const checkResult = await pool.query(
				`SELECT * FROM favorite WHERE artwork_id = $1 AND user_id = $2`,
				[artwork_id, user_id]
			);

			if (checkResult.rows.length > 0) {

				return res.status(409).json({
					message: "Artwork is already in favorites.",
				});
			}


			const insertQuery = `
        INSERT INTO favorite (
         favorite_item_id,
          user_id,
          artwork_id,
          artwork,
          created_at
        )
        VALUES (
          $1, $2, $3, $4, NOW()
        ) RETURNING *;
      `;
			const insertValues = [
				uuidv4(),
				user_id,
				artwork_id,
				artwork,
			];

			const result = await pool.query(insertQuery, insertValues);

			res.status(201).json(result.rows[0]);
		} catch (error) {
			console.error("Error adding artwork to favorite:", error);
			res.status(500).json({
				error: "Error adding artwork to favorite",
				details: error.message,
			});
		}
	}
);

// // Remove artwork_id a poster from favorites
app.delete("/favorite/:artwork_id", authenticateToken, async (req, res) => {
	const { artwork_id } = req.params;

	try {
		const user_id = req.user.user_id;


		const result = await pool.query(
			"DELETE FROM favorite WHERE artwork_id = $1 AND user_id = $2",
			[artwork_id, user_id]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: "Item not found in favorite" });
		}

		res.status(204).send();
	} catch (err) {
		res.status(500).json({
			error: "Error removing item from favorite",
			details: err.message,
		});
	}
});

// // Remove all posters from favorites
app.delete("/favorite", authenticateToken, async (req, res) => {
	try {
		const user_id = req.user.user_id;


		const result = await pool.query("DELETE FROM favorite WHERE user_id = $1", [
			user_id,
		]);



		if (result.rowCount === 0) {
			return res.status(404).json({ error: "No favorites to delete" });
		}

		res.status(204).send();
	} catch (err) {
		res.status(500).json({
			error: "Error removing items from favorite",
			details: err.message,
		});
	}
});

//////////////////////ORDERS//////////////////

////////Add new order///////////////////////////
app.post("/orders", authenticateToken, async (req, res) => {

	const user_id = req.user.user_id;
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

	let emptyFields = {};

	for (let field in req.body) {

		if (req.body[field].length === 0 && field !== "apt") {
			emptyFields[field] = "This field is required";
		}
	}
	if (Object.keys(emptyFields).length > 0) {
		return res.status(400).json(emptyFields);
	}

	try {


		const insertQuery = `
        INSERT INTO orders (
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
          created_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW()
        ) RETURNING *;
      `;
		const insertValues = [
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
		];

		const result = await pool.query(insertQuery, insertValues);

		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error("Error adding order to orders:", error);
		res.status(500).json({
			error: "Error adding order to orders",
			details: error.message,
		});
	}
});

//////////////////get new order///////////////
app.get("/orders", authenticateToken, async (req, res) => {
	const user_id = req.user.user_id;

	try {
		const result = await pool.query(
			"SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at ASC",
			[user_id]
		);

		if (result.rows.length === 0) {
			return res.status(200).json([]);
		}

		const orders = result.rows;

		res.status(200).json(orders);
	} catch (err) {
		res
			.status(500)
			.json({ error: "Error fetching orders", details: err.message });
	}
});
