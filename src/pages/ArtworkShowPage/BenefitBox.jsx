import React from "react";

const BenefitBox = ({ icon, title, description }) => {
	return (
		<div className="flex flex-col items-center justify-center text-xs px-2 py-4 flex-wrap flex-1">
			<div className="text-primary text-3xl">
				<i className={`fa-solid ${icon}`}></i>
			</div>
			<div className="my-1 text-fontColor font-semibold font-playfair">
				{title}
			</div>
			<div className="text-center text-neutral-700 whitespace-pre-wrap">
				{description}
			</div>
		</div>
	);
};

export default BenefitBox;
