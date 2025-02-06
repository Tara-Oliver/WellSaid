import React, { useState } from "react";
import AnimatedButton from "shared-components/AnimatedButton";
import clsx from "clsx";
import OrderConfirmContent from "./OrderConfirmContent";

const OrderItem = ({ order, ordersLength, idx }) => {
	const orderNumber = order.order_item_id.split("-")[0];
	const [showDetails, setShowDetails] = useState(false);
	const buttonText = showDetails ? "Hide Details" : "Show Details";
	const buttonIcon = showDetails ? "-rotate-90" : "rotate-90";

	return (
		<div className=" md:p-6" key={idx}>
			{!showDetails && (
				<div className="flex justify-center">
					{order.cart.map((image, idx) => (
						<img
							key={idx}
							src={image.image_src}
							alt=""
							className="w-28 object-cover h-36 mx-4"
						/>
					))}
				</div>
			)}

			<div
				className={clsx(
					"flex md:flex-row flex-col justify-between items-center py-4",
					idx !== ordersLength - 1 && "border-b border-neutral-200"
				)}
				key={order.order_item_id}>
				<div className={clsx(showDetails ? "text-bkgrd" : "text-fontColor")}>
					<div className="flex my-1 ">
						<div className="w-28 font-bold">
							{" "}
							<i className="fa-solid fa-box mr-2"></i>
							order no:{" "}
						</div>
						<span className="uppercase">{orderNumber}</span>
					</div>

					<div className="flex my-1">
						<div className="w-28 font-bold">
							{" "}
							<i className="fa-solid fa-calendar-days mr-2"></i>
							order date:{" "}
						</div>
						{order.order_date}
					</div>
				</div>

				<div className="flex justify-end mx-4">
					<button onClick={() => setShowDetails(!showDetails)}>
						<AnimatedButton
							text={buttonText}
							pyVal={"py-3"}
							mainBorder={"border-fontColor"}
							mainText={"text-fontColor"}
							hoverBorder={"border-fontColor"}
							hoverBg={"group-hover:bg-fontColor"}
							hoverText={"group-hover:text-bkgrd"}
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="28"
									height="28"
									className={buttonIcon}
									viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.5.5 0 0 0 0-.74"
									/>
								</svg>

							}
						/>
					</button>
				</div>
			</div>
			{showDetails && <OrderConfirmContent order={order} />}
		</div>
	);
};

export default OrderItem;
