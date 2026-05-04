import { getSessionTokenStorage } from "services/user";

const apiFetch = (method, path, body = null) => {
	const options = {
		method,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};

	const sessionToken = getSessionTokenStorage();

	if (sessionToken) {
		options.headers["Authorization"] = `Bearer ${sessionToken}`;
	}

	if (body) {
		options.body = JSON.stringify(body);
	}

	return fetch("/api" + path, options);
};

export default apiFetch;
