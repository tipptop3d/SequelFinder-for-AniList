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
						mediaList = content
					}
				"
			/>
			<ResultsList v-if="mediaList.length > 1">
				<TransitionGroup name="list">
					<MediaEntry
						v-for="media in mediaList"
						:key="media.id"
						:media="media"
					/>
				</TransitionGroup>
			</ResultsList>
			<div v-else-if="isLoading" class="spinner"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
// vue
import { ref } from 'vue'
// components
import MediaEntry from './components/MediaEntry.vue'
import ResultsList from './components/ResultsList.vue'
import SearchBar from './components/SearchBar.vue'
import NavBar from './components/NavBar.vue'
// types
import type { Media } from './types/types'

const isLoading = ref<boolean>(false)
const mediaList = ref<Media[]>([])
</script>

<style>
.spinner {
	margin: 36px auto;
	border: 16px solid var(--secondary-bg-color); /* Light grey */
	border-top: 16px solid var(--primary-color); /* Blue */
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: spin 2s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

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
