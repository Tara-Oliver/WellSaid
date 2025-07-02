import React, { useEffect, useState } from "react";
import AnimatedButton from "shared-components/AnimatedButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArtworkItem from "pages/ArtworkListPage/ArtworkItem";
import { removeAllFavorites } from "services/favorite";
import DeleteFavoritesModal from "shared-components/modals/DeleteFavoritesModal";
import ModalWrapper from "shared-components/modals/ModalWrapper";
import "style.css";
import RedirectToSignInIfSignedOut from "shared-components/RedirectToSignInIfSignedOut";

const Favs = ({
	favorites,
	handleRemove,
	initialized,
	fetchOrdersAndFavorites,
	setShowToast,
	setToastMessage,
}) => {
	const [slidesPerView, setSlidesPerView] = useState(3);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	useEffect(() => {
		const updateSlidesPerView = () => {
			if (window.innerWidth < 640) {
				setSlidesPerView(Math.min(1, favorites.length));
			} else if (window.innerWidth < 768) {
				setSlidesPerView(Math.min(2, favorites.length));
			} else {
				setSlidesPerView(Math.min(3, favorites.length));
			}
		};

		window.addEventListener("resize", updateSlidesPerView);
		updateSlidesPerView();

		return () => window.removeEventListener("resize", updateSlidesPerView);
	}, [favorites.length]);

	return (
		<RedirectToSignInIfSignedOut>
			<div className="flex justify-between">
				{favorites.length > 0 && (
					<button onClick={() => setOpenDeleteModal(true)}>
						<AnimatedButton
							text="Delete All"
							pyVal={"py-3"}
							mainBorder={"border-fontColor"}
							mainText={"text-fontColor"}
							hoverBorder={"border-fontColor"}
							hoverBg={"group-hover:bg-fontColor"}
							hoverText={"group-hover:text-bkgrd"}
							icon={<i className="fa-solid fa-trash-can mr-1"></i>}
						/>
					</button>
				)}
			</div>
			{initialized && favorites.length === 0 ? (
				<div className="flex flex-col items-center justify-center font-playfair text-fontColor">
					<p className="text-3xl">
						Nothing here yet—but the perfect pieces are just a click away!
					</p>
					<p>
						Start exploring and click the heart icon on any piece to give this
						page some love.
					</p>
				</div>
			) : (
				<div className="flex flex-1 justify-center items-center w-full">
					<button className="fav-swiper-button-prev"></button>
					<Swiper
						key={favorites.length}
						className="flex w-full"
						loop={true}
						loopAddBlankSlides={true}
						navigation={{
							prevEl: ".fav-swiper-button-prev",
							nextEl: ".fav-swiper-button-next",
						}}
						slidesPerView={slidesPerView}
						modules={[Navigation, Pagination]}
						pagination={{ clickable: true }}>
						{favorites.map((item, idx) => (
							<SwiperSlide key={idx}>
								<div className="flex justify-center">
									<ArtworkItem
										artwork={item.artwork}
										favorites={favorites}
										handleRemove={handleRemove}
										setShowToast={setShowToast}
										setToastMessage={setToastMessage}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<button className="fav-swiper-button-next"></button>
				</div>
			)}
			<ModalWrapper
				isOpen={openDeleteModal}
				handleClose={() => setOpenDeleteModal(false)}>
				<DeleteFavoritesModal
					removeAllFavorites={removeAllFavorites}
					handleClose={() => setOpenDeleteModal(false)}
					fetchOrdersAndFavorites={fetchOrdersAndFavorites}
				/>
			</ModalWrapper>
		</RedirectToSignInIfSignedOut>
	);
};

export default Favs;
