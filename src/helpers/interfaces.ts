export interface AllLists {
	entries: [{ media: { id: number } }]
}

export interface RelationsOfCompleted {
	media: {
		relations: {
			edges: [{ relationType: string; node: { id: number } }]
		}
	}
}

export interface MediaPage {
	pageInfo: {
		hasNextPage: boolean
	}
	media: [Media]
}

export interface Media {
	id: number
	title: {
		romaji: string
	}
	coverImage: {
		extraLarge: string
	}
	siteUrl: string
}
