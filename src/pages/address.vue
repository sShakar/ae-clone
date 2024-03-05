<template>
	<MainLayout>
		<div id="AddressPage" class="mx-auto mt-4 max-w-[500px] px-2">
			<div class="mx-auto rounded-lg bg-white p-3">
				<div class="text-bold mb-2 text-xl">Address Details</div>
				<form @submit.prevent="submit()">
					<TextInput
						v-model:input="contactName"
						class="w-full"
						placeholder="Contact Name"
						input-type="text"
						:error="error && error.type == 'contactName' ? error.message : ''"
					/>

					<TextInput
						v-model:input="address"
						class="mt-2 w-full"
						placeholder="Address"
						input-type="text"
						:error="error && error.type == 'address' ? error.message : ''"
					/>

					<TextInput
						v-model:input="zipCode"
						class="mt-2 w-full"
						placeholder="Zip Code"
						input-type="text"
						:error="error && error.type == 'zipCode' ? error.message : ''"
					/>

					<TextInput
						v-model:input="city"
						class="mt-2 w-full"
						placeholder="City"
						input-type="text"
						:error="error && error.type == 'city' ? error.message : ''"
					/>

					<TextInput
						v-model:input="country"
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
import MainLayout from '@/layouts/MainLayout.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const user = useSupabaseUser();

const contactName = ref(null);
const address = ref(null);
const zipCode = ref(null);
const city = ref(null);
const country = ref(null);

const currentAddress = ref(null);
const isUpdate = ref(false);
const isWorking = ref(false);
const error = ref(null);

watchEffect(async () => {
	currentAddress.value = await useFetch(`/api/prisma/get-address-by-user/${user.value.id}`);

	if (currentAddress.value.data) {
		contactName.value = currentAddress.value.data.name;
		address.value = currentAddress.value.data.address;
		zipCode.value = currentAddress.value.data.zipcode;
		city.value = currentAddress.value.data.city;
		country.value = currentAddress.value.data.country;

		isUpdate.value = true;
	}

	userStore.isLoading = false;
});

const submit = async () => {
	isWorking.value = true;
	error.value = null;

	if (!contactName.value) {
		error.value = {
			type: 'contactName',
			message: 'A contact name is required'
		};
	} else if (!address.value) {
		error.value = {
			type: 'address',
			message: 'An address is required'
		};
	} else if (!zipCode.value) {
		error.value = {
			type: 'zipCode',
			message: 'A zip code is required'
		};
	} else if (!city.value) {
		error.value = {
			type: 'city',
			message: 'A city is required'
		};
	} else if (!country.value) {
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
				userId: user.value.id,
				name: contactName.value,
				address: address.value,
				zipCode: zipCode.value,
				city: city.value,
				country: country.value
			}
		});

		isWorking.value = false;

		return navigateTo('/checkout');
	}

	await useFetch(`/api/prisma/add-address/`, {
		method: 'POST',
		body: {
			userId: user.value.id,
			name: contactName.value,
			address: address.value,
			zipCode: zipCode.value,
			city: city.value,
			country: country.value
		}
	});

	isWorking.value = false;

	return navigateTo('/checkout');
};
</script>
