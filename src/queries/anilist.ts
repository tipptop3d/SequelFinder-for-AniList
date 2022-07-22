import { gql } from 'graphql-request'

export const allAnimeQuery = gql`
	query ($name: String) {
		allAnime: MediaListCollection(
			userName: $name
			type: ANIME
			sort: MEDIA_ID
		) {
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
`

export const mediaWithId = gql`
	query ($page: Int, $ids: [Int]) {
		Page(page: $page) {
			pageInfo {
				hasNextPage
			}
			media(id_in: $ids) {
				id
				format
				title {
					romaji
				}
				coverImage {
					extraLarge
				}
				siteUrl
			}
		}
	}
`
