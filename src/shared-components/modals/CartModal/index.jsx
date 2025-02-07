import SessionContext from "contexts/SessionContext";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "shared-components/LoadingSpinner";
import CartItem from "./CartItem";
import clsx from "clsx";
import CartContext from "contexts/CartContext";
import AnimatedButton from "shared-components/AnimatedButton";
import { emptyCart } from "services/cart";
import { Link } from "react-router-dom";

const CartModal = ({ handleClose }) => {
	const { username } = useContext(SessionContext);
	const [loading, setLoading] = useState(false);
	const { cart, fetchCart } = useContext(CartContext);
	const [cartIsEditing, setCartIsEditing] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchCart();
		setLoading(false);
	}, [fetchCart]);

	let totalItems = 0;
	let subtotal = 0;

	for (const item of cart) {
		totalItems += item.quantity;
		subtotal += item.quantity * item.price_per_unit;
	}

	return (
		<motion.div
			initial={{ translateX: "100%" }}
			animate={{ translateX: 0 }}
			transition={{ duration: 0.5 }}
			className="h-full bg-bkgrd w-full max-w-2xl flex flex-col pb-8 text-fontColor font-lato">
			<div className="bg-primary text-bkgrd flex md:justify-around items-center pb-6 border-2 border-yellow-400">
				<p className="relative inline-flex items-center justify-start pl-4 md:pr-12 pr-4 overflow-hidden font-semibold mt-6 text-2xl">
					{username}'s Cart
				</p>

				<button
					onClick={async () => {
						await emptyCart();
						fetchCart();
					}}>
					<AnimatedButton
						text={"Empty Cart"}
						mainBorder={"border-bkgrd"}
						mainText={"text-bkgrd"}
						hoverBorder={"hover:border-primary"}
						hoverBg={"bg-bkgrd"}
						pyVal={"py-1"}
						hoverText={"group-hover:text-primary"}
						icon={<i className="fa-solid fa-trash"></i>}
					/>
				</button>
			</div>

			<div className="flex flex-col flex-1 justify-between overflow-y-auto">
				<div>
					{loading ? (
						<LoadingSpinner />
					) : cart.length === 0 ? (
						<div className="capitalize py-20 flex flex-col items-center  text-xl">
							<i className="fas fa-cart-plus text-4xl "></i>
							your cart is empty
						</div>
					) : (
						cart.map((cartItem, idx) => (
							<div
								key={cartItem.cart_item_id}
								className={clsx(
									"mx-4",
									idx !== 0 && "border-t border-neutral-200"
								)}>
								<CartItem
									cartItem={cartItem}
									onEditingChange={(editing) => setCartIsEditing(editing)}
								/>
							</div>
						))
					)}
				</div>

				<div
					className={clsx(
						"text-neutral-500 flex flex-col mx-5  items-center",
						cart.length > 0 && !cartIsEditing && "border-t-2 border-fontColor"
					)}>
					{cart.length === 0 ? (
						<Link to="/artwork" onClick={handleClose}>
							<AnimatedButton
								text={"Continue Shopping"}
								mainBorder={"border-fontColor"}
								mainText={"text-fontColor"}
								hoverBorder={"border-fontColor"}
								hoverBg={"bg-fontColor"}
								pyVal={"py-3"}
								hoverText={"group-hover:text-bkgrd"}
								icon={<i className="fas fa-long-arrow-alt-right"></i>}
							/>
						</Link>
					) : !cartIsEditing ? (
						<>
							<div className="flex justify-between mt-2 mb-4 text-fontColor  w-full">
								<div className="">
									{`${totalItems} item${totalItems === 1 ? "" : "s"}`}{" "}
								</div>
								<div className="">
									subtotal: <span className="">${subtotal.toFixed(2)}</span>{" "}
								</div>
							</div>

							<Link to="/checkout" onClick={handleClose}>
								<AnimatedButton
									text={"proceed to checkout"}
									mainBorder={"border-fontColor"}
									mainText={"text-fontColor"}
									hoverBorder={"border-fontColor"}
									hoverBg={"bg-fontColor"}
									hoverText={"group-hover:text-bkgrd"}
									pyVal={"py-3 w-full"}
									icon={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="28"
											height="28"
											viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.5.5 0 0 0 0-.74"
											/>
										</svg>
									}
								/>
							</Link>
						</>
					) : null}
				</div>
			</div>
		</motion.div>
	);
};

export default CartModal;
