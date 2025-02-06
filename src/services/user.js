import apiFetch from "./apiFetch";

export const createUser = ({ username, password, confirmPassword }) =>
	apiFetch("POST", "/users", {
		username,
		password,
		confirmPassword,
	});

export const createSession = ({ username, password }) =>
	apiFetch("POST", "/users/session", {
		username,
		password,
	});

const SESSION_TOKEN_KEY = "session_token";

export const setSessionTokenStorage = (sessionToken) =>
	localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);

export const getSessionTokenStorage = () =>
	localStorage.getItem(SESSION_TOKEN_KEY);

export const removeSessionTokenStorage = () =>
	localStorage.removeItem(SESSION_TOKEN_KEY);
