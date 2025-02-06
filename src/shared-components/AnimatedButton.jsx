import React from "react";

const AnimatedButton = ({
	text,

	mainBorder,
	mainText,
	hoverBorder,
	hoverBg,
	mainBg,
	hoverText,
	icon,

	pyVal,
}) => {
	return (
		<div
			className={`relative inline-flex items-center justify-start pl-4 pr-12 overflow-hidden font-semibold transition-all duration-180 ease-in-out hover:pl-10 font-playfair hover:pr-6 group mt-6 border-2 ${mainBg} ${mainBorder} ${hoverBorder} ${pyVal}`}>
			<span
				className={`absolute left-0 block w-full h-0 transition-all ${hoverBg} opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease`}></span>

			<span
				className={`absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12 ${mainText} text-xl`}>
				{icon}
			</span>

			<span
				className={`absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200 ${hoverText} text-xl`}>
				{icon}
			</span>

			<span
				className={`relative w-full text-left transition-colors duration-200 ease-in-out ${mainText} ${hoverText} capitalize`}>
				{text}
			</span>
		</div>
	);
};

export default AnimatedButton;
