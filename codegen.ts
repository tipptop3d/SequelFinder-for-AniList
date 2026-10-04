import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: 'https://graphql.anilist.co/',
	documents: ['src/**/*.vue', 'src/**/*.ts'],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./src/gql/': {
			preset: 'client',
			config: {
				useTypeImports: true,
				// avoidOptionals: true,
			},
		},
	},
}

export default config
