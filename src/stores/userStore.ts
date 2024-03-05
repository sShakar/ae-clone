import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
	state: () => ({
		isMenuOverlay: false,
		isLoading: false,
		cart: [],
		checkout: []
	}),
	persist: true
});
