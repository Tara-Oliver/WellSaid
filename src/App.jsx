import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ArtworkListPage from "./pages/ArtworkListPage";
import { getAllFavorites } from "services/favorite";
import { getAllOrders } from "services/order";
import { useCallback, useEffect, useState } from "react";
import {
	getSessionTokenStorage,
	removeSessionTokenStorage,
	setSessionTokenStorage,
} from "services/user";
import SessionContext from "contexts/SessionContext";
import { jwtDecode } from "jwt-decode";
import ArtworkShowPage from "pages/ArtworkShowPage";
import ScrollToTop from "shared-components/ScrollToTop";
import CartContext from "contexts/CartContext";
import { getCart } from "services/cart";
import Home from "pages/Home";
// import FavoritesPage from "pages/FavoritesPage";
import Checkout from "pages/Checkout";

import MyAcct from "pages/MyAcct";
import ConfirmationPage from "pages/ConfirmationPage";

const App = () => {
	const [sessionToken, setSessionToken] = useState(() =>
		getSessionTokenStorage()
	);
	const [cart, setCart] = useState([]);
	const [orders, setOrders] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [initialized, setInitialized] = useState(false);
	const [cartModalOpen, setCartModalOpen] = useState(false);

	const fetchCart = useCallback(async () => {
		const res = await getCart();
		const data = await res.json();
		setCart(data);
	}, []);

	const fetchOrdersAndFavorites = async () => {
		setLoading(true);
		try {
			if (sessionToken) {
				const favRes = await getAllFavorites();
				const favData = await favRes.json();
				const orderRes = await getAllOrders();
				const orderData = await orderRes.json();
				setFavorites(favData);
				setOrders(orderData);
			} else {
				console.error("Failed to fetch favorites");
			}
		} catch (err) {
			console.error("Error fetching favorites:", err);
		}
		setLoading(false);
		setInitialized(true);
	};

	useEffect(() => {
		fetchCart();
		fetchOrdersAndFavorites();
	}, [sessionToken, location.pathname, fetchCart]);

	const handleRemove = (artworkId) => {
		// Update favorites list by removing the item
		setFavorites((prevFavorites) =>
			prevFavorites.filter((item) => item.artwork.artwork_id !== artworkId)
		);
	};

	// useEffect(() => {
	// 	let totalItems = 0;
	// 	let subtotal = 0;
	// 	// console.log(cart);
	// 	if (cart.length !== 0) {
	// 		for (const item of cart) {
	// 			totalItems += item.quantity;
	// 			subtotal += item.quantity * item.price_per_unit;
	// 		}
	// 	}
	// }, [cart]);

	return (
		<SessionContext.Provider
			value={{
				username: sessionToken ? jwtDecode(sessionToken).username : null,
				signIn: (sessionToken) => {
					setSessionToken(sessionToken);
					setSessionTokenStorage(sessionToken);
				},
				signOut: () => {
					setSessionToken(null);
					removeSessionTokenStorage();
				},
			}}>
			<CartContext.Provider
				value={{
					cart,
					setCart,
					fetchCart,
					cartModalOpen,
					setCartModalOpen,
				}}>
				<BrowserRouter>
					<ScrollToTop />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/sign-in" element={<SignInPage />} />
						<Route path="/sign-up" element={<SignUpPage />} />

						<Route
							path="/my-account/:section"
							element={
								<MyAcct
									loading={loading}
									favorites={favorites}
									handleRemove={handleRemove}
									initialized={initialized}
									fetchOrdersAndFavorites={fetchOrdersAndFavorites}
									orders={orders}
								/>
							}
						/>
						<Route
							path="/artwork"
							element={
								<ArtworkListPage
									favorites={favorites}
									handleRemove={handleRemove}
								/>
							}
						/>
						<Route path="/artwork/:artwork_id" element={<ArtworkShowPage />} />
						<Route
							path="/order-confirmation/:order_id"
							element={<ConfirmationPage />}
						/>
					</Routes>
				</BrowserRouter>
			</CartContext.Provider>
		</SessionContext.Provider>
	);
};

export default App;
