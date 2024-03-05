<template>
	<MainLayout>
		<div id="ItemPage" class="mx-auto mt-4 max-w-[1200px] px-2">
			<div class="mx-auto w-full justify-between gap-4 md:flex">
				<div class="md:w-[40%]">
					<img v-if="currentImage" class="object-fit rounded-lg" :src="currentImage" />
					<div v-if="images[0] !== ''" class="mt-2 flex items-center justify-center">
						<div v-for="image in images">
							<img
								width="70"
								class="object-fit cursor-pointer rounded-md border-[3px]"
								:class="currentImage === image ? 'border-[#FF5353]' : ''"
								:src="image"
								@mouseover="currentImage = image"
								@click="currentImage = image"
							/>
						</div>
					</div>
				</div>
				<div class="rounded-lg bg-white p-3 md:w-[60%]">
					<div v-if="product && product.data">
						<p class="mb-2">{{ product.data.title }}</p>
						<p class="mb-2 text-[12px] font-light">{{ product.data.description }}</p>
					</div>

					<div class="flex items-center pt-1.5">
						<span class="mr-2 h-4 min-w-4 rounded-full bg-[#FFD000] p-0.5">
							<Icon name="material-symbols:star-rounded" class="-mt-[17px]" size="12" />
						</span>
						<p class="text-[#FF5353]">Extra 5% off</p>
					</div>

					<div class="my-2 flex items-center justify-start">
						<Icon name="ic:baseline-star" color="#FF5353" />
						<Icon name="ic:baseline-star" color="#FF5353" />
						<Icon name="ic:baseline-star" color="#FF5353" />
						<Icon name="ic:baseline-star" color="#FF5353" />
						<Icon name="ic:baseline-star" color="#FF5353" />
						<span class="ml-2 text-[13px] font-light">5 213 Reviews 1,000+ orders</span>
					</div>

					<div class="border-b" />

					<div class="my-2 flex items-center justify-start gap-2">
						<div class="text-xl font-bold">$ {{ priceComputed }}</div>
						<span class="rounded-sm border bg-[#F5F5F5] px-1.5 text-[9px] font-semibold text-[#C08562]">70% off</span>
					</div>

					<p class="pt-1 text-xs font-semibold text-[#009A66]">Free 11-day delivery over ￡8.28</p>

					<p class="pt-1 text-xs font-semibold text-[#009A66]">Free Shipping</p>

					<div class="py-2" />

					<button
						:disabled="isInCart"
						class="rounded-lg bg-gradient-to-r from-[#FF851A] to-[#FFAC2C] px-6 py-2 text-lg font-semibold text-white"
						@click="addToCart()"
					>
						<div v-if="isInCart">Is Added</div>
						<div v-else>Add to Cart</div>
					</button>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useUserStore } from '@/stores/userStore';

const route = useRoute();
const userStore = useUserStore();

const product = ref(null);
const currentImage = ref(null);

onBeforeMount(async () => {
	product.value = await useFetch(`/api/prisma/get-product-by-id/${route.params.id}`);
});

watchEffect(() => {
	if (product.value && product.value.data) {
		currentImage.value = product.value.data.url;
		images.value[0] = product.value.data.url;
		userStore.isLoading = false;
	}
});

const isInCart = computed(() => {
	let res = false;
	userStore.cart.forEach(prod => {
		if (route.params.id == prod.id) {
			res = true;
		}
	});
	return res;
});

const priceComputed = computed(() => {
	if (product.value && product.value.data) {
		return product.value.data.price / 100;
	}
	return '0.00';
});

const images = ref([
	'',
	'https://picsum.photos/id/212/800/800',
	'https://picsum.photos/id/233/800/800',
	'https://picsum.photos/id/165/800/800',
	'https://picsum.photos/id/99/800/800',
	'https://picsum.photos/id/144/800/800'
]);

const addToCart = () => {
	userStore.cart.push(product.value.data);
};
</script>
