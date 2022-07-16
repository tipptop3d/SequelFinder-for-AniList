<template>
	<div class="grid-container">
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, 200px);
	grid-template-rows: repeat(auto-fill, 280px);
	grid-auto-rows: 280px;
	gap: 22px;
	width: 100%;
	height: 100%;
	justify-content: center;
}
</style>
