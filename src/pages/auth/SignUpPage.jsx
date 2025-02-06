import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import FormContainer from "./FormContainer";
import { createUser } from "services/user";
import RedirectToPostersIfSignedIn from "shared-components/RedirectToPostersIfSignedIn";
import { useContext } from "react";
import SessionContext from "contexts/SessionContext";

const SignUpPage = () => {
	const sessionContext = useContext(SessionContext);
	return (
		<RedirectToPostersIfSignedIn>
			<FormContainer>
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
						{
							label: "confirmPassword",
							type: "password",
							icon: true,
						},
					]}
					submitButtonText="create an account"
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
				<Link
					to="/sign-in"
					className="text-sm text-fontColor hover:underline font-lato">
					already have an account? sign in
				</Link>
			</FormContainer>
		</RedirectToPostersIfSignedIn>
	);
};

export default SignUpPage;
