import { servicetype } from "shared-components/util";

const Servicetype = () => {
	return (
		<section className="service-type bg-fontColor ">
			<div className="flex flex-wrap">
				{servicetype.map((item, i) => (
					<div key={i} className={`md:w-1/4 w-1/2 px-4 ${item.extclass}`}>
						<div className="md:p-6 p-4">
							<div className="flex justify-center items-center text-center max-w-[300px] my-0 mx-auto md:flex-row flex-col">
								<div
									className={`md:w-20 md:h-20 w-10 h-10  mb-4 text-4xl text-primary border-bkgrd mr-4 flex justify-center items-center ${item.borders}`}>
									<i className={item.icon}></i>
								</div>
								<div className="service-text-box text-bkgrd font-playfair">
									<p className=" ">{item.title}</p>
									<h6 className=" ">{item.text}</h6>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Servicetype;
