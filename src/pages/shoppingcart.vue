<template>
	<MainLayout>
		<div id="ShoppingCartPage" class="mx-auto mt-4 max-w-[1200px] px-2">
			<div v-if="!userStore.cart.length" class="flex h-[500px] items-center justify-center">
				<div class="pt-20">
					<img class="mx-auto" width="250" src="/cart-empty.png" />

					<div class="mt-4 text-center text-xl">No items yet?</div>

					<div v-if="!user" class="flex text-center">
						<NuxtLink
							to="/auth"
							class="mt-4 w-full rounded-full bg-[#FD374F] p-1.5 text-[21px] font-semibold text-white"
						>
							Sign in
						</NuxtLink>
					</div>
				</div>
			</div>

			<div v-else class="mx-auto w-full justify-between gap-4 md:flex">
				<div class="md:w-[65%]">
					<div class="rounded-lg bg-white p-4">
						<div class="mb-2 text-2xl font-bold">Shopping Cart ({{ userStore.cart.length }})</div>
					</div>

					<div class="mt-4 rounded-lg bg-[#FEEEEF] p-4">
						<div class="font-bold text-red-500">Welcome Deal applicable on 1 item only</div>
					</div>

					<div id="Items" class="mt-4 rounded-lg bg-white p-4">
						<div v-for="product in userStore.cart">
							<CartItem :product="product" :selected-array="selectedArray" @selected-radio="selectedRadioFunc" />
						</div>
					</div>
				</div>

				<div class="my-4 block md:hidden" />
				<div class="md:w-[35%]">
					<div id="Summary" class="rounded-lg bg-white p-4">
						<div class="mb-2 text-2xl font-extrabold">Summary</div>
						<div class="my-4 flex items-center justify-between">
							<div class="font-semibold">Total</div>
							<div class="text-2xl font-semibold">
								$ <span class="font-extrabold">{{ totalPriceComputed }}</span>
							</div>
						</div>
						<button
							class="mt-4 flex w-full items-center justify-center rounded-full bg-[#FD374F] p-1.5 text-[21px] font-semibold text-white"
							@click="goToCheckout"
						>
							Checkout
						</button>
					</div>

					<div id="PaymentProtection" class="mt-4 rounded-lg bg-white p-4">
						<div class="mb-2 text-lg font-semibold">Payment methods</div>
						<div class="my-4 flex items-center justify-start gap-8">
							<div v-for="card in cards">
								<img class="h-6" :src="card" />
							</div>
						</div>

						<div class="border-b" />

						<div class="mb-2 mt-2 text-lg font-semibold">Buyer Protection</div>
						<p class="my-2">Get full refund if the item is not as described or if is not delivered</p>
					</div>
				</div>
			</div>
		</div>
	</MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const user = useSupabaseUser();

const selectedArray = ref([]);

onMounted(() => {
	setTimeout(() => (userStore.isLoading = false), 200);
});

const cards = ref(['visa.png', 'mastercard.png', 'paypal.png', 'applepay.png']);

const totalPriceComputed = computed(() => {
	let price = 0;
	userStore.cart.forEach(prod => {
		price += prod.price;
	});
	return price / 100;
});

const selectedRadioFunc = e => {
	if (!selectedArray.value.length) {
		selectedArray.value.push(e);
		return;
	}

	selectedArray.value.forEach((item, index) => {
		if (e.id != item.id) {
			selectedArray.value.push(e);
		} else {
			selectedArray.value.splice(index, 1);
		}
	});
};

const goToCheckout = () => {
	const ids = [];
	userStore.checkout = [];

	selectedArray.value.forEach(item => ids.push(item.id));

	const res = userStore.cart.filter(item => {
		return ids.indexOf(item.id) != -1;
	});

	res.forEach(item => userStore.checkout.push(toRaw(item)));

	return navigateTo('/checkout');
};
</script>
