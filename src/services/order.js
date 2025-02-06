import apiFetch from "./apiFetch";

export const placeNewOrder = (body) => apiFetch("POST", "/orders", body);

export const getAllOrders = () => apiFetch("GET", "/orders");
