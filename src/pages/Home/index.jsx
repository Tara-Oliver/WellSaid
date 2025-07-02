import React from "react";
import Navbar from "shared-components/Navbar";
import Featured from "./Featured";
import Banner from "./Banner";
import Servicetype from "./Servicetype";
import Footer from "shared-components/Footer";

const Home = () => {
	return (
	
		<>
			<Navbar />
			<div className="w-screen flex flex-col items-center font-lato">
				<div className="w-full max-w-8xl">
					<Banner />
					<Servicetype />
					<Featured />
				</div>{" "}
			</div>
			<Footer />
			</>
		
	);
};

export default Home;
