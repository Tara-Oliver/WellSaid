import { getSessionTokenStorage } from "services/user";
const { VITE_API_BASE_URL } = import.meta.env;
const apiFetch = (method, path, body = null) => {
	const options = {
		method,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};

	console.log(VITE_API_BASE_URL);
	const sessionToken = getSessionTokenStorage();

	if (sessionToken) {
		options.headers["Authorization"] = `Bearer ${sessionToken}`;
	}

	if (body) {
		options.body = JSON.stringify(body);
	}

	return fetch(VITE_API_BASE_URL + path, options);
};

export default apiFetch;
