<template>
	<div>
		<client-only>
			<input
				v-model="inputComputed"
				:placeholder="placeholder"
				:maxlength="max"
				class="w-full rounded-lg border border-[#EFF0EB] bg-white p-3 text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
				:class="`${isFocused && 'border-gray-900'} ${error && 'border-red-500'}`"
				:type="inputType"
				autocomplete="off"
				@focus="isFocused = true"
				@blur="isFocused = false"
			/>
		</client-only>
		<span v-if="error" class="text-[14px] font-semibold text-red-500">
			{{ error }}
		</span>
	</div>
</template>

<script lang="ts" setup>
type Props = {
	input: string;
	placeholder: string;
	max: number;
	inputType: string;
	error: string;
};

const props = defineProps<Props>();
const emit = defineEmits(['update:input']);

const { input, placeholder, max, inputType, error } = toRefs(props);
const isFocused = ref<boolean>(false);
const inputComputed = computed({
	get: () => input?.value,
	set: val => emit('update:input', val)
});
</script>
