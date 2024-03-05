<template>
	<div class="fixed z-[-1] h-[100vh] w-full bg-[#F2F2F2]" />
	<NuxtPage />

	<MenuOverlay
		:class="[
			{ 'visible max-h-[100vh] transition-all duration-200 ease-in': userStore.isMenuOverlay },
			{ 'invisible max-h-0 transition-all duration-200 ease-out': !userStore.isMenuOverlay }
		]"
	/>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();

const route = useRoute();

const windowWidth = ref(process.client ? window.innerWidth : '');

onMounted(() => {
	userStore.isLoading = true;
	window.addEventListener('resize', function () {
		windowWidth.value = window.innerWidth;
	});
});

watch(
	() => windowWidth.value,
	() => {
		if ((windowWidth.value as number) >= 767) {
			userStore.isMenuOverlay = false;
		}
	}
);

watch(
	() => route.fullPath,
	() => {
		userStore.isLoading = true;
	}
);
</script>
