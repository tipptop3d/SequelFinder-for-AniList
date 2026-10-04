<template>
	<div>
		<NavBar />
		<div class="page-content">
			<SearchBar
				@loading="
					(status) => {
						isLoading = status
					}
				"
				@update="
					(content) => {
						mediaIds = content
					}
				"
			/>
			<ResultsList v-if="mediaIds" :ids="mediaIds" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ResultsList from './components/ResultsList.vue'
import SearchBar from './components/SearchBar.vue'
import NavBar from './components/NavBar.vue'

const isLoading = ref<boolean>(false)
const mediaIds = ref<number[]>()
</script>

<style>
.list-enter-active {
	transition: all 0.3s ease-in-out 0.05s;
}

.list-leave-active {
	transition: all 0.3s ease-in-out;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: scale(0.95);
	transform-origin: center top;
}
</style>
