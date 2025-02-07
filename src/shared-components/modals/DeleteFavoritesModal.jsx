import React from "react";
import { motion } from "framer-motion";
import AnimatedButton from "shared-components/AnimatedButton";
import { Link } from "react-router-dom";

const DeleteFavoritesModal = ({
	removeAllFavorites,
	handleClose,
	fetchOrdersAndFavorites,
}) => {
	return (
		<motion.div
			initial={{ translateX: "100%" }}
			animate={{ translateX: 0 }}
			transition={{ duration: 0.5 }}
			className="h-full w-full max-w-8xl flex flex-col p-8 items-center justify-center">
			<div className="bg-bkgrd max-w-xs flex flex-col items-center justify-center py-8 px-4 text-center font-lato">
				<div className="text-lg">
					Are you sure you want to delete all of your favorites?
				</div>
				<div className="flex  justify-around w-full">
					<Link onClick={handleClose} to="/my-account/favorites">
						<AnimatedButton
							text="Cancel"
							mainBorder={"border-fontColor"}
							pyVal={"py-2"}
							mainText={"text-fontColor"}
							hoverBorder={"border-fontColor"}
							hoverBg={"group-hover:bg-fontColor"}
							hoverText={"group-hover:text-bkgrd"}
							icon={<i className="fa-solid fa-ban mr-1"></i>}
						/>
					</Link>
					<Link
						to="/my-account/favorites"
						onClick={async () => {
							await removeAllFavorites();
							await fetchOrdersAndFavorites();
							handleClose();
						}}>
						<AnimatedButton
							text="Delete"
							mainBorder={"border-fontColor"}
							pyVal={"py-2"}
							mainText={"text-fontColor"}
							hoverBorder={"border-fontColor"}
							hoverBg={"group-hover:bg-fontColor"}
							hoverText={"group-hover:text-bkgrd"}
							icon={<i className="fa-solid fa-trash-can mr-1"></i>}
						/>
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default DeleteFavoritesModal;
