<template>
	<div
		class="option"
		tabindex="0"
		@click.stop="update"
		@keyup.stop.enter="update"
	>
		<div class="label">{{ name }}</div>
		<div class="selected" v-if="checked">
			<svg xmlns="http://www.w3.org/2000/svg" class="check-circle">
				<path
					d="M6.938 11 11.896 6.062 10.833 5 6.938 8.875 5.167 7.125 4.104 8.188ZM8 16Q6.354 16 4.896 15.375 3.438 14.75 2.344 13.656T.625 11.104Q-0 9.646-0 8-0 6.333.625 4.885 1.25 3.438 2.344 2.344 3.438 1.25 4.896.625T8-0Q9.667-0 11.115.625 12.562 1.25 13.656 2.344 14.75 3.438 15.375 4.885 16 6.333 16 8 16 9.646 15.375 11.104 14.75 12.562 13.656 13.656T11.115 15.375Q9.667 16 8 16Z"
				/>
			</svg>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	modelValue: Set<string>
	name: string
	id: string
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', checked: Set<string>): void
}>()

const checked = ref<boolean>(props.modelValue.has(props.id))

function update() {
	checked.value = !checked.value
	if (props.modelValue.has(props.id)) {
		props.modelValue.delete(props.id)
	} else {
		props.modelValue.add(props.id)
	}
	emit('update:modelValue', props.modelValue)
}
</script>

<style scoped>
.option {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 10px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.2s;
}
.option:hover {
	background-color: rgba(179, 120, 255, 0.1);
}
.selected {
	height: 16px;
}
.check-circle {
	fill: var(--primary-color);
	width: 16px;
	height: 16px;
}
</style>
