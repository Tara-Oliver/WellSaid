import React from "react";

const FormContainer = ({ children }) => {
	return (
		<div className="flex bg-[#f3f4f7]">
			<div className="left relative hidden md:flex w-2/5">
				<img
					src="https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaid-background_f84v60.jpg"
					alt=""
					className="h-full w-full"
					loading="lazy"
				/>

				<div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
			</div>

			<div className="right flex flex-col items-center justify-center flex-1">
				<div className="mx-2 my-8 flex flex-col items-center">
					<img
						src="https://res.cloudinary.com/dzgmrgcuo/image/upload/v1735977043/wellsaidpurple_alsabf.png"
						alt=""
						className="w-36 mb-2"
						loading="lazy"
					/>
					<p className="font-playfair text-2xl tracking-widest font-bold text-primary uppercase">
						artwork
					</p>
				</div>
				{children}
			</div>
		</div>
	);
};

export default FormContainer;
