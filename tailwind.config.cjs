/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary))',
				secondary: 'rgb(var(--color-secondary))',
				accent: 'rgb(var(--color-accent))'
			}
		},
	},
	plugins: [],
}
