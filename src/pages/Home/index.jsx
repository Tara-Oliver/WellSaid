import React from "react";
import RedirectToSignInIfSignedOut from "shared-components/RedirectToSignInIfSignedOut";
import Navbar from "shared-components/Navbar";
import Featured from "./Featured";
import Banner from "./Banner";
import Servicetype from "./Servicetype";

const Home = () => {
	return (
		<RedirectToSignInIfSignedOut>
			<Navbar />
			<div className="flex flex-col items-center  font-lato">
				<div className="w-full max-w-8xl">
					<Banner />
					<Servicetype />
					<Featured />
				</div>{" "}
			</div>
		</RedirectToSignInIfSignedOut>
	);
};

export default Home;
