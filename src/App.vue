<script setup lang="ts">
// vue
import { inject, ref } from 'vue'

// components
import MediaEntry from './components/MediaEntry.vue'
import ResultsList from './components/ResultsList.vue'
import SearchBar from './components/SearchBar.vue'
import NavBar from './components/NavBar.vue'

// modules
import type { GraphQLClient } from 'graphql-request'

// other
import type {
	AllLists,
	Media,
	MediaPage,
	RelationsOfCompleted,
} from './helpers/interfaces'
import { getNotPlannedSequels } from './helpers/anime'
import { allAnimeQuery, mediaWithId } from './queries/anilist'

const sequelsNotPlanned = ref<Media[]>([])
const gqlClient = inject<GraphQLClient>('gqlClient') as GraphQLClient

async function fetchData(userName: string) {
	const data = await gqlClient.request(allAnimeQuery, { name: userName })
	const allLists: AllLists[] = data.allAnime.lists
	const relationsOfCompleted: RelationsOfCompleted[] =
		data.relationsOfCompleted.lists[0].entries

	return { allLists, relationsOfCompleted }
}

async function handleSubmit(userName: string) {
	sequelsNotPlanned.value = []
	const { allLists, relationsOfCompleted } = await fetchData(userName)
	const ids = getNotPlannedSequels(allLists, relationsOfCompleted)

	let hasNextPage
	let page = 1
	do {
		const data: MediaPage = (
			await gqlClient.request(mediaWithId, { ids: ids, page: page++ })
		).Page
		hasNextPage = data.pageInfo.hasNextPage
		sequelsNotPlanned.value = sequelsNotPlanned.value.concat(data.media)
	} while (hasNextPage)
}
</script>

<template>
	<div>
		<NavBar />
		<div class="page-content">
			<SearchBar @submitted="handleSubmit" />
			<ResultsList>
				<TransitionGroup name="list">
					<MediaEntry
						v-for="media in sequelsNotPlanned"
						:key="media.id"
						:media="media"
					/>
				</TransitionGroup>
			</ResultsList>
		</div>
	</div>
</template>

<style>
.list-enter-active {
	transition: 0.3s all 0.05s ease-in-out;
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
