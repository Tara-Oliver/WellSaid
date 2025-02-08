import React from "react";
import Navbar from "shared-components/Navbar";
import ArtworkItem from "./ArtworkItem";
import RedirectToSignInIfSignedOut from "shared-components/RedirectToSignInIfSignedOut";
import { getAllArtwork } from "services/artwork";
import { useEffect, useState } from "react";
import LoadingSpinner from "shared-components/LoadingSpinner";
import { motion } from "framer-motion";
import { FRAME_COLORS } from "shared-components/util";
import FilterMenu from "./FilterMenu";
import ListPageButtons from "./ListPageButtons";
import { useLocation } from "react-router-dom";
import Footer from "shared-components/Footer";

const PAGE_SIZE = 6;
const ArtworkListPage = ({ favorites, handleRemove }) => {
	const location = useLocation();
	const pageCategory = new URLSearchParams(location.search).get("pageCategory");
	const [loading, setLoading] = useState(false);
	const [artworks, setArtworks] = useState([]);
	const [color, setColor] = useState(null);
	const [pageIdx, setPageIdx] = useState(0);
	const [showCategoryMenu, setShowCategoryMenu] = useState(false);
	const [category, setCategory] = useState(pageCategory || null);
	const [showColorMenu, setShowColorMenu] = useState(false);
	const pageStart = pageIdx * PAGE_SIZE;
	const pageEnd = PAGE_SIZE * pageIdx + PAGE_SIZE;
	const linkColors = Object.keys(FRAME_COLORS);
	const categoryLinks = ["Lyrics", "Inspo", "Funny"];
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const fetchArtwork = async () => {
		setLoading(true);
		const res = await getAllArtwork();
		const data = await res.json();
		setArtworks(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchArtwork();
	}, []);

	const filterByFrameColorAndCategory = (arr, color, category) => {
		return arr.filter((item) => {
			const colorMatches =
				!color || item.images.some((image) => image.frame_color === color);
			const categoryMatches = !category || item.category === category;
			return colorMatches && categoryMatches;
		});
	};

	const numPages = Math.ceil(
		filterByFrameColorAndCategory(artworks, color, category).length / PAGE_SIZE
	);

	return (
		<RedirectToSignInIfSignedOut>
			<Navbar />
			<div className="flex flex-col items-center min-h-screen bg-bkgrd font-lato">
				<div className="w-full max-w-8xl py-24">
					{loading ? (
						<LoadingSpinner />
					) : (
						<>
							<p className="mb-6 font-playfair text-primary text-4xl capitalize px-4">
								Artwork in stock
							</p>
							<div className="flex-col md:flex-row flex">
								<div className="flex flex-col">
									<FilterMenu
										setShowMenu={setShowColorMenu}
										showMenu={showColorMenu}
										menuTitle={"shop by Frame Color"}
										linkArr={linkColors}
										filterGroup={color}
										setFilterGroup={setColor}
										setPageIdx={setPageIdx}
									/>

									<FilterMenu
										setShowMenu={setShowCategoryMenu}
										showMenu={showCategoryMenu}
										menuTitle={"shop by Category"}
										linkArr={categoryLinks}
										filterGroup={category}
										setFilterGroup={setCategory}
										setPageIdx={setPageIdx}
									/>
								</div>

								<div className="flex flex-wrap justify-center">
									{filterByFrameColorAndCategory(artworks, color, category)
										.length === 0 ? (
										<div className="flex flex-col items-center justify-center text-fontColor w-full">
											<p className="text-3xl">
												Oops! Looks like your perfect match is playing hard to
												find.
											</p>
											<p>Adjust your filters and take another shot!</p>
										</div>
									) : (
										filterByFrameColorAndCategory(artworks, color, category)
											.slice(pageStart, pageEnd)
											.map((artwork, idx) => (
												<motion.div
													key={artwork.artwork_id}
													initial={{ opacity: 0, translateY: "20px" }}
													whileInView={{ opacity: 1, translateY: 0 }}
													transition={{
														delay: 0.3 + (idx % 3) * 0.2,
														duration: 0.4,
													}}>
													<ArtworkItem
														artwork={artwork}
														color={color}
														favorites={favorites}
														handleRemove={handleRemove}
														setShowToast={setShowToast}
														setToastMessage={setToastMessage}
													/>
												</motion.div>
											))
									)}
								</div>
							</div>
							<div
								className={`w-full max-w-sm fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-fontColor text-bkgrd text-center px-4 py-2 transition-transform duration-300 ease-in-out ${
									showToast
										? "translate-y-0 opacity-100"
										: "translate-y-5 opacity-0"
								}`}>
								{toastMessage}
							</div>
						</>
					)}
				</div>
				<ListPageButtons
					pageIdx={pageIdx}
					setPageIdx={setPageIdx}
					numPages={numPages}
				/>
			</div>
			<Footer />
		</RedirectToSignInIfSignedOut>
	);
};

export default ArtworkListPage;
