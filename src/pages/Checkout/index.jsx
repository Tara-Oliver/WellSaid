import React, { useState, useContext, useEffect } from "react";
import CartContext from "contexts/CartContext";
import RedirectToSignInIfSignedOut from "shared-components/RedirectToSignInIfSignedOut";
import { shipping } from "shared-components/util";
import CheckoutDetails from "./CheckoutDetails";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
	const { cart } = useContext(CartContext);
	const [cartIsEditing, setCartIsEditing] = useState(false);

	let totalItems = 0;
	let subtotal = 0;

	for (const item of cart) {
		totalItems += item.quantity;
		subtotal += item.quantity * item.price_per_unit;
	}

	const [shippingFee, setShippingFee] = useState(0);
	useEffect(() => {
		const fee = subtotal >= 109.99 ? 0.0 : shipping[0].pricing;
		setShippingFee(fee);
	}, [subtotal]);
	let totalCost = subtotal + shippingFee;

	return (
		<RedirectToSignInIfSignedOut>
			<div className="flex flex-col items-center min-h-screen bg-bkgrd font-lato">
				<div className="w-full max-w-8xl py-24 md:px-10 px-2">
					<div className="flex justify-between text-4xl text-primary items-center mb-8 font-playfair md:hidden">
						<div>
							<img
								src="https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaidpurple_alsabf.png"
								alt="Well said Logo"
								className="w-20"
							/>{" "}
							<p className="font-playfair text-sm tracking-wider font-bold uppercase">
								artwork
							</p>
						</div>
						Checkout
					</div>

					<div className="bg-primary text-bkgrd text-center font-bold my-10 text-lg md:hidden block px-1">
						<span className="">Note:</span> This is a demonstration site. Orders
						placed here are not real.{" "}
						<p>DO NOT ENTER ANY REAL PERSONAL DATA.</p>
					</div>
					<div className="flex-col-reverse md:flex-row flex justify-start gap-x-1 md:h-auto  w-full">
						<div className="flex flex-col mr-4 max-w-xl w-full md:overflow-auto  md:h-auto ">
							<div className="md:flex justify-between text-4xl px-4 text-primary items-center mb-8 font-playfair hidden">
								<div>
									<img
										src="https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaidpurple_alsabf.png"
										alt="Well said Logo"
										className="w-20"
									/>{" "}
									<p className="font-playfair text-sm tracking-wider font-bold uppercase">
										artwork
									</p>
								</div>
								Checkout
							</div>
							<div className="bg-primary text-bkgrd text-center font-bold my-10 text-lg md:hidden block px-1">
								<span className="">Note:</span> This is a demonstration site.
								Orders placed here are not real.{" "}
								<p>DO NOT ENTER ANY REAL PERSONAL DATA.</p>
							</div>
							<CheckoutForm
								totalCost={totalCost}
								shippingFee={shippingFee}
								subtotal={subtotal}
								shipping={shipping}
								totalItems={totalItems}
								setShippingFee={setShippingFee}
								cartIsEditing={cartIsEditing}
							/>
							<div className="bg-primary text-bkgrd text-center font-bold my-10 text-lg md:hidden block px-1">
								<span className="">Note:</span> This is a demonstration site.
								Orders placed here are not real.{" "}
								<p>DO NOT ENTER ANY REAL PERSONAL DATA.</p>
							</div>
						</div>

						<CheckoutDetails
							cart={cart}
							subtotal={subtotal}
							totalCost={totalCost}
							shippingFee={shippingFee}
							totalItems={totalItems}
							cartIsEditing={cartIsEditing}
							setCartIsEditing={setCartIsEditing}
						/>
					</div>
				</div>
			</div>
		</RedirectToSignInIfSignedOut>
	);
};

export default Checkout;
