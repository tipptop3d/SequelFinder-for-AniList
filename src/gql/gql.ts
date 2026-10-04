/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\t\tquery getMedia($page: Int, $ids: [Int]) {\n\t\t\tPage(page: $page, perPage: 50) {\n\t\t\t\tpageInfo {\n\t\t\t\t\tcurrentPage\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tmedia(id_in: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tformat\n\t\t\t\t\ttitle {\n\t\t\t\t\t\tromaji\n\t\t\t\t\t\tenglish\n\t\t\t\t\t\tnative\n\t\t\t\t\t}\n\t\t\t\t\tsiteUrl\n\t\t\t\t\tcoverImage {\n\t\t\t\t\t\textraLarge\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": typeof types.GetMediaDocument,
    "\n\t\tquery getAllAnime($name: String) {\n\t\t\tallAnime: MediaListCollection(userName: $name, type: ANIME, sort: MEDIA_ID) {\n\t\t\t\tlists {\n\t\t\t\t\tentries {\n\t\t\t\t\t\tmedia {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\trelationsOfCompleted: MediaListCollection(\n\t\t\t\tuserName: $name\n\t\t\t\ttype: ANIME\n\t\t\t\tsort: MEDIA_ID\n\t\t\t\tstatus: COMPLETED\n\t\t\t) {\n\t\t\t\tlists {\n\t\t\t\t\tentries {\n\t\t\t\t\t\tmedia {\n\t\t\t\t\t\t\trelations {\n\t\t\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\t\t\trelationType(version: 2)\n\t\t\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": typeof types.GetAllAnimeDocument,
};
const documents: Documents = {
    "\n\t\tquery getMedia($page: Int, $ids: [Int]) {\n\t\t\tPage(page: $page, perPage: 50) {\n\t\t\t\tpageInfo {\n\t\t\t\t\tcurrentPage\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tmedia(id_in: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tformat\n\t\t\t\t\ttitle {\n\t\t\t\t\t\tromaji\n\t\t\t\t\t\tenglish\n\t\t\t\t\t\tnative\n\t\t\t\t\t}\n\t\t\t\t\tsiteUrl\n\t\t\t\t\tcoverImage {\n\t\t\t\t\t\textraLarge\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetMediaDocument,
    "\n\t\tquery getAllAnime($name: String) {\n\t\t\tallAnime: MediaListCollection(userName: $name, type: ANIME, sort: MEDIA_ID) {\n\t\t\t\tlists {\n\t\t\t\t\tentries {\n\t\t\t\t\t\tmedia {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\trelationsOfCompleted: MediaListCollection(\n\t\t\t\tuserName: $name\n\t\t\t\ttype: ANIME\n\t\t\t\tsort: MEDIA_ID\n\t\t\t\tstatus: COMPLETED\n\t\t\t) {\n\t\t\t\tlists {\n\t\t\t\t\tentries {\n\t\t\t\t\t\tmedia {\n\t\t\t\t\t\t\trelations {\n\t\t\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\t\t\trelationType(version: 2)\n\t\t\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.GetAllAnimeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery getMedia($page: Int, $ids: [Int]) {\n\t\t\tPage(page: $page, perPage: 50) {\n\t\t\t\tpageInfo {\n\t\t\t\t\tcurrentPage\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tmedia(id_in: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tformat\n\t\t\t\t\ttitle {\n\t\t\t\t\t\tromaji\n\t\t\t\t\t\tenglish\n\t\t\t\t\t\tnative\n\t\t\t\t\t}\n\t\t\t\t\tsiteUrl\n\t\t\t\t\tcoverImage {\n\t\t\t\t\t\textraLarge\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery getMedia($page: Int, $ids: [Int]) {\n\t\t\tPage(page: $page, perPage: 50) {\n\t\t\t\tpageInfo {\n\t\t\t\t\tcurrentPage\n\t\t\t\t\thasNextPage\n\t\t\t\t}\n\t\t\t\tmedia(id_in: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tformat\n\t\t\t\t\ttitle {\n\t\t\t\t\t\tromaji\n\t\t\t\t\t\tenglish\n\t\t\t\t\t\tnative\n\t\t\t\t\t}\n\t\t\t\t\tsiteUrl\n\t\t\t\t\tcoverImage {\n\t\t\t\t\t\textraLarge\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery getAllAnime($name: String) {\n\t\t\tallAnime: MediaListCollection(userName: $name, type: ANIME, sort: MEDIA_ID) {\n\t\t\t\tlists {\n\t\t\t\t\tentries {\n\t\t\t\t\t\tmedia {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\trelationsOfCompleted: MediaListCollection(\n\t\t\t\tuserName: $name\n\t\t\t\ttype: ANIME\n\t\t\t\tsort: MEDIA_ID\n\t\t\t\tstatus: COMPLETED\n\t\t\t) {\n\t\t\t\tlists {\n\t\t\t\t\tentries {\n\t\t\t\t\t\tmedia {\n\t\t\t\t\t\t\trelations {\n\t\t\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\t\t\trelationType(version: 2)\n\t\t\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery getAllAnime($name: String) {\n\t\t\tallAnime: MediaListCollection(userName: $name, type: ANIME, sort: MEDIA_ID) {\n\t\t\t\tlists {\n\t\t\t\t\tentries {\n\t\t\t\t\t\tmedia {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\trelationsOfCompleted: MediaListCollection(\n\t\t\t\tuserName: $name\n\t\t\t\ttype: ANIME\n\t\t\t\tsort: MEDIA_ID\n\t\t\t\tstatus: COMPLETED\n\t\t\t) {\n\t\t\t\tlists {\n\t\t\t\t\tentries {\n\t\t\t\t\t\tmedia {\n\t\t\t\t\t\t\trelations {\n\t\t\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\t\t\trelationType(version: 2)\n\t\t\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;