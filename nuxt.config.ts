// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	srcDir: 'src/',
	modules: ['@nuxtjs/eslint-module'],
	css: ['@/assets/styles/main.scss'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	}
});
