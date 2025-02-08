import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "shared-components/Navbar";
import RedirectToSignInIfSignedOut from "shared-components/RedirectToSignInIfSignedOut";
import OrderConfirmContent from "./Orders/OrderConfirmContent";
import AnimatedButton from "shared-components/AnimatedButton";
import Footer from "shared-components/Footer";

const ConfirmationPage = () => {
	const location = useLocation();
	const order = location.state.order;

	return (
		<RedirectToSignInIfSignedOut>
			<Navbar />
			<div className=" min-h-screen bg-bkgrd font-lato">
				<div className="w-full max-w-8xl py-24 flex flex-col items-center">
					<div className="flex flex-col justify-center items-center md:px-12 md:w-3/5 w-full px-4">
						<div className="bg-primary text-bkgrd text-center font-bold my-10 text-lg p-1">
							<span className="">Note:</span> This is a demonstration site.
							Orders placed here are not real.{" "}
						</div>
						<p className="text-primary text-4xl font-playfair">
							Order Confirmation
						</p>

						<p className="text-2xl my-6 font-semibold">It's Ordered!</p>
						<p className="">
							Hi {order.first_name}-thanks for letting us frame your world!
						</p>
						<div className="border border-fontColor w-full my-6"></div>
						<OrderConfirmContent order={order} />
						<div className="bg-primary text-bkgrd text-center font-bold my-10 text-lg p-1">
							<span className="">Note:</span> This is a demonstration site.
							Orders placed here are not real.{" "}
						</div>
						<div className="flex justify-center my-4">
							<Link to="/artwork">
								<AnimatedButton
									text={"Shop Collection"}
									mainBorder={"border-fontColor"}
									mainText={"text-fontColor"}
									hoverBorder={"border-fontColor"}
									hoverBg={"group-hover:bg-fontColor"}
									pyVal={"py-3"}
									hoverText={"group-hover:text-bkgrd"}
									icon={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="28"
											height="28"
											viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.5.5 0 0 0 0-.74"
											/>
										</svg>
									}
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</RedirectToSignInIfSignedOut>
	);
};

export default ConfirmationPage;
