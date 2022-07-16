<template>
	<div class="checkbox-select">
		<div class="select-placeholder" @click="switchDisplay">
			<slot name="select">
				{{ modelValue }}
			</slot>
		</div>
		<Transition>
			<div class="options" v-if="unfolded">
				<slot name="options" :value="modelValue">
					<SelectOption
						v-for="option in options"
						:key="option"
						:id="option"
						v-model="value"
						class="option"
					>
					</SelectOption>
				</slot>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, computed } from 'vue'
import SelectOption from './MultiSelectOption.vue'

const props = defineProps<{
	modelValue: Set<string>
	options?: string[]
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', checked: Set<string>): void
}>()

const value = computed<Set<string>>({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	},
})

const unfolded = ref<boolean>(false)

const app = getCurrentInstance()
console.log('Slots:', app?.slots.options)
console.log('Props:', props.options)

const slotProvided = app?.slots.options != null
const vModelProvided = props.modelValue != null
const optionsProvided = props.options != null

if (
	!(!slotProvided && vModelProvided && optionsProvided) &&
	!(slotProvided && !vModelProvided && !optionsProvided)
) {
	throw new TypeError(
		'Either provide options slot or v-model and options prop.'
	)
}

function switchDisplay() {
	unfolded.value = !unfolded.value
}
</script>

<style scoped>
.checkbox-select {
	position: relative;
}
.select-placeholder {
	height: 100%;
}

.options {
	position: absolute;
	z-index: 1;
	top: calc(100% + 6px);
	background-color: var(--secondary-bg-color);
	border-radius: 12px;
	width: inherit;
	padding: 8px;
}
.option {
	padding: 8px 10px;
}
.v-enter-active,
.v-leave-active {
	transition: transform, opacity 0.3s, 0.3s;
}
.v-enter-from,
.v-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
</style>
