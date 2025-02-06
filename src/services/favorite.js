import apiFetch from "./apiFetch";

export const getAllFavorites = () => apiFetch("GET", "/favorite");

export const addArtworkToFavorites = (artworkId, body) =>
	apiFetch("POST", `/favorite/artwork/${artworkId}`, body);

export const removeArtworkFromFavorites = (artworkId) =>
	apiFetch("DELETE", `/favorite/${artworkId}`);

export const removeAllFavorites = () => apiFetch("DELETE", "/favorite");
