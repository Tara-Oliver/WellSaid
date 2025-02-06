import { bannerdata } from "shared-components/util";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import AnimatedButton from "shared-components/AnimatedButton";
import { Link } from "react-router-dom";
import "style.css";

const Banner = () => {
	return (
		<>
			<Swiper
				navigation={true}
				loop={true}
				modules={[Navigation]}
				className="mySwiper">
				{bannerdata.map((item, i) => (
					<SwiperSlide
						key={i}
						className="relative py-8 h-[600px] font-playfair"
						style={{
							backgroundImage: `linear-gradient(rgba(14, 16, 21, 0.5), rgba(14, 16, 21,0.5)), url(${item.image})`,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
							width: "100%",
						}}>
						<div className="pr-[8%] pl-[8%] mx-auto z-10 h-full">
							<div className={`flex flex-wrap ${item.position}`}>
								<div
									className={`transition-all duration-1000 delay-1000 w-[580px] max-w-full text-center px-2 ${item.textAlign}`}>
									<p className="text-2xl mb-4 font-semibold leading-[1.2] text-bkgrd">
										{item.subtitle}
									</p>

									<p
										className="font-bold text-4xl md:text-6xl leading-[1.2] font-lato capitalize mb-5 text-bkgrd"
										dangerouslySetInnerHTML={{ __html: item.title }}
									/>

									<p className="text-bkgrd font-medium text-lg font-playfair">
										{item.text}
									</p>

									<Link
										to={{
											pathname: "/artwork",
											search: `?pageCategory=${item.category}`,
										}}>
										<AnimatedButton
											text={item.button}
											mainBorder={"border-bkgrd"}
											mainText={"text-bkgrd"}
											hoverBorder={"hover:border-primary"}
											hoverBg={"group-hover:bg-primary"}
											pyVal={"py-3"}
											hoverText={"group-hover:text-bkgrd"}
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
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default Banner;
