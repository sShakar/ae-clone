<template>
	<div id="MainLayout" class="fixed z-50 w-full">
		<div id="TopMenu" class="hidden w-full border-b bg-[#FAFAFA] md:block">
			<ul class="flex h-10 max-w-[1200px] items-center justify-end bg-[#FAFAFA] px-2 text-xs font-light text-[#333333]">
				<li class="cursor-pointer border-r border-r-gray-400 px-3 hover:text-[#FF4646]">Sell on AliExpress</li>
				<li class="cursor-pointer border-r border-r-gray-400 px-3 hover:text-[#FF4646]">Cookie Preferences</li>
				<li class="cursor-pointer border-r border-r-gray-400 px-3 hover:text-[#FF4646]">Help</li>
				<li class="cursor-pointer border-r border-r-gray-400 px-3 hover:text-[#FF4646]">Buyer Protection</li>
				<li class="cursor-pointer px-3 hover:text-[#FF4646]">
					<Icon name="ic:sharp-install-mobile" size="17" />
					App
				</li>
				<li
					class="relative flex h-full cursor-pointer items-center px-2.5 hover:text-[#FF4646]"
					:class="
						isAccountMenu
							? 'z-40 border bg-white shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)]'
							: 'border border-[#FAFAFA]'
					"
					@mouseenter="isAccountMenu = true"
					@mouseleave="isAccountMenu = false"
				>
					<Icon name="ph:user-thin" size="17" />
					Account
					<Icon name="mdi:chevron-down" size="15" class="ml-5" />

					<div
						v-if="isAccountMenu"
						id="AccountMenu"
						class="absolute -left-[100px] top-[38px] z-40 w-[220px] border-x border-b bg-white text-[#333333]"
					>
						<div v-if="!user">
							<div class="text-semibold my-4 px-3 text-[15px]">Welcome to AliExpress!</div>
							<div class="mb-3 flex items-center gap-1 px-3">
								<NuxtLink
									to="/auth"
									class="w-full rounded-sm bg-[#FF4646] p-2 text-center text-[16px] font-semibold text-white"
								>
									Login / Register
								</NuxtLink>
							</div>
						</div>
						<div class="border-b" />
						<ul class="bg-white">
							<li class="w-full px-4 py-2 text-[13px] hover:bg-gray-200" @click="navigateTo('/orders')">My Orders</li>
							<li v-if="user" class="w-full px-4 py-2 text-[13px] hover:bg-gray-200" @click="client.auth.signOut()">
								Sign out
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<div id="MainHeader" class="flex w-full items-center bg-white">
			<div class="mx-auto flex w-full max-w-[1150px] justify-between gap-10 px-3 py-5 lg:justify-start">
				<NuxtLink to="/" class="min-w-[170px]">
					<img width="170" src="/AliExpress-logo.png" />
				</NuxtLink>

				<div class="hidden w-full max-w-[700px] md:block">
					<div class="relative">
						<div class="flex w-full items-center rounded-md border-2 border-[#FF4646]">
							<input
								v-model="searchItem"
								class="w-full pl-3 text-sm placeholder-gray-400 focus:outline-none"
								placeholder="kitchen accessories"
								type="text"
							/>
							<Icon v-if="isSearching" name="eos-icons:loading" size="25" class="mr-2" />
							<button class="flex h-[100%] items-center bg-[#FF4646] p-1.5 px-2">
								<Icon name="ph:magnifying-glass" size="20" color="#ffffff" />
							</button>
						</div>

						<div v-if="items && items.data" class="absolute h-auto w-full max-w-[700px] bg-white">
							<div v-for="item in items.data" :key="item" class="p-1">
								<NuxtLink
									:to="`/item/${item.id}`"
									class="flex w-full cursor-pointer items-center justify-between hover:bg-gray-100"
								>
									<div class="flex items-center">
										<img class="rounded-md" width="40" :src="item.url" />
										<div class="ml-2 truncate">{{ item.title }}</div>
									</div>
									<div class="truncate">${{ item.price / 100 }}</div>
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>

				<NuxtLink to="/shoppingcart" class="flex items-center">
					<button class="relative hidden md:block" @mouseenter="isCartHover = true" @mouseleave="isCartHover = false">
						<span
							class="absolute -right-[3px] top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#FF4646] px-0.5 text-xs text-white"
						>
							{{ userStore.cart.length }}
						</span>
						<div class="min-w-[40px]">
							<Icon name="ph:shopping-cart-simple-light" size="33" :color="isCartHover ? '#FF4646' : ''" />
						</div>
					</button>
				</NuxtLink>

				<button
					class="-mt-[4px] block rounded-full p-1.5 hover:bg-gray-200 md:hidden"
					@click="userStore.isMenuOverlay = true"
				>
					<Icon name="radix-icons:hamburger-menu" size="33" />
				</button>
			</div>
		</div>
	</div>

	<Loading v-if="userStore.isLoading" />

	<div class="pt-[80px] md:pt-[130px] lg:pt-[150px]" />
	<slot />

	<Footer v-if="!userStore.isLoading" />
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const client = useSupabaseClient();
const user = useSupabaseUser();

const isAccountMenu = ref(false);
const isCartHover = ref(false);
const isSearching = ref(false);
const searchItem = ref('');
const items = ref(null);

const searchByName = useDebounce(async () => {
	isSearching.value = true;
	items.value = await useFetch(`/api/prisma/search-by-name/${searchItem.value}`);
	isSearching.value = false;
}, 100);

watch(
	() => searchItem.value,
	async () => {
		if (!searchItem.value) {
			setTimeout(() => {
				items.value = '';
				isSearching.value = false;
				return;
			}, 500);
		}
		searchByName();
	}
);
</script>
