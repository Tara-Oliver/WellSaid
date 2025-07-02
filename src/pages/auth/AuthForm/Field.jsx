import React from "react";

const Field = ({
	field,
	formData,
	onChange,
	show,
	toggleShow,
	errors,
	width,
}) => {
	let newField =
		field.label === "confirmPassword" ? "confirm password" : field.label;

	return (
		<div className="flex flex-col text-text mb-4 relative text-fontColor">
			<label htmlFor={field.label} className="text-fontColor">
				{newField}
			</label>
			<input
				id={field.label}
				type={show ? "text" : field.type}
				value={formData[field.label]}
				className={`${width} px-2 py-2 text-fontColor focus:outline-primary border-2 border-fontColor bg-transparent`}
				onChange={onChange}
			/>
			<div className="text-red-700 italic text-sm">{errors[field.label]}</div>

			{field.icon && (
				<button
					type="button"
					className="text-sm absolute top-8 right-4"
					onClick={toggleShow}>
					{show ? (
						<i className="fa-regular fa-eye-slash"></i>
					) : (
						<i className="fa-regular fa-eye"></i>
					)}
				</button>
			)}
		</div>
	);
};

export default Field;
