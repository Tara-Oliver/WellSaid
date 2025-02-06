import React from "react";
import CartItem from "shared-components/modals/CartModal/CartItem";
import clsx from "clsx";

const CheckoutDetails = ({
	cart,
	subtotal,
	totalCost,
	shippingFee,
	totalItems,
	cartIsEditing,
	setCartIsEditing,
}) => {
	return (
		<div className="flex flex-wrap justify-center flex-1 max-h-fit md:sticky top-0 md:z-10 ">

			{cart.map((cartItem, idx) => (
				<div
					key={cartItem.cart_item_id}
					className={clsx(
						"md:mx-4 w-full",
						idx !== 0 && "border-t border-neutral-200"
					)}>
					<CartItem
						cartItem={cartItem}
						onEditingChange={(editing) => setCartIsEditing(editing)}
					/>
				</div>
			))}

			{!cartIsEditing && (
				<>
					<div className="border-t-2 border-fontColor w-full mx-4 my-2 flex justify-between mt-6 pt-10">
						subtotal: <span className="">${subtotal.toFixed(2)}</span>{" "}
					</div>
					<div className="my-2 w-full mx-4 flex justify-between">
						shipping: <span className="">${shippingFee.toFixed(2)}</span>{" "}
					</div>
					<div className="my-2 w-full mx-4 flex justify-between font-bold">
						total: {`(${totalItems} item${totalItems === 1 ? "" : "s"})`}{" "}
						<span className="">${totalCost.toFixed(2)}</span>
					</div>
				</>
			)}
		</div>
	);
};

export default CheckoutDetails;
