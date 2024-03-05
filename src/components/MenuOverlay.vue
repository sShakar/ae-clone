<template>
	<div id="MenuOverlay" class="fixed bottom-0 z-50 h-full w-full bg-white px-3">
		<div class="flex items-center justify-between py-5">
			<NuxtLink to="/" @click="userStore.isMenuOverlay = false">
				<img width="170" src="/AliExpress-logo.png" />
			</NuxtLink>

			<button class="rounded-full p-1 hover:bg-gray-200" @click="userStore.isMenuOverlay = false">
				<Icon name="mdi:close" size="30" />
			</button>
		</div>

		<div class="flex items-center justify-between pt-5">
			<ul class="w-full">
				<li
					class="relative flex cursor-pointer items-center justify-between border-b px-3 py-2.5 hover:bg-gray-100"
					@click="goTo('orders')"
				>
					<div class="flex items-center text-[20px] font-semibold">
						<Icon name="ph:pen-light" size="33" />
						<span class="pl-4">My Orders</span>
					</div>
				</li>

				<li
					class="relative flex cursor-pointer items-center justify-between border-b px-3 py-2.5 hover:bg-gray-100"
					@click="goTo('shoppingcart')"
				>
					<div class="flex items-center text-[20px] font-semibold">
						<Icon name="ph:shopping-cart-simple-light" size="33" />
						<span class="pl-4">Cart</span>
					</div>
					<div
						class="flex h-[35px] min-w-[35px] items-center justify-center rounded-full bg-[#FF4646] text-lg text-white"
					>
						{{ userStore.cart.length }}
					</div>
				</li>

				<li
					v-if="user"
					class="relative flex cursor-pointer items-center justify-between border-b px-3 py-2.5 hover:bg-gray-100"
					@click="signOut()"
				>
					<div class="flex items-center text-[20px] font-semibold">
						<Icon name="ph:sign-out-light" size="33" />
						<span class="pl-4">Sign out</span>
					</div>
				</li>

				<li
					v-else
					class="relative flex cursor-pointer items-center justify-between border-b px-3 py-2.5 hover:bg-gray-100"
					@click="signIn()"
				>
					<div class="flex items-center text-[20px] font-semibold">
						<Icon name="ph:sign-in-light" size="33" />
						<span class="pl-4">Sign in / Register</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();

const client = useSupabaseClient();
const user = useSupabaseUser();

const goTo = url => {
	userStore.isMenuOverlay = false;
	return navigateTo(`/${url}`);
};

const signOut = () => {
	client.auth.signOut();
	userStore.isMenuOverlay = false;
	return navigateTo('/');
};

const signIn = () => {
	userStore.isMenuOverlay = false;
	return navigateTo('/auth');
};
</script>
