<template>
	<div v-if="mediaQuery.fetching.value" class="spinner" />
	<div v-else-if="mediaQuery.error.value">Something went wrong: {{ mediaQuery.error }}</div>
	<div v-else-if="mediaQuery.data.value" class="grid-container">
		<MediaEntry v-for="entry in filteredIds" :key="entry?.id" :media="entry" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { useQuery } from '@urql/vue'
import { graphql } from '../gql'

import MediaEntry from './MediaEntry.vue'

const { ids = [] } = defineProps<{ ids: number[] }>()
const page = ref(1)

const filteredIds = computed(() =>
	mediaQuery.data?.value?.Page?.media?.filter((media) => media != null),
)

const mediaQuery = useQuery({
	query: graphql(`
		query getMedia($page: Int, $ids: [Int]) {
			Page(page: $page, perPage: 50) {
				pageInfo {
					currentPage
					hasNextPage
				}
				media(id_in: $ids) {
					id
					format
					title {
						romaji
						english
						native
					}
					siteUrl
					coverImage {
						extraLarge
					}
				}
			}
		}
	`),
	variables: computed(() => ({ ids, page: page.value })),
})
</script>

<style scoped lang="scss">
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(160px, 200px));
	gap: 16px;
	width: 100%;
	height: 100%;
	justify-content: center;
	padding-left: 16px;
	padding-right: 16px;
}

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
</style>
