import { motion } from "framer-motion";
import React, { useRef } from "react";
import { RemoveScroll } from "react-remove-scroll";

const ModalWrapper = ({ children, isOpen, handleClose }) => {
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
						console.log("modalClosed");
					}
				}}
				className="fixed top-0 right-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-end items-start font-lato z-20">
				<motion.button
					className="absolute top-0 right-0 z-10 p-2"
					onClick={handleClose}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}>
					<i className="text-3xl fa-solid fa-xmark text-bkgrd"></i>
				</motion.button>
				{children}
			</div>
		</RemoveScroll>
	);
};

export default ModalWrapper;
