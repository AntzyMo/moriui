<script setup lang="ts">
  import { tableVariants } from './variants'
  import { nextTick, useTemplateRef, watchEffect } from 'vue'

  interface Props {
    checked: boolean
    indeterminate?: boolean
    label: string
  }

  interface Emits {
    change: [checked: boolean]
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const input = useTemplateRef<HTMLInputElement>('input')
  const slots = tableVariants()

  watchEffect(async () => {
    await nextTick()
    if (input.value) {
      input.value.indeterminate = props.indeterminate ?? false
    }
  })

  function handleChange(event: Event) {
    emit('change', (event.target as HTMLInputElement).checked)
  }
</script>

<template>
  <input
    ref="input"
    :aria-label="props.label"
    :checked="props.checked"
    :class="slots.selectionControl()"
    :data-state="props.indeterminate ? 'indeterminate' : props.checked ? 'checked' : 'unchecked'"
    data-slot="table-selection-control"
    role="checkbox"
    type="checkbox"
    @change="handleChange"
  >
</template>
