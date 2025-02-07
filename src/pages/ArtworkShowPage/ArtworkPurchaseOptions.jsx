import clsx from "clsx";
import CartContext from "contexts/CartContext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { addArtworkToCart } from "services/cart";
import AnimatedButton from "shared-components/AnimatedButton";
import ModalWrapper from "shared-components/modals/ModalWrapper";
import SizeModal from "shared-components/modals/SizeModal";
import { prices } from "shared-components/util";

import { FRAME_COLORS } from "shared-components/util";

const ArtworkPurchaseOptions = ({
	artwork,
	colors,
	imageIdx,
	setImageIdx,
	selectedPrice,
	setSelectedPrice,
	selectedSize,
	setSelectedSize,
}) => {
	const { setCartModalOpen } = useContext(CartContext);
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const [sizeModalOpen, setSizeModalOpen] = useState(false);
	const [errors, setErrors] = useState({});

	const handleSizeChange = (event) => {
		const size = event.target.value;

		if (size === "") {
			setSelectedSize(null);
			setSelectedPrice(null);
		} else {
			const selected = prices.find((item) => item.size === size);
			setSelectedSize(selected.size);
			setSelectedPrice(selected.price);
		}
	};

	const buttonIcon = loading ? (
		<i className="fas fa-circle-notch fa-spin mr-2 animate-spin"></i>
	) : (
		<i className="fa-solid fa-cart-plus mr-2"></i>
	);

	return (
		<>
			<form
				className="flex flex-col justify-start"
				onSubmit={async (e) => {
					e.preventDefault();
					setLoading(true);
					const res = await addArtworkToCart(artwork.artwork_id, {
						quantity,
						frame_color: artwork.images[imageIdx].frame_color,
						price_per_unit: selectedPrice,
						image_src: artwork.images[imageIdx].src,
						size: selectedSize,
						artwork_name: artwork.name,
						colors,
					});
					const data = res.json();

					try {
						if (res.status === 500) {

							setErrors(data);
						} else {
							setCartModalOpen(true);
						}
					} catch (err) {
						// console.error("Error submitting order", err);
					}
					setLoading(false);
				}}>
				<div className="my-8">
					<div className="text-primary flex ">
						<i className="fa-solid fa-brush text-2xl mr-2"></i>
						<p className="text-lg">Choose Your Frame Color:</p>
					</div>

					<div className="flex my-2">
						{colors.map((color, idx) => (
							<div key={idx} className="flex flex-col items-center mx-2">
								<div
									className={clsx(
										"w-11 h-11 border-2 border-bkgrd cursor-pointer transition ease-in-out duration-300",
										FRAME_COLORS[color.frame_color],
										idx === imageIdx && "shadow-[0_2px_0_0_#0e1015]"
									)}
									key={idx}
									onMouseEnter={() => setImageIdx(idx)}></div>
								<div
									className={clsx(
										"my-2 transition ease-in-out duration-300",
										idx === imageIdx ? "text-fontColor" : "text-fontColor/50"
									)}>
									{color.frame_color}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-between items-center">
					<div className="text-primary flex items-center my-2">
						<i className="fa-solid fa-ruler-combined text-2xl mr-2"></i>
						<p className="text-lg">Choose Your Frame Size:</p>
					</div>
					<Link
						onClick={() => setSizeModalOpen(true)}
						className="transition ease-in-out hover:underline duration-300 hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4 hover:decoration-solid text-lg text-primary">
						Size Chart
					</Link>
				</div>

				<select
					className="w-full py-2 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent"
					onChange={handleSizeChange}
					value={selectedSize || ""}>
					<option value="">Select a Size</option>
					{prices.map((item, index) => (
						<option key={index} value={item.size}>
							{item.size}
						</option>
					))}
				</select>

				<div className="flex justify-between items-center">
					<div className="flex flex-col my-8">
						<p className="text-lg text-primary">Quantity:</p>
						<div className="flex text-fontColor h-10 border-2 border-fontColor w-[108px]">
							<button
								className="w-9"
								onClick={() => {
									if (quantity > 1) {
										setQuantity(quantity - 1);
									}
								}}>
								<i className="fa-solid fa-minus"></i>
							</button>
							<div className=" w-9 flex justify-center items-center">
								{quantity}
							</div>

							<button className="w-9" onClick={() => setQuantity(quantity + 1)}>
								<i className="fa-solid fa-plus"></i>
							</button>
						</div>
					</div>
					{selectedPrice && (
						<div className="md:hidden block text-primary text-2xl">
							${selectedPrice}
						</div>
					)}
				</div>

				{selectedSize && artwork.images[imageIdx].frame_color && (
					<button>
						<AnimatedButton
							text={"Add To Cart"}
							mainBorder={"border-fontColor"}
							mainText={"text-fontColor"}
							hoverBorder={"border-fontColor"}
							hoverBg={"bg-fontColor"}
							hoverText={"group-hover:text-bkgrd"}
							icon={buttonIcon}
							pyVal={"py-3 w-full"}
						/>
					</button>
				)}
			</form>
			<ModalWrapper
				isOpen={sizeModalOpen}
				handleClose={() => setSizeModalOpen(false)}>
				<SizeModal />
			</ModalWrapper>
		</>
	);
};

export default ArtworkPurchaseOptions;
