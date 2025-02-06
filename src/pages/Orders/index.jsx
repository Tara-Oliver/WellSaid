import React from "react";
import OrderItem from "./OrderItem";

const Orders = ({ orders, initialized }) => {
	return (
		<div className="w-full p-4">
			{initialized && orders.length === 0 ? (
				<div className="flex flex-col items-center justify-center font-playfair text-fontColor">
					<p className="text-3xl">No orders yet?</p>
					<p>Guess it’s time to treat your walls to some personality.</p>
				</div>
			) : (
				<div>
					<div className="flex justify-between w-full items-center md:flex-row flex-col-reverse">
						<p className="font-playfair text-xl my-2 text-center md:text-left">
							{`Displaying ${orders.length} order${
								orders.length === 1 ? "" : "s"
							}`}{" "}
						</p>
						<div className="bg-primary text-bkgrd text-center font-bold my-10 text-lg md:hidden block px-1">
							<span className="">Note:</span> This is a demonstration site.
							Orders placed here are not real.{" "}
						</div>
					</div>

					{orders.map((order, idx) => (
						<OrderItem
							order={order}
							idx={idx}
							ordersLength={orders.length}
							key={idx}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Orders;
