/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				playfair: ["Montserrat"],
				lato: ["Petrona"],
			},
			colors: {
				fontColor: "#0e1015",
				bkgrd: "#f3f4f7",
				primary: "#7280a1",
				secondary: "#c4a6b2",
				accent: "#7e7e7e",
				highlight: "#E5DDE3",
			},
		},
	},

	plugins: [],
};
