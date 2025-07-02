import { useContext, useState } from "react";
import SessionContext from "contexts/SessionContext";
import RedirectToPostersIfSignedIn from "shared-components/RedirectToPostersIfSignedIn";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { RemoveScroll } from "react-remove-scroll";
import SignInSection from "./SignInSection";
import SignUpSection from "./SignUpSection";

const AuthModal = ({ isOpen }) => {
	const sessionContext = useContext(SessionContext);
	const { closeAuthModal } = useContext(SessionContext);

	const [isSigningIn, setIsSigningIn] = useState(true);
	const backgroundRef = useRef();

	if (!isOpen) {
		return null;
	}

	return (
		<RedirectToPostersIfSignedIn>
			<RemoveScroll>
				<div
					ref={backgroundRef}
					onClick={(e) => {
						if (e.target === backgroundRef.current) {
							closeAuthModal();
						}
					}}
					className="fixed top-0 right-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-center items-center font-lato z-20">
					<motion.button
						className="absolute top-0 right-0 z-10 p-2"
						onClick={closeAuthModal}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}>
						<i className="text-3xl fa-solid fa-xmark text-bkgrd"></i>
					</motion.button>

					<div className="flex justify-center">
						<div className="w-full max-w-3xl flex">
							<div className="left hidden md:block w-1/2">
								<img
									src="https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaid-background_f84v60.jpg"
									alt=""
									className=" object-cover"
									loading="lazy"
								/>
							</div>

							{isSigningIn ? (
								<SignInSection handleClose={() => setIsSigningIn(false)} />
							) : (
								<SignUpSection handleClose={() => setIsSigningIn(true)} />
							)}
						</div>
					</div>
				</div>
			</RemoveScroll>
		</RedirectToPostersIfSignedIn>
	);
};

export default AuthModal;
