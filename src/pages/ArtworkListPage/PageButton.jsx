import clsx from "clsx";
import React from "react";

const PageButton = ({ icon, show, onClick }) => {
	return (
		<button
			className={clsx(
				"text-xl",
				show ? "text-fontColor" : "text-fontColor/40 cursor-not-allowed"
			)}
			onClick={onClick}>
			<i className={`${icon} mx-mx`}></i>
		</button>
	);
};

export default PageButton;
