<template>
	<MainLayout>
		<div id="AddressPage" class="mx-auto mt-4 max-w-[500px] px-2">
			<div class="mx-auto rounded-lg bg-white p-3">
				<div class="text-bold mb-2 text-xl">Address Details</div>
				<form @submit.prevent="submit()">
					<TextInput
						v-model:input="newAddress.contactName"
						class="w-full"
						placeholder="Contact Name"
						input-type="text"
						:error="error && error.type == 'contactName' ? error.message : ''"
					/>

					<TextInput
						v-model:input="newAddress.address"
						class="mt-2 w-full"
						placeholder="Address"
						input-type="text"
						:error="error && error.type == 'address' ? error.message : ''"
					/>

					<TextInput
						v-model:input="newAddress.zipCode"
						class="mt-2 w-full"
						placeholder="Zip Code"
						input-type="text"
						:error="error && error.type == 'zipCode' ? error.message : ''"
					/>

					<TextInput
						v-model:input="newAddress.city"
						class="mt-2 w-full"
						placeholder="City"
						input-type="text"
						:error="error && error.type == 'city' ? error.message : ''"
					/>

					<TextInput
						v-model:input="newAddress.country"
						class="mt-2 w-full"
						placeholder="Country"
						input-type="text"
						:error="error && error.type == 'country' ? error.message : ''"
					/>

					<button
						:disabled="isWorking"
						type="submit"
						class="mt-6 w-full rounded-full bg-gradient-to-r from-[#FE630C] to-[#FF3200] p-1.5 text-[21px] font-semibold text-white"
					>
						<div v-if="!isWorking">Update Address</div>
						<Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
					</button>
				</form>
			</div>
		</div>
	</MainLayout>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
import MainLayout from '@/layouts/MainLayout.vue';

const user = useSupabaseUser();
const userStore = useUserStore();

const newAddress = ref({
	contactName: '',
	address: '',
	zipCode: '',
	city: '',
	country: ''
});

const currentAddress = ref<any>();
const isUpdate = ref<boolean>(false);
const isWorking = ref<boolean>(false);
const error = ref<any>(null);

watchEffect(async () => {
	currentAddress.value = await useFetch(`/api/prisma/get-address-by-user/${user.value?.id}`);

	if (currentAddress.value.data) {
		newAddress.value = currentAddress.value.data;
		isUpdate.value = true;
	}

	userStore.isLoading = false;
});

const submit = async () => {
	isWorking.value = true;
	error.value = null;

	if (!newAddress.value.contactName) {
		error.value = {
			type: 'contactName',
			message: 'A contact name is required'
		};
	} else if (!newAddress.value.address) {
		error.value = {
			type: 'address',
			message: 'An address is required'
		};
	} else if (!newAddress.value.zipCode) {
		error.value = {
			type: 'zipCode',
			message: 'A zip code is required'
		};
	} else if (!newAddress.value.city) {
		error.value = {
			type: 'city',
			message: 'A city is required'
		};
	} else if (!newAddress.value.country) {
		error.value = {
			type: 'country',
			message: 'A country is required'
		};
	}

	if (error.value) {
		isWorking.value = false;
		return;
	}

	if (isUpdate.value) {
		await useFetch(`/api/prisma/update-address/${currentAddress.value.data.id}`, {
			method: 'PATCH',
			body: {
				...newAddress.value,
				userId: user.value?.id,
				name: newAddress.value.contactName
			}
		});

		isWorking.value = false;

		return navigateTo('/checkout');
	}

	await useFetch(`/api/prisma/add-address/`, {
		method: 'POST',
		body: {
			...newAddress.value,
			userId: user.value?.id,
			name: newAddress.value.contactName
		}
	});

	isWorking.value = false;

	return navigateTo('/checkout');
};
</script>
