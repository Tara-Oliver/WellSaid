import apiFetch from "./apiFetch";

export const getCart = () => apiFetch("GET", "/cart");

export const addArtworkToCart = (artworkId, body) =>
	apiFetch("POST", `/cart/artwork/${artworkId}`, body);

export const removeArtworkFromCart = (itemId) =>
	apiFetch("DELETE", `/cart/${itemId}`);

export const updateCart = (itemId, body) =>
	apiFetch("PUT", `/cart/${itemId}`, body);

export const emptyCart = () => apiFetch("DELETE", "/cart");
