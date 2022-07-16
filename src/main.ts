import 'normalize.css'
import './assets/global.css'

import App from './App.vue'

import { GraphQLClient } from 'graphql-request'
import { createApp } from 'vue'

const app = createApp(App)

app.provide<GraphQLClient>(
	'gqlClient',

	new GraphQLClient('https://graphql.anilist.co', { headers: {} })
)

app.mount('#app')
