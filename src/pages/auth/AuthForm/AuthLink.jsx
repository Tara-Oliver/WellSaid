import React from "react";
// import { Link } from "react-router-dom";

const AuthLink = ({ onClick, text }) => {
	return (
		<button
			onClick={onClick}
			className="text-sm font-lato text-fontColor hover:underline font-semibold text-center">
			{text}
		</button>
	);
};

export default AuthLink;
