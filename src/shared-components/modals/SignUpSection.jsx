import AuthForm2 from "pages/auth/AuthForm/AuthForm2";
import React, { useContext } from "react";
import { createUser } from "services/user";
import SessionContext from "contexts/SessionContext";

const SignUpSection = ({ handleSwitch }) => {
	const sessionContext = useContext(SessionContext);

	return (
		<div className="bg-bkgrd right w-full md:w-1/2 flex flex-col justify-center mx-4">
			<div className="font-lato font-semibold px-2 mt-8 text-center text-wrap">
				Sign up to access favorites, orders, cart and checkout.
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
					{
						label: "confirmPassword",
						type: "password",
						icon: true,
					},
				]}
				submitButtonText="sign up"
				handleSwitch={handleSwitch}
				text={"already have an account? sign in"}
				onSubmit={async (formData) => {
					const res = await createUser({
						username: formData.username,
						password: formData.password,
						confirmPassword: formData.confirmPassword,
					});
					const data = await res.json();

					if (res.status === 200) {
						sessionContext.signIn(data.sessionToken);
					} else {
						return data;
					}
				}}
			/>
		</div>
	);
};

export default SignUpSection;
