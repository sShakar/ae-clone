<template>
	<main id="MainLayout" class="fixed z-50 w-full">
		<div id="TopMenu" class="hidden w-full border-b bg-[#FAFAFA] md:block">
			<ul
				class="flex h-10 max-w-[1200px] items-center justify-end bg-[#FAFAFA] px-2 text-xs font-light text-[#333333]"
			></ul>
		</div>
		<slot />
	</main>
</template>
