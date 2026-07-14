<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { computed } from 'vue'
  import { fieldVariants } from './variants'

  export type FieldErrorEntry = string | { message?: string } | null | undefined

  interface Props {
    errors?: FieldErrorEntry[]
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = fieldVariants()
  const messages = computed(() => {
    const seen = new Set<string>()

    return (props.errors ?? []).flatMap(error => {
      const message = typeof error === 'string' ? error : error?.message
      const normalized = message?.trim()

      if (!normalized || seen.has(normalized)) {
        return []
      }

      seen.add(normalized)
      return [normalized]
    })
  })
</script>

<template>
  <div
    v-if="$slots.default || messages.length"
    :class="slots.error({ class: props.class as never })"
    data-slot="field-error"
    role="alert"
  >
    <slot v-if="$slots.default" />
    <template v-else-if="messages.length === 1">
      {{ messages[0] }}
    </template>
    <ul v-else :class="slots.errorList()" data-slot="field-error-list">
      <li
        v-for="message in messages"
        :key="message"
        :class="slots.errorItem()"
        data-slot="field-error-item"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>
