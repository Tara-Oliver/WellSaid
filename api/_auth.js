import jwt from "jsonwebtoken";

export function getUser(req, res) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		res.status(401).json({ error: "Token required" });
		return null;
	}

	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch {
		res.status(403).json({ error: "Invalid token" });
		return null;
	}
}
