import clsx from "clsx";
import CartContext from "contexts/CartContext";
import SessionContext from "contexts/SessionContext";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MobileMenuModal = ({ openCart, handleClose }) => {
	const { username, signOut } = useContext(SessionContext);
	const { cart } = useContext(CartContext);
	let totalItems = 0;

	for (const item of cart) {
		totalItems += item.quantity;
	}

	return (
		<motion.div
			initial={{ translateY: "-100%" }}
			animate={{ translateY: 0 }}
			transition={{ duration: 0.5 }}
			className="text-bkgrd bg-primary pt-12 pb-6 w-52 text-lg rounded-bl-sm flex flex-col justify-start">
			{/* Username Section */}
			<div className="px-8 py-4 w-full flex items-center">
				<i className="fa-solid fa-user text-xl mr-3"></i>
				{username}
			</div>

			<Link to="/artwork" onClick={handleClose}>
				<button className="relative px-8 py-4 hover:bg-accent w-full flex items-center">
					<i className="fa-solid fa-quote-right text-xl mr-3"></i>shop artwork
				</button>
			</Link>

			<Link to="/my-account/favorites" onClick={handleClose}>
				<button className="relative px-8 py-4 hover:bg-accent w-full flex items-center">
					<i className="fa-regular fa-heart text-xl mr-3"></i>favorites
				</button>
			</Link>

			{/* Cart Button */}
			<button
				className="relative px-8 py-4 hover:bg-accent w-full flex items-center"
				onClick={() => {
					openCart();
					handleClose();
				}}>
				{/* Wrap the icon and badge in a relative container */}
				<div className="relative">
					<i className="fa-solid fa-cart-shopping text-xl mr-3"></i>
					<span
						className={clsx(
							"flex justify-center items-center absolute bg-secondary text-bkgrd rounded-full font-semibold text-sm leading-none",
							totalItems > 9
								? "w-7 h-7 -top-4 -right-2"
								: "w-5 h-5 -top-2 -right-1"
						)}>
						{totalItems}
					</span>
				</div>
				cart
			</button>

			{/* Orders Button */}
			<Link to="/my-account/orders" onClick={handleClose}>
				<button className="relative px-8 py-4 hover:bg-accent w-full flex items-center">
					<i className="fa-solid fa-box mr-3"></i>
					orders
				</button>
			</Link>

			{/* Sign Out Button */}
			<button
				onClick={signOut}
				className="px-8 py-4 hover:bg-accent w-full flex items-center">
				<i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
				sign out
			</button>
		</motion.div>
	);
};

export default MobileMenuModal;
