<template>
	<MainLayout>
		<div id="OrdersPage" class="mx-auto mt-4 min-h-[50vh] max-w-[1200px] px-2">
			<div class="min-h-[150px] w-full bg-white p-6">
				<div class="flex items-center text-xl">
					<Icon name="carbon:delivery" color="#5FCB04" size="35" />
					<span class="pl-4">Orders</span>
				</div>
				<div v-for="order in orders.data" v-if="orders && orders.data" class="pl-[50px] text-sm">
					<div class="border-b py-1">
						<p>Stripe ID: {{ order.stripeId }}</p>

						<div class="pt-2"></div>

						<div v-for="item in order.orderItem">
							<NuxtLink
								class="flex items-center gap-3 p-1 hover:text-blue-500 hover:underline"
								:to="`/item/${item.productId}`"
							>
								<img width="40" :src="item.product.url" />
								{{ item.product.title }}
							</NuxtLink>
						</div>

						<div class="pb-5 pt-2">
							Delivery Address: {{ order.name }}, {{ order.address }}, {{ order.zipcode }}, {{ order.city }},
							{{ order.country }}
						</div>
					</div>
				</div>

				<div v-else class="flex items-center justify-center">You have no order history</div>
			</div>
		</div>
	</MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const user = useSupabaseUser();

const orders = ref(null);

onBeforeMount(async () => {
	orders.value = await useFetch(`/api/prisma/get-all-orders-by-user/${user.value.id}`);
});

onMounted(() => {
	if (!user.value) {
		return navigateTo('/auth');
	}

	setTimeout(() => (userStore.isLoading = false), 200);
});
</script>
