import React, { useState, useContext } from "react";
import CartContext from "contexts/CartContext";
import { Link } from "react-router-dom";
import { removeArtworkFromCart } from "services/cart";
import CartEditForm from "./CartEditForm";
import AnimatedButton from "shared-components/AnimatedButton";

const CartItem = ({ cartItem, onEditingChange }) => {
	const totalPrice = (cartItem.price_per_unit * cartItem.quantity).toFixed(2);
	const [editing, setEditing] = useState(false);
	const { fetchCart } = useContext(CartContext);

	return (
		<div className="flex flex-col md:flex-row py-5 items-center md:items-start">
			{editing ? (
				<CartEditForm
					cartItem={cartItem}
					onEditingChange={onEditingChange}
					setEditing={setEditing}
				/>
			) : (
				<>
					<img
						src={cartItem.image_src}
						alt=""
						className="w-28 object-cover"
						loading="lazy"
					/>

					<div className="w-full flex-1 flex md:flex-row flex-col mx-4 md:justify-between items-center ">
						<>
							<div className=" w-full flex flex-col items-center justify-center md:block">
								<Link to={`/artwork/${cartItem.artwork_id}`}>
									<div className="font-playfair text-xl  transition ease-in-out hover:underline duration-300 hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4">
										{cartItem.artwork_name}
									</div>
								</Link>

								<div className="md:w-auto ">
									<div className="flex my-1 text-nowrap  w-full text-center md:text-left">
										<div className="w-24"> size:</div>
										{cartItem.size}
									</div>

									<div className="flex my-1 w-full text-center md:text-left">
										<div className="w-24"> frame color:</div>

										{cartItem.frame_color}
									</div>
									<div className="flex my-1 w-full text-center md:text-left">
										<div className="w-24 "> qty:</div>

										{cartItem.quantity}
									</div>
								</div>
							</div>

							<div className="flex flex-col justify-between items-end">
								<div className="w-full md:w-auto text-center md:text-left">
									${totalPrice}
								</div>

								<div className="flex w-56 justify-between gap-x-1 ">
									<button
										onClick={() => {
											setEditing(true);
											onEditingChange(true);
										}}>
										<AnimatedButton
											text={"edit"}
											mainBorder={"border-fontColor"}
											mainText={"text-fontColor"}
											hoverBorder={"border-fontColor"}
											hoverBg={"group-hover:bg-fontColor"}
											pyVal={"py-1"}
											hoverText={"group-hover:text-bkgrd"}
											icon={<i className="fa-solid fa-pen mr-1 text-base"></i>}
										/>
									</button>
									<button
										onClick={async () => {
											await removeArtworkFromCart(cartItem.cart_item_id);
											fetchCart();
										}}>
										<AnimatedButton
											text={"delete"}
											mainBorder={"border-fontColor"}
											mainText={"text-fontColor"}
											pyVal={"py-1"}
											hoverBorder={"border-fontColor"}
											hoverBg={"group-hover:bg-fontColor"}
											hoverText={"group-hover:text-bkgrd"}
											icon={
												<i className="fa-solid fa-trash-can mr-1 text-base"></i>
											}
										/>
									</button>
								</div>
							</div>
						</>
					</div>
				</>
			)}
		</div>
	);
};

export default CartItem;
