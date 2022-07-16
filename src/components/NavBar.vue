<template>
	<header class="header">
		<img class="logo" src="src\assets\logo-transparent-64x.png" />
		<h1>Sequel Finder for AniList</h1>
	</header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
	display: flex;
	background-color: var(--secondary-bg-color);
	align-items: center;
	justify-content: center;
	height: 80px;
	width: 100%;
}

.logo {
	margin: 0 12px;
}

h1 {
	margin: 0 12px;
	font-weight: 700;
}
</style>
