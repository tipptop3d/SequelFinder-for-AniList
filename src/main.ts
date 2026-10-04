import 'normalize.css'
import './assets/global.scss'

import App from './App.vue'

import { createApp } from 'vue'
import urql, { cacheExchange, fetchExchange } from '@urql/vue'

const app = createApp(App)

app.use(urql, {
	url: 'https://graphql.anilist.co',
	exchanges: [cacheExchange, fetchExchange],
	preferGetMethod: false,
})

app.mount('#app')
