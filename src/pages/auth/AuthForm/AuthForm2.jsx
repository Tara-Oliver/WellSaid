import React, { useState, useCallback, useContext } from "react";
import Field from "./Field";
import { createSession } from "services/user";
import SessionContext from "contexts/SessionContext";
import AnimatedButton from "shared-components/AnimatedButton";
import AuthLink from "./AuthLink";

const AuthForm2 = ({
	fields,
	submitButtonText,
	onSubmit,
	handleSwitch,
	text,
}) => {
	const sessionContext = useContext(SessionContext);
	const { closeAuthModal } = useContext(SessionContext);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState(() => {
		const initialState = {};
		for (let field of fields) {
			initialState[field.label] = "";
		}
		return initialState;
	});

	const [showPasswords, setShowPasswords] = useState(() => {
		const initialShowState = {};
		for (let field of fields) {
			if (field.icon) {
				initialShowState[field.label] = false;
			}
		}
		return initialShowState;
	});

	const [errors, setErrors] = useState({});
	const [guestLoginTyping, setGuestLoginTyping] = useState(false);

	const togglePasswordVisibility = useCallback((fieldLabel) => {
		setShowPasswords((prev) => ({
			...prev,
			[fieldLabel]: !prev[fieldLabel],
		}));
	}, []);

	const typeCharacter = (
		inputField,
		inputValue,
		currentIndex,
		currentField = ""
	) => {
		if (currentIndex >= inputValue.length) return;
		const newField = currentField + inputValue[currentIndex];

		setFormData((prev) => ({
			...prev,
			[inputField]: newField,
		}));

		setTimeout(() => {
			typeCharacter(inputField, inputValue, currentIndex + 1, newField);
		}, 100);
	};

	const handleGuestLogin = () => {
		const guestUsername = "Guest";
		const guestPassword = "Hallelujah";
		setGuestLoginTyping(true);

		typeCharacter("username", guestUsername, 0);
		setTimeout(() => {
			typeCharacter("password", guestPassword, 0);
		}, 800);

		setTimeout(async () => {
			const res = await createSession({
				username: guestUsername,
				password: guestPassword,
			});
			const data = await res.json();
			sessionContext.signIn(data.sessionToken);
			closeAuthModal();
		}, 2400);
	};

	return (
		<form
			className="px-8 py-2 m-4 bg-bkgrd font-lato flex flex-col justify-center"
			onSubmit={async (e) => {
				e.preventDefault();
				setLoading(true);
				const errorData = await onSubmit(formData);
				if (errorData) setErrors(errorData);

				setLoading(false);
				closeAuthModal();
			}}>
			{fields.map((field) => (
				<Field
					key={field.label}
					field={field}
					formData={formData}
					onChange={(e) =>
						!guestLoginTyping &&
						setFormData({ ...formData, [field.label]: e.target.value })
					}
					show={showPasswords[field.label]}
					toggleShow={() => togglePasswordVisibility(field.label)}
					errors={errors}
					width={"w-full"}
				/>
			))}

			<button disabled={guestLoginTyping} className="w-full">
				<AnimatedButton
					text={submitButtonText}
					mainBorder={"border-primary"}
					mainText={"text-primary"}
					hoverBorder={"border-primary"}
					hoverBg={"bg-primary"}
					hoverText={"group-hover:text-bkgrd"}
					pyVal={"py-2 w-full"}
					icon={
						loading ? (
							<i className="fa-solid fa-circle-notch text-xl animate-spin"></i>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="28"
								height="28"
								viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.5.5 0 0 0 0-.74"
								/>
							</svg>
						)
					}
				/>
			</button>
			<button
				type="button"
				className="font-semibold transition ease-in-out hover:underline hover:cursor-pointer hover:underline-offset-4 lowercase text-fontColor text-sm text-center my-4 w-full"
				onClick={handleGuestLogin}
				disabled={guestLoginTyping}>
				Continue as Guest?
			</button>

			<AuthLink handleSwitch={handleSwitch} text={text} />
		</form>
	);
};

export default AuthForm2;
