import React from "react";
import { featured, getRandomIdx } from "shared-components/util";
import { Link } from "react-router-dom";
import AnimatedButton from "shared-components/AnimatedButton";

const Featured = () => {
	return (
		<div className="flex flex-col md:flex-row justify-between items-center md:p-8 p-4 font-playfair text-fontColor bg-bkgrd relative gap-x-12">
			<div className="left text-center md:text-left my-6 md:my-0 z-10">
				<h3 className="text-6xl  capitalize">featured</h3>
				<p className="my-6 italic text-wrap font-lato">
					Transform your home or office with our gorgeous featured pieces
				</p>
				<Link to="/artwork">
					<AnimatedButton
						text="Shop Collection"
						mainBorder={"border-fontColor"}
						mainText={"text-fontColor"}
						hoverBorder={"group-hover:border-fontColor"}
						hoverBg={"bg-fontColor"}
						hoverText={"group-hover:text-bkgrd"}
						pyVal={"py-3"}
						icon={
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
						}
					/>
				</Link>
			</div>

			<div className="right flex-1 grid md:grid-cols-3  grid-cols-2 md:gap-5 gap-2">
				{featured.map((item, idx) => {
					const imageIdx = getRandomIdx(item.images);
					return (
						<Link
							className="w-full"
							to={{ pathname: `/artwork/${item.artwork_id}`, state: item }}
							key={idx}>
							<figure
								className="gallery-item cursor-pointer w-full h-full"
								key={idx}>
								<img
									src={item.images[imageIdx].src}
									alt="Photo of framed quote artwork"
									className="transition-all duration-150 ease-in-out hover:transform hover:scale-110 object-cover w-full h-full"
								/>
							</figure>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Featured;
