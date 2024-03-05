<template>
	<div class="my-2 flex justify-start">
		<img class="w-[90px] rounded-md md:w-[150px]" :src="product.url" />

		<div class="overflow-hidden pl-2">
			<div class="flex items-center">
				<span class="min-w-[80px] rounded-sm bg-[#FD374F] px-1.5 text-[9px] font-semibold text-white"
					>Welcome Deal</span
				>
				<div class="truncate pl-2">{{ product.title }}</div>
			</div>

			<div class="mt-2 text-lg font-semibold">
				$ <span class="font-bold">{{ product.price / 100 }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['product']);
const { product } = toRefs(props);
</script>
