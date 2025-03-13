/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#0EAE7B",
					dark: "#034D2D",
					medium: "#108765",
					light: "#00C49F",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
