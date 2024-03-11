<template>
	<MainLayout>
		<div id="IndexPage" class="mx-auto mt-4 max-w-[1200px] px-2">
			<div v-if="products" class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				<div v-for="product in products.data" :key="product.id">
					<TheProduct :product="product" />
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const products = ref<any>(null);
onBeforeMount(async () => {
	products.value = await useFetch('api/prisma/get-all-products');
	setTimeout(() => (userStore.isLoading = false), 1000);
});
</script>
