<template>
	<div
		:id="`ProductComponent${product.id}`"
		class="inline-block cursor-pointer rounded bg-white hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)]"
	>
		<NuxtLink :to="`/item/${product.id}`">
			<img class="rounded-t" :src="product.url" />

			<div id="ProductDetails">
				<span class="flex items-center justify-start gap-3 px-1 pt-1">
					<span class="font-semibold text-[#FF6674]">${{ priceComputed }}</span>
					<span class="text-light text-sm text-gray-500 line-through">${{ oldPriceComputed }}</span>
				</span>

				<span class="relative -top-1.5 px-1 text-xs font-semibold text-[#FF6674]"> Extra 5% off </span>

				<div class="relative -top-1 flex items-center gap-1 px-1">
					<span class="rounded-sm bg-[#FD374F] px-1.5 text-[9px] font-semibold text-white">Welcome Deal</span>
					<span class="rounded-sm border bg-[#F5F5F5] px-1.5 text-[9px] font-semibold text-[#C08562]">Top Selling</span>
				</div>

				<p class="flex items-center px-1 pt-0.5 text-xs text-[#252525]">
					5,000+ sold <Icon name="material-symbols:star-rate" color="#757575" class="ml-1.5" /> 4.7
				</p>

				<p class="px-1 pt-0.5 text-xs text-[#252525]">
					{{ product.title.substring(0, 60) }}
				</p>

				<p class="px-1 pb-1">
					<span class="text-xs font-semibold text-[#009A66]">Free Shipping</span>
				</p>
			</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['product']);
const { product } = toRefs(props);

const priceComputed = computed(() => {
	return product.value.price / 100;
});

const oldPriceComputed = computed(() => {
	const res = (product.value.price + product.value.price / 20) / 100;
	return res.toFixed(2);
});
</script>
