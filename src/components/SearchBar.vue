<template>
	<div class="input">
		<div class="query">
			<input v-model="userName" class="query-text" type="text" placeholder="Your Username" />
			<button class="submit-button" @click="handleSubmit">
				<span class="submit-text">Search</span>
				<span class="submit-icon material-symbols-outlined">search</span>
			</button>
		</div>
		<MultiSelectDropdown v-model="checkedFormats" class="multi-select" :options="MediaFormats" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { MediaFormats } from '@/enums'
import { useQuery } from '@urql/vue'
import { graphql } from '../gql'

import MultiSelectDropdown from './MultiSelect/MultiSelectDropdown.vue'
import { getSequelIdsNotPlanned } from '@/helpers/anime.ts'

const emit = defineEmits<{
	(event: 'loading', status: boolean): void
	(event: 'update', content: number[]): void
}>()

const userName = ref<string>('')
const checkedFormats = defineModel<Set<string>>({
	default: () => new Set(['TV']),
})

const userData = useQuery({
	query: graphql(`
		query getAllAnime($name: String) {
			allAnime: MediaListCollection(userName: $name, type: ANIME, sort: MEDIA_ID) {
				lists {
					entries {
						media {
							id
						}
					}
				}
			}
			relationsOfCompleted: MediaListCollection(
				userName: $name
				type: ANIME
				sort: MEDIA_ID
				status: COMPLETED
			) {
				lists {
					entries {
						media {
							relations {
								edges {
									relationType(version: 2)
									node {
										id
									}
								}
							}
						}
					}
				}
			}
		}
	`),
	variables: computed(() => ({ name: userName.value })),
	pause: true,
})

async function handleSubmit() {
	if (userName.value.length < 2) {
		return alert('Username has to be aleast 2 Characters long')
	}
	emit('loading', true)
	emit('update', [])
	userData.resume()
	await userData
	const data = userData.data.value!
	const sequelsNotPlanned = getSequelIdsNotPlanned(data.allAnime, data.relationsOfCompleted)
	emit('update', sequelsNotPlanned)
	emit('loading', false)
}
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
	color: var(--primary-text-color);
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
