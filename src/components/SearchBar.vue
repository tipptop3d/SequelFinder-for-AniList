<template>
	<div class="input">
		<div class="query">
			<input
				v-model="userName"
				class="query-text"
				type="text"
				placeholder="Your Username"
			/>
			<button class="submit-button" @click="onSubmit">
				<span class="submit-text">Search</span>
				<span class="submit-icon material-symbols-outlined">search</span>
			</button>
		</div>
		<MultiSelectDropdown
			class="multi-select"
			v-model="checkedFormats"
			:options="mediaFormats"
		>
			<template #select>
				<div class="select">
					<span class="placeholder-text">Formats</span>
					<span class="expand-icon material-symbols-outlined">expand_more</span>
				</div>
			</template>
		</MultiSelectDropdown>
	</div>
</template>

<script setup lang="ts">
// vue
import { ref } from 'vue'
import MultiSelectDropdown from './MultiSelect/MultiSelectDropdown.vue'

const emit = defineEmits<{
	(event: 'submitted', name: string): void
	(event: 'error', reason: string): void
}>()

const userName = ref<string>('')
const mediaFormats = [
	'TV',
	'TV_SHORT',
	'MOVIE',
	'SPECIAL',
	'OVA',
	'ONA',
	'MUSIC',
]
const checkedFormats = ref<Set<string>>(new Set(['TV']))
console.log(checkedFormats.value)

function onSubmit() {
	if (userName.value.length < 2) {
		return emit('error', 'Please enter a name with at least 2 characters')
	}
	emit('submitted', userName.value)
}
</script>

<style scoped>
.input {
	display: flex;
	gap: 20px;
	width: 90%;
	height: 40px;
	justify-content: center;
	margin: 12px auto;
	flex-wrap: wrap;
}
.query {
	display: inline-flex;
	height: 100%;
}

.query-text {
	font-size: 1.1rem;
	background-color: var(--secondary-bg-color);
	color: var(--primary-text-color);
	border-radius: 12px 0 0 12px;
	padding-left: 10px;
	height: 100%;
	width: 80%;
	min-width: 120px;
	max-width: 180px;
}

.submit-button {
	font-size: 1.1rem;
	text-align: center;
	padding: 0 10px;
	color: rgb(46, 46, 46);
	border-radius: 0 12px 12px 0;
	width: auto;
	height: 100%;
	background-color: var(--primary-color);
	cursor: pointer;
	transition: all 0.2s;
}
.submit-text {
	display: block;
}
.submit-icon {
	display: none;
}
@media screen and (max-width: 480px) {
	.submit-text {
		display: none;
	}
	.submit-icon {
		display: block;
	}
}

.submit-button:hover {
	background-color: var(--primary-color-light);
}

.multi-select {
	height: 100%;
	width: 180px;
	background-color: var(--secondary-bg-color);
	border-radius: 12px;
}
.select {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
}
.placeholder-text {
	color: var(--secondary-text-color);
	padding-left: 10px;
}
.expand-icon {
	padding: 4px;
	float: inline-end;
}
</style>
