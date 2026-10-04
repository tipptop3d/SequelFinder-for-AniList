<template>
	<a :href="media.siteUrl || undefined" target="_blank" rel="noreferrer noopener">
		<div class="cover">
			<div class="image" :style="bgImageStyle" />
			<div class="title">
				{{ media.title?.english ?? media.title?.romaji ?? media.title?.native ?? 'No title' }}
			</div>
			<div class="format">{{ media.format }}</div>
		</div>
	</a>
</template>

<script setup lang="ts">
import type { MediaFormat } from '@/gql/graphql'
import { computed } from 'vue'

const props = defineProps<{
	media: {
		siteUrl: string | null
		coverImage: { extraLarge: string | null } | null
		format: MediaFormat | null
		title: {
			romaji: string | null
			english: string | null
			native: string | null
		} | null
	}
}>()
const bgImageStyle = computed(() => ({
	backgroundImage: props.media.coverImage?.extraLarge
		? `url(${props.media.coverImage.extraLarge})`
		: undefined,
}))
</script>

<style scoped>
.cover {
	display: inline-block;
	position: relative;
	width: 100%;
	border-radius: 4px;
}

.image {
	background-color: #4b4b4b;
	background-position: 50%;
	background-size: cover;
	object-fit: cover;
	border-radius: 4px;
	width: 100%;
	height: 265px;
}

.title {
	width: 100%;
	display: block;
	text-align: left;
	border-radius: 0 0 4px 4px;
	color: var(--primary-text-color);
	padding: 12px 6px 12px;
	font-size: 1rem;
}

.format {
	color: var(--primary-text-color);
}
</style>
