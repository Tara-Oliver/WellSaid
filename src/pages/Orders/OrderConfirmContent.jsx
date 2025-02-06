import React from "react";
import { shipping } from "shared-components/util";

const OrderConfirmContent = ({ order }) => {
	const shippingType = shipping.find(
		(item) =>
			Number(item.pricing) === Number(order.shipping_fee) ||
			Number(item.freePricing) === Number(order.shipping_fee)
	);

	let totalItems = 0;

	if (order.cart.length > 0) {
		for (const item of order.cart) {
			totalItems += item.quantity;
		}
	}

	const orderNumber = order.order_item_id.split("-")[0];

	return (
		<>
			<div className="flex md:flex-row flex-col md:justify-between  w-full items-center gap-y-2">
				<div className="capitalize">
					<p className="font-playfair font-semibold text-lg capitalize">
						Delivery Address
					</p>
					<p>
						{order.first_name} {order.last_name}
					</p>
					<p>{order.street_address}</p>
					<p>
						{order.city}, {order.state} {order.zip}
					</p>
				</div>

				<div>
					<p className="font-playfair font-semibold text-lg capitalize">
						delivery options
					</p>
					<p>Ordered on {order.order_date}</p>
					<p>{shippingType.name} Delivery</p>
					<p>Delivered in {shippingType.time}</p>
				</div>
			</div>
			<div className="border border-fontColor w-full my-6"></div>
			<div></div>
			<p className="text-center md:text-left font-playfair font-semibold text-lg capitalize">
				order details
			</p>
			<p className="text-center md:text-left">
				order number: <span className="uppercase">{orderNumber} </span>
			</p>

			<div className="flex w-full justify-between font-semibold lowercase">
				<div>Item Description</div>
				<div className="uppercase">$ USD</div>
			</div>
			{order.cart.map((item, idx) => (
				<div
					key={item.cart_item_id}
					className={`mb-4 py-2 flex w-full justify-between items-center ${
						idx !== 0 && "border-t border-neutral-200"
					}`}>
					<div className="flex items-center">
						<img
							src={item.image_src}
							alt=""
							className="w-24 object-cover h-28 mr-2"
						/>
						<div>
							{" "}
							<p>
								{item.artwork_name} - {item.frame_color}/{item.size}
							</p>
							<p>QTY: {item.quantity}</p>
						</div>
					</div>
					<div>{item.price_per_unit * item.quantity}</div>
				</div>
			))}
			<div className="border-t-2 border-fontColor w-full md:mx-4 my-2 flex justify-between mt-6 pt-10">
				subtotal: <span className="">${Number(order.subtotal).toFixed(2)}</span>{" "}
			</div>
			<div className="my-2 w-full md:mx-4 flex justify-between">
				shipping:{" "}
				<span className="">${Number(order.shipping_fee).toFixed(2)}</span>{" "}
			</div>
			<div className="my-2 w-full md:mx-4 flex justify-between font-bold">
				total: {`(${totalItems} item${totalItems === 1 ? "" : "s"})`}{" "}
				<span className="">${Number(order.total).toFixed(2)}</span>
			</div>
			<div className="my-2 w-full md:mx-4 flex justify-between ">
				payment method:{" "}
				<span className="">XXXX-XXXX-XXXX-{order.card_number.slice(-4)}</span>
			</div>
		</>
	);
};

export default OrderConfirmContent;
