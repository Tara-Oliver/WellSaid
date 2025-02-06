import React from "react";
import { useEffect, useContext } from "react";
import SessionContext from "contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const RedirectToSignInIfSignedOut = ({ children }) => {
	const navigate = useNavigate();
	const { username } = useContext(SessionContext);

	useEffect(() => {
		if (username === null) {
			navigate("/sign-in");
		}
	}, [username]);

	return <div>{children}</div>;
};

export default RedirectToSignInIfSignedOut;
