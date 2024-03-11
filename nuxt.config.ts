// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	pages: true,
	srcDir: 'src/',
	modules: [
		'nuxt-icon',
		'nuxt-lodash',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/eslint-module',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/supabase'
	],
	supabase: {
		redirect: false
	},
	build: {
		transpile: ['pinia-plugin-persistedstate']
	},
	runtimeConfig: {
		public: {
			stripePk: process.env.STRIPE_PK_KEY
		}
	},
	app: {
		head: {
			meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
			script: [{ src: 'https://js.stripe.com/v3/', defer: true }]
		}
	},
	css: ['@/assets/styles/main.scss'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	}
});
