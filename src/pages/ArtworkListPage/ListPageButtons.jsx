import React from "react";
import PageButton from "./PageButton";
import clsx from "clsx";

const ListPageButtons = ({ pageIdx, setPageIdx, numPages }) => {
	const pageBtns = [];

	for (let i = 0; i < numPages; i++) {
		pageBtns.push(
			<button
				className={clsx(
					"mx-2 w-6 h-10 text-xl  pb-2",
					pageIdx === i
						? "border-b-2 border-fontColor text-fontColor"
						: "text-fontColor/50"
				)}
				onClick={() => {
					window.scrollTo(0, 0);
					setPageIdx(i);
				}}
				key={i}>
				{i + 1}
			</button>
		);
	}

	return (
		<div className="flex flex-col mb-8 ">
			<div className={clsx("flex justify-between mx-2")}>
				<PageButton
					icon={"fa-solid fa-chevron-left"}
					onClick={() => {
						if (pageIdx > 0) {
							setPageIdx(pageIdx - 1);
							window.scrollTo(0, 0);
						}
					}}
					show={pageIdx > 0}
				/>
				<div className="flex justify-end mx-2">{pageBtns}</div>
				<PageButton
					icon={"fa-solid fa-chevron-right"}
					show={pageIdx < pageBtns.length - 1}
					onClick={() => {
						if (pageIdx < pageBtns.length - 1) {
							setPageIdx(pageIdx + 1);
							window.scrollTo(0, 0);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default ListPageButtons;
