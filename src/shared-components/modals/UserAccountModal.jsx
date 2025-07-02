import { motion } from "framer-motion";
import React, { useRef } from "react";
import { RemoveScroll } from "react-remove-scroll";
import SessionContext from "contexts/SessionContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserAccountModal = ({ isOpen, handleClose }) => {
	const { username, signOut } = useContext(SessionContext);
	const navigate = useNavigate();
	const backgroundRef = useRef();
	if (!isOpen) {
		return null;
	}

	return (
		<RemoveScroll>
			<div
				ref={backgroundRef}
				onClick={(e) => {
					if (e.target === backgroundRef.current) {
						handleClose();
					}
				}}
				className="fixed top-[100px] right-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-end items-start font-lato z-20">
				{username ? <motion.div
					initial={{ translateY: "-100%", translateX: "-31%" }}
					animate={{ translateY: "-10%", translateX: "-31%" }}
					transition={{ duration: 0.5 }}
					className="text-bkgrd bg-primary pt-4 pb-6 w-52 text-lg rounded-bl-sm flex flex-col justify-start">
					{/* Username Section */}
					<div className="px-8 py-4 w-full flex items-center text-secondary">
						<i className="fa-solid fa-user text-xl mr-3"></i>
						{username}
					</div>

					<Link to="/my-account/favorites" onClick={handleClose}>
						<button className="relative px-8 py-4 hover:bg-accent w-full flex items-center">
							<i className="fa-regular fa-heart text-xl mr-3"></i>favorites
						</button>
					</Link>

					{/* Orders Button */}
					<Link to="/my-account/orders" onClick={handleClose}>
						<button className="relative px-8 py-4 hover:bg-accent w-full flex items-center">
							<i className="fa-solid fa-box mr-3"></i>
							orders
						</button>
					</Link>

					{/* Sign Out Button */}
					<button
						onClick={signOut}
						className="px-8 py-4 hover:bg-accent w-full flex items-center">
						<i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
						sign out
					</button>
				</motion.div> : <motion.div
					initial={{ translateY: "-100%", translateX: "-31%" }}
					animate={{ translateY: "-10%", translateX: "-31%" }}
					transition={{ duration: 0.5 }}
						className="text-bkgrd bg-primary pt-4 pb-6 w-52 text-lg rounded-bl-sm flex flex-col justify-start">
						<button
						onClick={() => navigate("/sign-in")}
						className="px-8 py-4 hover:bg-accent w-full flex items-center">
						<i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
						sign in
					</button>
				</motion.div>}
			</div>
		</RemoveScroll>
	);
};

export default UserAccountModal;