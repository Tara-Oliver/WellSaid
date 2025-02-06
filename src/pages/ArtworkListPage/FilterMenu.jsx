import React from "react";
import clsx from "clsx";

const FilterMenu = ({
	setShowMenu,
	showMenu,
	menuTitle,
	linkArr,
	filterGroup,
	setFilterGroup,
	setPageIdx,
}) => {
	return (
		<>
			<div className="sm:hidden flex flex-col">
				<div
					className="text-primary flex items-center cursor-pointer"
					onClick={() => setShowMenu(!showMenu)}>
					<p className="mx-4 font-playfair capitalize  mb-2  text-xl">
						{menuTitle}
					</p>
					<i
						className={clsx(
							"fa-solid text-xl",
							showMenu ? "fa-angle-up" : "fa-angle-down"
						)}></i>
				</div>

				{showMenu && (
					<ul className="text-nowrap mx-4 font-lato">
						{linkArr.map((link) => (
							<li
								key={link}
								className={clsx(
									"transition ease-in-out duration-100 hover:underline  hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4 lowercase hover:text-secondary",
									link === filterGroup
										? "text-secondary font-bold underline underline-offset-4 decoration-2"
										: "text-fontColor"
								)}
								onClick={() => {
									setFilterGroup(link);
									setPageIdx(0);
								}}>
								{link}
							</li>
						))}
						<li
							className="hover:underline hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4  mt-2 text-sky-700"
							onClick={() => setFilterGroup(null)}>
							clear selection
						</li>
					</ul>
				)}
			</div>

			<ul className="my-8 text-nowrap mx-4 hidden sm:block font-lato">
				<div className="font-playfair text-2xl capitalize text-primary mb-2">
					{menuTitle}
				</div>
				{linkArr.map((link) => (
					<li
						key={link}
						className={clsx(
							"transition ease-in-out hover:underline duration-100 hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4 lowercase hover:text-secondary",
							link === filterGroup
								? "text-secondary font-bold underline underline-offset-4 decoration-2"
								: "text-fontColor"
						)}
						onClick={() => {
							setFilterGroup(link);
							setPageIdx(0);
						}}>
						{link}
					</li>
				))}
				<li
					className="transition ease-in-out hover:underline duration-300 hover:cursor-pointer decoration-2 hover:font-medium hover:underline-offset-4  mt-2 text-sky-700"
					onClick={() => setFilterGroup(null)}>
					clear selection
				</li>
			</ul>
		</>
	);
};

export default FilterMenu;
