import React, { useContext, useState } from "react";
import { updateCart } from "services/cart";
import AnimatedButton from "shared-components/AnimatedButton";
import { prices } from "shared-components/util";
import CartContext from "contexts/CartContext";

const CartEditForm = ({ cartItem, onEditingChange, setEditing }) => {
	const [selectedPrice, setSelectedPrice] = useState(cartItem.price_per_unit);
	const [error, setError] = useState("");

	const handleSizeChange = (e) => {
		const newSize = e.target.value;
		const newPrice = prices.find((item) => item.size === newSize)?.price;

		setFormData((prevData) => ({
			...prevData,
			size: newSize,
			price_per_unit: newPrice || prevData.price_per_unit,
		}));
		setSelectedPrice(newPrice);
	};

	const [selectedFrameColor, setSelectedFrameColor] = useState(
		cartItem.frame_color
	);

	const selectedImageSrc = cartItem.colors.find(
		(color) => color.frame_color === selectedFrameColor
	)?.src;


	const { fetchCart } = useContext(CartContext);

	const handleColorChange = (e) => {
		const newFrameColor = e.target.value;
		setSelectedFrameColor(newFrameColor);


		const newImageSrc = cartItem.colors.find(
			(color) => color.frame_color === newFrameColor
		)?.src;


		setFormData((prevData) => ({
			...prevData,
			frame_color: newFrameColor,
			image_src: newImageSrc || prevData.image_src,
		}));
	};

	const [formData, setFormData] = useState({
		quantity: cartItem.quantity,
		frame_color: cartItem.frame_color,
		size: cartItem.size,
		price_per_unit: selectedPrice,
		image_src: selectedImageSrc,
		artwork_id: cartItem.artwork_id,
	});
	const totalPrice = (selectedPrice * formData.quantity).toFixed(2);
	return (
		<>
			<img
				src={selectedImageSrc}
				alt=""
				className="w-28 object-cover"
				loading="lazy"
			/>
			<form
				className="flex flex-1 justify-between mx-4 md:flex-row flex-col w-full md:w-auto"
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						const res = await updateCart(cartItem.cart_item_id, formData);
						const data = await res.json();
						if (res.status === 400) {
							setError(data.error);
						} else {

							setError("");
							fetchCart();
							setEditing(false);
							onEditingChange(false);
						}
					} catch (err) {
						console.error("Error submitting order", err);
						setError({
							general: "Unable to submit the order. Please try again.",
						});
					}
				}}>
				<div className="flex-1 ">
					<div className="font-playfair text-xl justify-between">
						<div className="text-center md:text-left">
							{cartItem.artwork_name}
						</div>
						<div className="text-red-700 italic text-sm">{error}</div>
					</div>

					<div>
						<div className="flex md:my-1 my-4">
							<div className="w-24"> size:</div>

							<select
								className="w-full md:w-1/2 py-2 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent"
								name="size"
								onChange={handleSizeChange}
								value={formData.size}>
								{prices.map((item, index) => (
									<option key={index} value={item.size}>
										{item.size}
									</option>
								))}
							</select>
						</div>

						<div className="flex md:my-1 my-4">
							<div className="w-24"> frame color:</div>

							<select
								className="w-full md:w-1/2 py-2 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent"
								name="frame_color"
								onChange={handleColorChange}
								value={formData.frame_color}>
								{cartItem.colors.map((item, index) => (
									<option key={index} value={item.frame_color}>
										{item.frame_color}
									</option>
								))}
							</select>
						</div>
						<div className="flex md:my-1 my-4">
							<div className="w-24 "> qty:</div>

							<div className="flex text-fontColor md:justify-center justify-between h-10 border-2 border-fontColor w-full md:w-1/2">
								<button
									className="w-9"
									onClick={(e) => {
										e.preventDefault();
										if (formData.quantity > 1) {
											setFormData((prevData) => ({
												...prevData,
												quantity: formData.quantity - 1,
											}));
										}
									}}>
									<i className="fa-solid fa-minus"></i>
								</button>
								<div className=" w-9 flex justify-center items-center">
									{formData.quantity}
								</div>

								<button
									className="w-9"
									onClick={(e) => {
										e.preventDefault();

										setFormData((prevData) => ({
											...prevData,
											quantity: formData.quantity + 1,
										}));
									}}>
									<i className="fa-solid fa-plus"></i>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-between md:items-end items-center">
					<div>${totalPrice}</div>
					<button>
						<AnimatedButton
							text={"save"}
							mainBorder={"border-fontColor"}
							mainText={"text-fontColor"}
							hoverBorder={"border-fontColor"}
							hoverBg={"bg-fontColor"}
							hoverText={"group-hover:text-bkgrd"}
							pyVal={"py-1"}
							icon={<i className="fa-solid fa-floppy-disk mr-1 text-base"></i>}
						/>
					</button>
				</div>
			</form>
		</>
	);
};

export default CartEditForm;
