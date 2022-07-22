<template>
	<a :href="media.siteUrl" target="_blank" rel="noreferrer noopener">
		<div class="cover">
			<div class="image" :style="bgImageStyle" />
			<div class="on-image title">{{ media.title.romaji }}</div>
			<div class="on-image format">{{ MediaFormats[media.format] }}</div>
		</div>
	</a>
</template>

<script setup lang="ts">
import type { Media } from '@/types/types'
import { MediaFormats } from '@/enums'

const props = defineProps<{ media: Media }>()
const bgImageStyle = {
	backgroundImage: `url(${props.media.coverImage.extraLarge})`,
}
</script>

<style scoped>
.cover {
	display: inline-block;
	position: relative;
	width: 100%;
	height: 100%;
	box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.4);
	transition: transform 0.2s;
	border-radius: 4px;
}

.cover:hover {
	box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.6);
	transform: scale(1.05);
}

.image {
	background-position: 50%;
	background-size: cover;
	border-radius: 4px;
	width: 100%;
	height: 100%;
}
.on-image {
	display: block;
	text-align: center;
	position: absolute;
	background-color: rgba(28, 18, 42, 0.72);
	border-radius: 0 0 4px 4px;
	color: rgb(253, 247, 255);
	font-size: 1.05rem;
}
.title {
	width: 100%;
	display: block;
	text-align: center;
	position: absolute;
	background-color: rgba(28, 18, 42, 0.72);
	border-radius: 0 0 4px 4px;
	color: rgb(253, 247, 255);
	bottom: 0;
	left: 0;
	padding: 12px 6px 12px;
	font-size: 1.05rem;
}
</style>
