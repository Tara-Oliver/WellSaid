import React from "react";

const ArtworkHeading = ({ artwork, selectedPrice }) => {
	return (
		<>
			<div className="flex text-primary items-center justify-between">
				<p className="font-playfair text-3xl">{artwork.name}</p>
				{selectedPrice && (
					<p className="text-2xl hidden md:block">${selectedPrice}</p>
				)}
			</div>
			<p className="pl-px my-2 italic text-fontColor text-lg text-wrap whitespace-pre-line">
				{artwork.quote}
			</p>
			<p className="text-fontColor">Category: {artwork.category}</p>
		</>
	);
};

export default ArtworkHeading;
