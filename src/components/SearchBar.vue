<template>
	<div class="input">
		<div class="query">
			<input
				v-model="userName"
				class="query-text"
				type="text"
				placeholder="Your Username"
			/>
			<button class="submit-button" @click="handleSubmit">
				<span class="submit-text">Search</span>
				<span class="submit-icon material-symbols-outlined">search</span>
			</button>
		</div>
		<MultiSelectDropdown
			class="multi-select"
			v-model="checkedFormats"
			:options="MediaFormats"
		/>
	</div>
</template>

<script setup lang="ts">
// vue
import { watch, ref, inject, reactive } from 'vue'
import type {
	MediaList,
	Media,
	MediaPage,
	RelationsOfCompleted,
} from '../types/types'

import { getNotPlannedSequels } from '../helpers/anime'
import { MediaFormats } from '@/enums'
import type { GraphQLClient } from 'graphql-request'
import { allAnimeQuery, mediaWithId } from '../queries/anilist'

import MultiSelectDropdown from './MultiSelect/MultiSelectDropdown.vue'

const gqlClient = inject<GraphQLClient>('gqlClient') as GraphQLClient

// console.log(Array.from(mediaFormats.entries()))
console.log(Object.create(MediaFormats))
const emit = defineEmits<{
	(event: 'loading', status: boolean): void
	(event: 'update', content: Media[]): void
}>()

const userName = ref<string>('')

const checkedFormats = reactive<Set<string>>(new Set(['TV']))

async function fetchData(userName: string) {
	let data
	try {
		data = await gqlClient.request(allAnimeQuery, { name: userName })
	} catch (e) {
		if (e instanceof Error) {
			alert('Error: ' + e.message)
		}
	}
	const allLists: MediaList[] = data.allAnime.lists
	const relationsOfCompleted: RelationsOfCompleted[] =
		data.relationsOfCompleted.lists[0].entries

	return { allLists, relationsOfCompleted }
}

const sequelsNotPlanned = ref<Media[]>([])

async function handleSubmit() {
	if (userName.value.length < 2) {
		return alert('Username has to be aleast 2 Characters long')
	}
	emit('loading', true)
	sequelsNotPlanned.value = []
	emit('update', [])
	const { allLists, relationsOfCompleted } = await fetchData(userName.value)
	const ids = getNotPlannedSequels(allLists, relationsOfCompleted)

	let hasNextPage = true
	let page = 1
	while (hasNextPage) {
		const data: MediaPage = (
			await gqlClient.request(mediaWithId, { ids: ids, page: page++ })
		).Page
		hasNextPage = data.pageInfo.hasNextPage
		sequelsNotPlanned.value.push(...data.media)
	}
	emit('update', sequelsNotPlanned.value.filter(predicate))
	emit('loading', false)
}

function predicate(m: Media) {
	if (!checkedFormats.has(m.format)) {
		return false
	}
	return true
}

watch(checkedFormats, () => {
	emit('update', sequelsNotPlanned.value.filter(predicate))
})
</script>

<style scoped>
.input {
	display: flex;
	gap: 20px;
	width: 90%;
	height: 40px;
	justify-content: center;
	margin: 12px auto;
	flex-wrap: wrap;
}
.query {
	display: inline-flex;
	height: 100%;
}

.query-text {
	font-size: 1.1rem;
	background-color: var(--secondary-bg-color);
	color: var(--primary-text-color);
	border-radius: 12px 0 0 12px;
	padding-left: 10px;
	height: 100%;
	width: 80%;
	min-width: 120px;
	max-width: 180px;
}

.submit-button {
	font-size: 1.1rem;
	text-align: center;
	padding: 0 10px;
	color: rgb(46, 46, 46);
	border-radius: 0 12px 12px 0;
	width: auto;
	height: 100%;
	background-color: var(--primary-color);
	cursor: pointer;
	transition: all 0.2s;
}
.submit-text {
	display: block;
}
.submit-icon {
	display: none;
}
@media screen and (max-width: 480px) {
	.submit-text {
		display: none;
	}
	.submit-icon {
		display: block;
	}
}

.submit-button:hover {
	background-color: var(--primary-color-light);
}

.multi-select {
	height: 100%;
	width: 180px;
	background-color: var(--secondary-bg-color);
	border-radius: 12px;
}
</style>
