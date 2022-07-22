import type { MediaFormats } from '@/enums'

export type MediaList = {
	entries: [{ media: { id: number } }]
}

export type RelationsOfCompleted = {
	media: {
		relations: {
			edges: [{ relationType: string; node: { id: number } }]
		}
	}
}

export type MediaPage = {
	pageInfo: {
		hasNextPage: boolean
	}
	media: Media[]
}

export type Media = {
	id: number
	format: MediaFormat
	title: {
		romaji: string
	}
	coverImage: {
		extraLarge: string
	}
	siteUrl: string
}

export type MediaFormat = keyof typeof MediaFormats
