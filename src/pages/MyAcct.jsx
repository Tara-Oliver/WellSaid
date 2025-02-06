import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "shared-components/LoadingSpinner";
import Navbar from "shared-components/Navbar";
import RedirectToSignInIfSignedOut from "shared-components/RedirectToSignInIfSignedOut";
import "style.css";
import Favs from "./Favs";
import Orders from "./Orders";
import clsx from "clsx";
import AnimatedButton from "shared-components/AnimatedButton";

const MyAcct = ({
	favorites,
	handleRemove,
	loading,
	initialized,
	orders,
	fetchOrdersAndFavorites,
}) => {
	const { section } = useParams();
	const [toastMessage, setToastMessage] = useState("");
	const [showToast, setShowToast] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		fetchOrdersAndFavorites();
		setActiveSection(section);
	}, [section, activeSection]);

	return (
		<RedirectToSignInIfSignedOut>
			<Navbar />
			<div className="flex justify-center bg-bkgrd min-h-screen">
				<div className="flex flex-col w-full max-w-8xl py-24 px-4 ">
					<div className="flex-col md:flex-row flex justify-between font-lato">
						<div className="flex flex-col md:py-0 py-4">
							<p className="mb-6 font-playfair text-primary text-4xl capitalize px-4 text-center md:text-left">
								My Account
							</p>
							<Link
								to="/my-account/favorites"
								className={clsx(
									"transition ease-in-out duration-100 hover:underline  hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4 lowercase hover:text-secondary my-2",
									activeSection === "favorites"
										? "text-secondary font-bold underline underline-offset-4 decoration-2"
										: "text-fontColor"
								)}>
								Favorites
							</Link>

							<Link
								to="/my-account/orders"
								className={clsx(
									"transition ease-in-out duration-100 hover:underline  hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4 lowercase hover:text-secondary my-2",
									activeSection === "orders"
										? "text-secondary font-bold underline underline-offset-4 decoration-2"
										: "text-fontColor"
								)}>
								orders
							</Link>
						</div>

						{loading ? (
							<div className="w-full  flex justify-center items-center h-1/2">
								<LoadingSpinner />
							</div>
						) : (
							<div className="flex flex-col items-center relative w-full md:w-3/4 ">
								{activeSection === "favorites" ? (
									<Favs
										favorites={favorites}
										handleRemove={handleRemove}
										initialized={initialized}
										fetchOrdersAndFavorites={fetchOrdersAndFavorites}
										setShowToast={setShowToast}
										setToastMessage={setToastMessage}
									/>
								) : (
									<Orders orders={orders} initialized={initialized} />
								)}
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
						)}
					</div>
				</div>
				<div
					className={clsx(
						"font-lato w-full max-w-sm fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-fontColor text-bkgrd text-center px-4 py-2 transition-transform duration-300 ease-in-out z-20",
						showToast ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
					)}>
					{toastMessage}
				</div>
			</div>
		</RedirectToSignInIfSignedOut>
	);
};

export default MyAcct;
