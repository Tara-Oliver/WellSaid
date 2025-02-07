import React, { useContext, useEffect, useState } from "react";
import AnimatedButton from "shared-components/AnimatedButton";
import CartContext from "contexts/CartContext";
import { placeNewOrder } from "services/order";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { emptyCart } from "services/cart";
const CheckoutForm = ({
	totalCost,
	shippingFee,
	subtotal,
	shipping,
	setShippingFee,
	cartIsEditing,
}) => {
	const navigate = useNavigate();

	const { cart, setCart, fetchCart } = useContext(CartContext);

	const date = new Date();
	let day = date.getDate().toString().padStart(2, "0");
	const month = date.toLocaleString("default", { month: "long" });
	let year = date.getFullYear();
	let todaysDate = `${month} ${day}, ${year}`;

	const [errors, setErrors] = useState({});

	const monthNumbers = Array.from({ length: 12 }, (_, i) =>
		(i + 1).toString().padStart(2, "0")
	);

	const yearNumbers = Array.from({ length: 11 }, (_, i) => i + 2025);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const deliveryFields = [
		{
			label: "first name",
			type: "text",
			row: 1,
			name: "first_name",
			onChange: handleChange,
		},
		{ label: "last name", type: "text", row: 1, name: "last_name" },
		{ label: "Street address", type: "text", row: 2, name: "street_address" },
		{
			label: "Apt/Suite/Other",
			type: "text",
			row: 2,
			name: "apt",
		},

		{
			label: "City",
			type: "text",
			row: 3,
			name: "city",
		},
		{
			label: "State",
			type: "dropdown",
			row: 3,
			name: "state",
			options: [
				"Alabama",
				"Alaska",
				"Arizona",
				"Arkansas",
				"California",
				"Colorado",
				"Connecticut",
				"Delaware",
				"Florida",
				"Georgia",
				"Hawaii",
				"Idaho",
				"Illinois",
				"Indiana",
				"Iowa",
				"Kansas",
				"Kentucky",
				"Louisiana",
				"Maine",
				"Maryland",
				"Massachusetts",
				"Michigan",
				"Minnesota",
				"Mississippi",
				"Missouri",
				"Montana",
				"Nebraska",
				"Nevada",
				"New Hampshire",
				"New Jersey",
				"New Mexico",
				"New York",
				"North Carolina",
				"North Dakota",
				"Ohio",
				"Oklahoma",
				"Oregon",
				"Pennsylvania",
				"Rhode Island",
				"South Carolina",
				"South Dakota",
				"Tennessee",
				"Texas",
				"Utah",
				"Vermont",
				"Virginia",
				"Washington",
				"West Virginia",
				"Wisconsin",
				"Wyoming",
			],
		},
		{
			label: "Zip code",
			type: "text",
			row: 4,
			name: "zip",
			max: 5,
		},
	];

	const paymentFields = [
		{
			label: "name on card",
			type: "text",
			row: "a",
			width: "md:w-1/2 w-full",
			name: "name_on_card",
		},
		{
			label: "card number",
			type: "text",
			row: "a",
			width: "md:w-1/2 w-full",
			icon: true,
			name: "card_number",
			max: 19,
		},
		{
			label: "expiration date",
			row: "b",
			width: "md:w-1/2 w-full",
			dateFields: [
				{
					options: monthNumbers,
					type: "dropdown",
					label: "month",
					name: "exp_month",
				},
				{
					options: yearNumbers,
					type: "dropdown",
					label: "year",
					name: "exp_year",
				},
			],
		},
		{
			label: "ccv",
			type: "text",
			row: "b",
			width: "md:w-1/4 w-1/2",
			max: 4,
			icon: true,
			name: "ccv",
		},
	];

	const [formData, setFormData] = useState({
		order_item_id: uuidv4(),
		order_date: todaysDate,
		first_name: "",
		last_name: "",
		street_address: "",
		apt: "",
		city: "",
		state: "",
		zip: "",
		cart,
		name_on_card: "",
		card_number: "",
		exp_month: "",
		exp_year: "",
		subtotal,
		shipping_fee: shippingFee,
		total: totalCost,
		ccv: "",
	});

	useEffect(() => {
		setFormData((prevData) => ({
			...prevData,
			cart,
			total: totalCost,
			shipping_fee: shippingFee,
			subtotal,
		}));
	}, [totalCost, shippingFee, subtotal]);

	return (
		<form
			action=""
			className="md:px-4 mt-6 md:mt-0 "
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					const res = await placeNewOrder(formData);
					const data = await res.json();
					if (res.status === 400) {
						setErrors(data);
					} else if (res.status === 201) {
						setCart([]);
						await emptyCart();
						fetchCart();
						setFormData({});
						setErrors({});
						navigate(`/order-confirmation/${formData.order_item_id}`, {
							state: {
								order: formData,
							},
						});
					} else {
						console.error("Unexpected error", res);
						setErrors({ general: "An unexpected error occurred." });
					}
				} catch (error) {
					console.error("Error removing column:", error.message);
				}
			}}>
			<div className="mb-6 capitalize text-xl font-medium font-playfair">
				delivery address
			</div>
			<div>
				{Array.from(new Set(deliveryFields.map((field) => field.row))).map(
					(row) => (
						<div
							key={row}
							className="flex gap-4 mb-2  flex-wrap md:flex-nowrap">
							{deliveryFields
								.filter((field) => field.row === row)
								.map((field) => (
									<div key={field.label} className="md:w-1/2 w-full">
										<label className="text-fontColor lowercase">
											{field.label}
										</label>
										{field.type === "dropdown" ? (
											<>
												<select
													name={field.name}
													className="w-full px-2 py-1 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent"
													value={formData[field.name]}
													onChange={handleChange}>
													<option value="" defaultValue="">
														select state
													</option>
													{field.options.map((option) => (
														<option key={option} value={option}>
															{option}
														</option>
													))}
												</select>
												<div className="text-red-700 italic text-sm">
													{errors[field.name]}
												</div>
											</>
										) : (
											<>
												<input
													type={field.type}
													className="w-full px-2 py-1 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent"
													onChange={handleChange}
													name={field.name}
													value={formData.name}
													maxLength={field.max}
												/>
												<div className="text-red-700 italic text-sm">
													{errors[field.name]}
												</div>
											</>
										)}
									</div>
								))}
						</div>
					)
				)}
			</div>

			<div className="my-8 capitalize text-xl font-medium font-playfair">
				delivery options
			</div>
			<div>
				{shipping.map((item) => (
					<div className="flex my-4 lowercase" key={item.name}>
						<label
							className="relative flex items-center cursor-pointer mr-2"
							htmlFor={item.name}>
							<input
								type="radio"
								id={item.name}
								name="shipping"
								value={item.pricing}
								className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-primary"
								required
								defaultChecked={item.name === "Standard"}
								onChange={(e) => {
									const cost =
										subtotal >= 109.99 && item.name === "Standard"
											? 0.0
											: parseFloat(e.target.value);
									setShippingFee(cost);
								}}
							/>
							<span className="absolute bg-primary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
						</label>

						<div className="w-12 mr-2 text-right uppercase">
							{subtotal >= 109.99 && item.name === "Standard"
								? "FREE"
								: `$${item.pricing}`}
						</div>
						<label htmlFor={item.name}>
							{`${item.name} Shipping - (${item.time})`}
						</label>
					</div>
				))}
			</div>

			<div className="my-8 capitalize text-xl font-medium font-playfair">
				payment type
			</div>

			<div>
				{Array.from(new Set(paymentFields.map((field) => field.row))).map(
					(row) => (
						<div key={row} className="flex gap-4 mb-2 flex-wrap md:flex-nowrap">
							{paymentFields
								.filter((field) => field.row === row)
								.map((field) => (
									<div key={field.label} className={`relative ${field.width}`}>
										<label className="text-fontColor lowercase">
											{field.label}
										</label>
										{field.label === "expiration date" ? (
											<div className="flex gap-x-3 ">
												{field.dateFields.map((date) => (
													<div
														className="flex flex-col  w-1/2 md:w-auto"
														key={date.name}>
														<select
															className="w-full px-2 py-1.5 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent"
															value={formData[date.name]}
															onChange={handleChange}
															name={date.name}>
															<option value="" defaultValue="">
																{date.label}
															</option>
															{date.options.map((option) => (
																<option key={option} value={option}>
																	{option}
																</option>
															))}
														</select>
														<div className="text-red-700 italic text-sm">
															{errors[date.name]}
														</div>
													</div>
												))}
											</div>
										) : field.label === "card number" ||
										  field.label === "ccv" ? (
											<>
												<input
													type="text"
													className="w-full px-2 py-1 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent"
													onChange={(e) => {
														const { name } = e.target;

														const inputValue = e.target.value.replace(
															/[^0-9]/g,
															""
														);
														const formattedValue = inputValue
															.replace(/(.{4})/g, "$1 ")
															.trim();

														setFormData((prevData) => ({
															...prevData,
															[name]: formattedValue,
														}));
													}}
													name={field.name}
													maxLength={field.max}
													value={formData[field.name]}
												/>
												<div className="text-red-700 italic text-sm">
													{errors[field.name]}
												</div>
											</>
										) : (
											<>
												<input
													type={field.type}
													className="w-full px-2 py-1 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent"
													onChange={handleChange}
													name={field.name}
													value={formData.name}
													maxLength={field.max}
												/>
												<div className="text-red-700 italic text-sm">
													{errors[field.name]}
												</div>
											</>
										)}
										{field.icon &&
											(field.label === "card number" ? (
												<img
													src="https://cdn-icons-png.flaticon.com/512/897/897949.png"
													alt=""
													className="w-[2.4rem] absolute top-[1.4rem] right-[.6rem] opacity-50"
												/>
											) : (
												<img
													src="https://cdn-icons-png.flaticon.com/512/16163/16163880.png"
													alt=""
													className="w-[2.4rem] absolute top-[1.35rem] right-[.5rem] opacity-40"
												/>
											))}
									</div>
								))}
						</div>
					)
				)}
			</div>

			{!cartIsEditing && (
				<button className="md:w-1/2 w-full">
					<AnimatedButton
						text={"Place Order"}
						mainBorder={"border-fontColor"}
						mainText={"text-fontColor"}
						hoverBorder={"border-fontColor"}
						hoverBg={"group-hover:bg-fontColor"}
						hoverText={"group-hover:text-bkgrd"}
						pyVal={"py-3 w-full"}
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
				</button>
			)}
		</form>
	);
};

export default CheckoutForm;
