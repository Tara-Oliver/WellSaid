import React from "react";

const AuthLink = ({ handleSwitch, text }) => {
	return (
		<button
			onClick={handleSwitch}
			className="text-sm font-lato text-fontColor hover:underline font-semibold text-center">
			{text}
		</button>
	);
};

export default AuthLink;
