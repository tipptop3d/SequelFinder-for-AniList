import type { MediaList, RelationsOfCompleted } from '../types/types'

export function getNotPlannedSequels(
	allLists: MediaList[],
	relationsOfCompleted: RelationsOfCompleted[]
) {
	const sequelsNotPlanned: number[] = []
	const allAnime = new Set<number>()

	for (const list of allLists) {
		for (const entry of list.entries) {
			allAnime.add(entry.media.id)
		}
	}

	for (const entry of relationsOfCompleted) {
		const edges = entry.media.relations.edges
		for (const edge of edges) {
			if (edge.relationType === 'SEQUEL' && !allAnime.has(edge.node.id)) {
				sequelsNotPlanned.push(edge.node.id)
			}
		}
	}
	return sequelsNotPlanned
}
