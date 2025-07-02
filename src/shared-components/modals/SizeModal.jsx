import { motion } from "framer-motion";
import React from "react";

const SizeModal = () => {
	return (
		<motion.div
			initial={{ translateX: "100%" }}
			animate={{ translateX: 0 }}
			transition={{ duration: 0.5 }}
			className="h-full w-full max-w-8xl flex flex-col p-8 items-center justify-center">
			<img
				src="https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977038/size_guide_inksxc.webp"
				alt="size chart"
				loading="lazy"
			/>
		</motion.div>
	);
};

export default SizeModal;
