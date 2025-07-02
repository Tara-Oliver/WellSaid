// import React from "react";
import AuthForm2 from "pages/auth/AuthForm/AuthForm2";
import { createSession } from "services/user";
import { useContext } from "react";
import SessionContext from "contexts/SessionContext";
import React from "react";
import AuthLink from "pages/auth/AuthForm/AuthLink";

const SignInSection = ({ handleClose }) => {
	const sessionContext = useContext(SessionContext);

	return (
		<div className="bg-bkgrd right w-full md:w-1/2 flex flex-col justify-center">
			<div className="font-lato font-semibold px-2 mt-6 text-center text-wrap">
				Sign in to access favorites, orders, cart and checkout.
			</div>
			<AuthForm2
				fields={[
					{
						label: "username",
						type: "text",
						icon: false,
					},
					{
						label: "password",
						type: "password",
						icon: true,
					},
				]}
				submitButtonText="sign in"
				onClick={handleClose}
				text={"don't have an account? sign up"}
				onSubmit={async (formData) => {
					const res = await createSession({
						username: formData.username,
						password: formData.password,
					});

					const data = await res.json();

					if (res.status === 200) {
						sessionContext.signIn(data.sessionToken);
					} else {
						return data;
					}
				}}
			/>
			<AuthLink />
		</div>
	);
};

export default SignInSection;
