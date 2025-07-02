import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import SessionContext from "contexts/SessionContext";

import { Link, useLocation } from "react-router-dom";
import { getRandomIdx, FRAME_COLORS } from "shared-components/util";
import {
	addArtworkToFavorites,
	removeArtworkFromFavorites,
} from "services/favorite";

const ArtworkItem = ({
	artwork,
	color,
	favorites,
	handleRemove,
	setShowToast,
	setToastMessage,
}) => {
	const location = useLocation();
	const sellerItem = location.state;
	!artwork ? sellerItem : artwork;
	const [isFavorite, setIsFavorite] = useState(null);
	const [imageIdx, setImageIdx] = useState(getRandomIdx(artwork.images));
	const { username } = useContext(SessionContext);

	useEffect(() => {
		(async () => {
			if (color) {
				setImageIdx(
					artwork.images.findIndex((image) => image.frame_color === color)
				);
			}
		})();
	}, [color]);

	useEffect(() => {
		if (favorites && artwork.artwork_id) {
			const isItemFavorited = favorites.some(
				(item) => item.artwork_id === artwork.artwork_id
			);
			setIsFavorite(isItemFavorited);
		}
	}, [artwork.artwork_id, favorites]);
	return (
		<div className="relative mx-4 my-8 font-lato  max-w-fit">
			<Link to={`/artwork/${artwork.artwork_id}`}>
				<img
					src={artwork.images[imageIdx].src}
					alt="quote artwork image"
					className="w-[280px] h-80  object-cover relative"
					loading="lazy"
				/>
			</Link>

			<div className="flex justify-between text-primary my-3 w-full">
				<Link to={`/artwork/${artwork.artwork_id}`}>
					<div className="font-playfair text-xl hover:underline hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4 hover:text-secondary">
						{artwork.name}
					</div>
				</Link>

				{username && <div className="absolute top-[275px] right-0 bg-bkgrd rounded-full h-[34px] w-[34px]  text-secondary text-xl mx-1 flex justify-center items-center shadow-md shadow-fontColor">
					<button
						className="flex justify-center items-center"
						onClick={async () => {
							const action = isFavorite
								? "Removed from Favorites"
								: "Added to Favorites";

							setIsFavorite(!isFavorite);
							if (!isFavorite) {
								await addArtworkToFavorites(artwork.artwork_id, { artwork });
							} else {
								await removeArtworkFromFavorites(artwork.artwork_id);
								handleRemove(artwork.artwork_id);
							}


							setToastMessage(action);
							setShowToast(true);
							setTimeout(() => setShowToast(false), 2000);
						}}>
						<i
							className={`fa-${
								isFavorite ? "solid" : "regular"
							} fa-heart`}></i>{" "}
					</button>
				</div>}
			</div>

			<div className="flex justify-between ">
				<div className="text-fontColor ">
					{artwork.images[imageIdx].frame_color}
				</div>

				<div className="flex">
					{artwork.images.map((image, idx) => (
						<div
							className={clsx(
								"w-5 h-5 mx-[3px] border border-highlight cursor-pointer transition ease-in-out duration-300",
								FRAME_COLORS[image.frame_color],
								idx === imageIdx && "shadow-[0_2px_0_0_#0e1015]"
							)}
							key={idx}
							onMouseEnter={() => setImageIdx(idx)}></div>
					))}
				</div>
			</div>


		</div>
	);
};

export default ArtworkItem;
