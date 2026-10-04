import type { GetAllAnimeQuery } from '../gql/graphql'

export function getSequelIdsNotPlanned(
	allLists: GetAllAnimeQuery['allAnime'],
	relationsOfCompleted: GetAllAnimeQuery['relationsOfCompleted'],
) {
	const sequelIdsNotPlanned: number[] = []
	const allAnime = new Set<number>()

	// build a flat set of all animes the user has in his anime collection
	for (const list of allLists?.lists ?? []) {
		for (const entry of list?.entries ?? []) {
			if (entry?.media) {
				allAnime.add(entry.media.id)
			}
		}
	}

	// iterates over every sequel
	for (const list of relationsOfCompleted?.lists ?? []) {
		for (const entry of list?.entries ?? []) {
			for (const edge of entry?.media?.relations?.edges ?? []) {
				if (edge?.relationType === 'SEQUEL' && edge.node && !allAnime.has(edge.node.id)) {
					sequelIdsNotPlanned.push(edge.node.id)
				}
			}
		}
	}
	return sequelIdsNotPlanned
}
