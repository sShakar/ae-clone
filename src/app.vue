<template>
	<div class="`z-[-1] w-full bg-[#F2F2F2]" />
	<NuxtPage />

	<MenuOverlay
		:class="[
			{ 'visible transition-all duration-200 ease-in': userStore.isMenuOverlay },
			{ 'invisible max-h-0 transition-all duration-200 ease-out': !userStore.isMenuOverlay }
		]"
	/>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();

useHead({
	title: 'AliExpress',
	meta: [{ name: 'description', content: 'This is a clone of AliExpress.' }]
});

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
