<template>
	<MainLayout>
		<div id="SuccessPage" class="mx-auto mt-4 min-h-[50vh] max-w-[1200px] px-2">
			<div class="min-h-[150px] w-full bg-white p-6">
				<div class="flex items-center text-xl">
					<Icon name="clarity:success-standard-line" color="#5FCB04" size="35" />
					<span class="pl-4">Payment Successful</span>
				</div>
				<p class="pl-[50px] text-sm">Thank you! We've received your payment.</p>
			</div>
		</div>
	</MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

onMounted(() => {
	setTimeout(() => (userStore.isLoading = false), 300);
});
</script>
