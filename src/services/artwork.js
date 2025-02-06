import apiFetch from "./apiFetch";

export const getAllArtwork = () => apiFetch("GET", "/artwork");

export const getArtworkById = (artworkId) =>
	apiFetch("GET", `/artwork/${artworkId}`);

export const updateArtworkById = (artworkId, body) =>
	apiFetch("PUT", `/artwork/${artworkId}/favorite`, body);
