import React, { useEffect, useRef, useState } from "react";
import AnimatedButton from "shared-components/AnimatedButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
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
	// const [slidesPerView, setSlidesPerView] = useState(3);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const swiperRef = useRef(null);

	// useEffect(() => {
	// 	const updateSlidesPerView = () => {
	// 		if (window.innerWidth < 640) {
	// 			setSlidesPerView(1);
	// 		} else if (window.innerWidth < 768) {
	// 			setSlidesPerView(2);
	// 		} else {
	// 			setSlidesPerView(3);
	// 		}
	// 	};

	// 	window.addEventListener("resize", updateSlidesPerView);
	// 	updateSlidesPerView();

	// 	return () => window.removeEventListener("resize", updateSlidesPerView);
	// }, []);

	return (
		<RedirectToSignInIfSignedOut>
			<div className="flex justify-center my-4 ">
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
				<div className="flex items-center w-full min-w-0">
					<button
						className="fav-swiper-button-prev text-fontColor md:text-4xl text-2xl mr-0 sm:mr-2 cursor-pointer shrink-0"
						onClick={() => swiperRef.current?.slidePrev()}></button>
					<div className="flex w-full min-w-0">
						<Swiper
							// className="w-full overflow-hidden"
							loop={favorites.length > 1}
							slidesPerView={"auto"}
							spaceBetween={0}
							modules={[Pagination]}
							pagination={{ clickable: true }}
							onSwiper={(swiper) => {
								swiperRef.current = swiper;
							}}>
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
					</div>
					<button
						className="fav-swiper-button-next text-fontColor md:text-4xl text-2xl ml-2 cursor-pointer shrink-0"
						onClick={() => swiperRef.current?.slideNext()}></button>
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
