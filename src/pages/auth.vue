<template>
	<div id="AuthPage" class="h-[100vh] w-full bg-white">
		<div class="flex w-full items-center justify-center border-b border-b-gray-300 p-5">
			<NuxtLink to="/" class="min-w-[170px]">
				<img width="170" src="/AliExpress-logo.png" />
			</NuxtLink>
		</div>

		<div class="mx-auto max-w-[400px] px-2">
			<div class="my-6 text-center">Login / Register</div>

			<button
				class="flex w-full items-center justify-center gap-3 rounded-full border p-1.5 text-lg font-semibold hover:bg-gray-100"
				@click="login('google')"
			>
				<img class="w-full max-w-[30px]" src="/google-logo.png" />
				<div>Google</div>
			</button>

			<button
				class="mt-4 flex w-full items-center justify-center gap-3 rounded-full border p-1.5 text-lg font-semibold hover:bg-gray-100"
				@click="login('github')"
			>
				<img class="w-full max-w-[30px]" src="/github-logo.png" />
				<div>Github</div>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
	if (user.value) {
		return navigateTo('/');
	}
});

const login = async prov => {
	const { data, error } = await client.auth.signInWithOAuth({
		provider: prov,
		redirectTo: window.location.origin
	});
};
</script>
