<template>
	<div class="my-2 flex justify-start">
		<div class="my-auto">
			<div
				class="flex cursor-pointer items-center justify-start p-0.5"
				@mouseenter="isHover = true"
				@mouseleave="isHover = false"
			>
				<div
					class="ml-2 mr-5 flex h-[20px] w-[20px] items-center justify-center rounded-full border"
					:class="[isHover ? 'border-[#FD374F]' : 'border-gray-300', isSelected ? 'bg-[#FD374F]' : '']"
					@click="isSelected = !isSelected"
				>
					<div class="h-[8px] w-[8px] rounded-full bg-white" />
				</div>
			</div>
		</div>

		<img class="w-[90px] rounded-md md:w-[150px]" :src="product.url" alt="" />

		<div class="w-full overflow-hidden pl-2">
			<div class="flex w-full items-center justify-between">
				<div class="flex items-center justify-between truncate">
					<span class="hidden min-w-[80px] rounded-sm bg-[#FD374F] px-1.5 text-[9px] font-semibold text-white sm:block"
						>Welcome Deal</span
					>
					<div class="truncate sm:pl-2">{{ product.title }}</div>
				</div>
				<button class="mx-3 -mt-0.5 hidden hover:text-red-500 sm:block" @click="removeFromCart()">
					<Icon name="material-symbols:delete-outline" size="20" />
				</button>
			</div>

			<div class="text-xl font-semibold">
				$ <span class="font-bold">{{ product.price / 100 }}</span>
			</div>

			<p class="pt-1 text-xs font-semibold text-[#009A66]">Free 11-day delivery over ￡8.28</p>

			<p class="pt-1 text-xs font-semibold text-[#009A66]">Free Shipping</p>

			<div class="flex items-center justify-end">
				<button class="-mt-0.5 block hover:text-red-500 sm:hidden" @click="removeFromCart()">
					<Icon name="material-symbols:delete-outline" size="20" />
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();

type Props = {
	product: {
		id: number;
		title: string;
		url: string;
		price: number;
	};
	selectedArray: [];
};

const props = defineProps<Props>();
const { product } = toRefs(props);

const emit = defineEmits(['selectedRadio']);

const isHover = ref(false);
const isSelected = ref(false);

const removeFromCart = () => {
	userStore.cart.forEach((prod, index) => {
		if (prod.id === product.value.id) {
			userStore.cart.splice(index, 1);
		}
	});
};

watch(
	() => isSelected.value,
	val => {
		emit('selectedRadio', { id: product.value.id, val: val });
	}
);
</script>
