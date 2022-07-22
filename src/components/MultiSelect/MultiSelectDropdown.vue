<template>
	<div
		class="checkbox-select"
		@click="switchDisplay"
		@keyup.enter="switchDisplay"
		@focusout="handleFocusOut"
		tabindex="0"
	>
		<div class="select-placeholder">
			<slot name="select">
				<div class="select">
					<span class="placeholder-text">Formats</span>
					<span
						class="expand-icon material-symbols-outlined"
						:class="{ rotated: expanded }"
					>
						expand_more
					</span>
				</div>
			</slot>
		</div>
		<Transition>
			<div class="options" v-if="expanded">
				<slot name="options" :value="modelValue">
					<SelectOption
						v-for="[id, value] in Object.entries(options!)"
						:key="id"
						:id="id"
						:name="value"
						v-model="model"
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
	options?: { [id: string]: string }
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', checked: Set<string>): void
}>()

const model = computed<Set<string>>({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	},
})

const expanded = ref<boolean>(false)

const app = getCurrentInstance()

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
	expanded.value = !expanded.value
}

function handleFocusOut(event: FocusEvent) {
	// collapse if the dropdown menu loses focus
	const relatedTarget = event.relatedTarget as Element
	if (relatedTarget == event.currentTarget) {
		return
	}
	if (relatedTarget?.className == 'option') {
		return
	}
	expanded.value = false
}
</script>

<style scoped>
.checkbox-select {
	position: relative;
}
.select-placeholder {
	height: 100%;
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
	transition: transform 0.5s;
}
.rotated {
	transform: rotateX(180deg);
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
