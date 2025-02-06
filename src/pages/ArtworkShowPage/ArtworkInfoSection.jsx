import React, { useState } from "react";
import ArtworkHeading from "./ArtworkHeading";
import BenefitBox from "./BenefitBox";
import ArtworkPurchaseOptions from "./ArtworkPurchaseOptions";
import { getRandomIdx } from "shared-components/util";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import clsx from "clsx";

const ArtworkInfoSection = ({ artwork }) => {
	const [imageIdx, setImageIdx] = useState(getRandomIdx(artwork.images));
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedPrice, setSelectedPrice] = useState(null);

	return (
		<div className="flex flex-col md:flex-row md px-4 md:px-0">
			<div className="flex flex-col w-full md:w-3/5 items-center">
				<div className="md:hidden block text-wrap">
					<ArtworkHeading artwork={artwork} selectedPrice={selectedPrice} />
				</div>

				<div className="flex">
					<button
						onClick={() => {
							if (imageIdx > 0) {
								setImageIdx(imageIdx - 1);
							}
						}}
						className={clsx(
							"fav-swiper-button-prev text-4xl",
							imageIdx > 0 ? "text-fontColor" : "text-fontColor/20 disabled"
						)}></button>

					<Zoom>
						<img
							className="w-[380px] h-[420px] object-cover mx-4"
							src={artwork.images[imageIdx].src}
							loading="lazy"
						/>{" "}
					</Zoom>{" "}
					<button
						onClick={() => {
							if (imageIdx < artwork.images.length - 1) {
								setImageIdx(imageIdx + 1);
							}
						}}
						className={clsx(
							"fav-swiper-button-next text-4xl",
							imageIdx < artwork.images.length - 1
								? "text-fontColor"
								: "text-fontColor/20 disabled"
						)}></button>
				</div>

				<div
					className={"hidden md:flex w-full justify-center items-center my-4"}>
					{artwork.images.map((img, idx) => (
						<div
							onClick={() => setImageIdx(idx)}
							className={clsx(
								"mx-4 cursor-pointer pb-1 transition ease-in-out duration-300",
								idx === imageIdx
									? "shadow-[0_2px_0_0_#0e1015] opacity-100"
									: "opacity-50"
							)}
							key={idx}>
							<img
								src={img.src}
								alt=""
								className="w-16 h-16 object-cover"
								loading="lazy"
							/>{" "}
						</div>
					))}
				</div>

				<div className="flex mt-4">
					<BenefitBox
						icon={"fa-circle-check"}
						title={"Quality Guaranteed"}
						description={"230 gsm matte fine art paper.\nSolid wood frame."}
					/>
					<div className="bg-neutral-300 w-px"></div>
					<BenefitBox
						icon={"fa-truck-fast"}
						title={"Free Shipping"}
						description={
							"Get free standard shipping on orders of $109.99 or more."
						}
					/>
				</div>
			</div>

			<div className="flex flex-col md:px-8  w-full md:w-2/5">
				<div className="hidden md:block">
					<ArtworkHeading artwork={artwork} selectedPrice={selectedPrice} />
				</div>

				<ArtworkPurchaseOptions
					artwork={artwork}

					selectedSize={selectedSize}
					setSelectedSize={setSelectedSize}
					selectedPrice={selectedPrice}
					setSelectedPrice={setSelectedPrice}
					colors={artwork.images}
					imageIdx={imageIdx}
					setImageIdx={setImageIdx}
				/>
			</div>
		</div>
	);
};

export default ArtworkInfoSection;
