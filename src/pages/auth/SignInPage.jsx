import React from "react";
import AuthForm from "./AuthForm";
import FormContainer from "./FormContainer";
import { Link } from "react-router-dom";
import { createSession } from "services/user";
import { useContext } from "react";
import SessionContext from "contexts/SessionContext";
import RedirectToPostersIfSignedIn from "shared-components/RedirectToPostersIfSignedIn";

const SignInPage = () => {
	const sessionContext = useContext(SessionContext);
	return (
		<RedirectToPostersIfSignedIn>
			<FormContainer>
			<div className="font-lato font-semibold px-4 text-center">Sign in to access favorites, orders, cart and checkout.</div>
				<AuthForm
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
				<Link
					to="/sign-up"
					className="text-sm font-lato text-fontColor hover:underline font-semibold">
					don't have an account? sign up
				</Link>
			</FormContainer>
		</RedirectToPostersIfSignedIn>
	);
};

export default SignInPage;
