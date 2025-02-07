import React from "react";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "../modals/CartModal";
import ModalWrapper from "../modals/ModalWrapper";
import MobileMenuModal from "../modals/MobileMenuModal";
import CartContext from "contexts/CartContext";
import clsx from "clsx";
import UserAccountModal from "shared-components/modals/UserAccountModal";

const Navbar = () => {
	const { cart, cartModalOpen, setCartModalOpen } = useContext(CartContext);
	const [shopOpen, setShopOpen] = useState(false);
	const [ordersOpen, setOrdersOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [showUserModal, setShowUserModal] = useState(false);
	const [favoritesOpen, setFavoritesOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	let totalItems = 0;
	let subtotal = 0;

	if (cart.length > 0) {
		for (const item of cart) {
			totalItems += item.quantity;
			subtotal += item.quantity * item.price_per_unit;
		}
	}

	console.log("ti", totalItems, "-", "cart", cart.length);
	return (
		<>
			<nav
				className="w-screen flex justify-center bg-primary text-bkgrd font-lato"
				onMouseLeave={() => setShopOpen(false)}>
				<div className="w-full max-w-5xl flex justify-between items-center py-2 px-8 ">
					<Link to="/">
						<div className="flex flex-col items-center">
							<img
								src="https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaidwhite_kg7qaa.png"
								alt="Well Said Logo"
								className="w-16 mr-2"
								loading="lazy"
							/>
							<p className="font-playfair text-sm tracking-wider font-bold uppercase">
								artwork
							</p>
						</div>
					</Link>

					<div className="sm:flex justify-end flex-1 hidden items-center">
						<div className="relative mx-2">
							<Link to="/artwork">
								<button
									className="flex items-center"
									onMouseEnter={() => {
										setShopOpen(true);
									}}
									onMouseLeave={() => {
										setShopOpen(false);
									}}>
									<i className="fa-solid fa-quote-right text-xl mr-3 hover:text-secondary transition ease-in-out duration-300"></i>
								</button>
							</Link>
							{shopOpen && (
								<div className="bg-secondary text-bkgrd rounded-sm absolute py-1 px-2 shadow-lg top-12 -left-12 text-nowrap after:content-[''] after:absolute after:-top-[1.02rem] after:left-1/2 after:border-b-[10px] after:border-b-secondary after:border-t-[10px] after:border-t-transparent after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:-translate-x-[13px] z-30">
									shop collection
								</div>
							)}
						</div>

						<div className="relative mx-2">
							<Link to="/my-account/favorites">
								<button
									className="flex items-center"
									onMouseEnter={() => {
										setFavoritesOpen(true);
									}}
									onMouseLeave={() => {
										setFavoritesOpen(false);
									}}>
									<i className="fa-solid fa-heart mr-3 text-xl hover:text-secondary transition ease-in-out duration-300"></i>
								</button>
							</Link>

							{favoritesOpen && (
								<div className="bg-secondary text-bkgrd absolute py-1 px-2 rounded-sm shadow-lg top-12 -left-6 text-nowrap after:content-[''] after:absolute after:-top-[1.02rem] after:left-1/2 after:border-b-[10px] after:border-b-secondary after:border-t-[10px] after:border-t-transparent after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:-translate-x-[13px] z-30">
									favorites
								</div>
							)}
						</div>

						<div className="relative mx-2">
							<button
								className="flex items-center relative"
								onClick={() => setCartModalOpen(true)}
								onMouseEnter={() => {
									setCartOpen(true);
								}}
								onMouseLeave={() => {
									setCartOpen(false);
								}}>
								<span
									className={clsx(
										"flex justify-center items-center absolute bg-secondary text-bkgrd rounded-full font-semibold text-sm  font-playfair",
										totalItems > 9
											? "w-7 h-7 -top-4 right-[25px]"
											: "w-5 h-5 -top-[.55rem] right-0"
									)}>
									{totalItems}
								</span>
								<i className="fa-solid fa-cart-shopping text-xl mr-3 hover:text-secondary transition ease-in-out duration-300"></i>
							</button>

							{cartOpen && (
								<div className="bg-secondary text-bkgrd absolute py-1 px-2 rounded-sm shadow-lg top-12 -left-1.5 text-nowrap after:content-[''] after:absolute after:-top-[1.02rem] after:left-1/2 after:border-b-[10px] after:border-b-secondary after:border-t-[10px] after:border-t-transparent after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:-translate-x-[13px] z-30">
									cart
								</div>
							)}
						</div>

						<div className="relative mx-2">
							<Link to="/my-account/orders">
								<button
									className="flex items-center"
									onMouseEnter={() => {
										setOrdersOpen(true);
									}}
									onMouseLeave={() => {
										setOrdersOpen(false);
									}}>
									<i className="fa-solid fa-box mr-3 text-xl hover:text-secondary transition ease-in-out duration-300"></i>
								</button>
							</Link>

							{ordersOpen && (
								<div className="bg-secondary text-bkgrd absolute py-1 px-2 rounded-sm shadow-lg top-12 -left-5 text-nowrap after:content-[''] after:absolute after:-top-[1.02rem] after:left-1/2 after:border-b-[10px] after:border-b-secondary after:border-t-[10px] after:border-t-transparent after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:-translate-x-[13px] z-30">
									orders
								</div>
							)}
						</div>
					</div>

					<div className="relative mx-2">
						<button
							className="flex items-center"
							onMouseEnter={() => {
								setUserMenuOpen(true);
							}}
							onMouseLeave={() => {
								setUserMenuOpen(false);
							}}
							onClick={() => setShowUserModal(!showUserModal)}>
							<i className="fa-solid fa-user text-xl mr-3 hover:text-secondary transition ease-in-out duration-300"></i>
						</button>

						{userMenuOpen && (
							<div className="bg-secondary text-bkgrd absolute py-1 px-2 rounded-sm shadow-lg top-12 -left-9 text-nowrap after:content-[''] after:absolute after:-top-[1.02rem] after:left-1/2 after:border-b-[10px] after:border-b-secondary after:border-t-[10px] after:border-t-transparent after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent after:-translate-x-[13px] z-20">
								my account
							</div>
						)}
					</div>

					<button
						className="flex sm:hidden text-4xl"
						onClick={() => setMobileMenuOpen(true)}>
						<i className="fa-solid fa-bars"></i>
					</button>
				</div>
			</nav>

			<UserAccountModal
				isOpen={showUserModal}
				handleClose={() => setShowUserModal(false)}
			/>
			<ModalWrapper
				isOpen={cartModalOpen}
				handleClose={() => setCartModalOpen(false)}>
				<CartModal handleClose={() => setCartModalOpen(false)} />
			</ModalWrapper>

			<ModalWrapper
				isOpen={mobileMenuOpen}
				handleClose={() => setMobileMenuOpen(false)}>
				<MobileMenuModal
					openCart={() => {
						setMobileMenuOpen(false);
						setCartModalOpen(true);
					}}
					handleClose={() => setMobileMenuOpen(false)}
				/>
			</ModalWrapper>
		</>
	);
};

export default Navbar;
