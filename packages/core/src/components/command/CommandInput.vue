<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxInputProps } from 'reka-ui'

  import { Search } from '@lucide/vue'
  import { ComboboxInput, useForwardProps } from 'reka-ui'

  import { commandVariants } from './variants'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(defineProps<Props>(), {
    placeholder: '输入命令或搜索…'
  })

  interface Props extends Omit<ComboboxInputProps, 'modelValue'> {
    class?: HTMLAttributes['class']
    placeholder?: string
  }

  const modelValue = defineModel<string>()
  const forwarded = useForwardProps(props)
  const slots = commandVariants()
</script>

<template>
  <div
    :class="slots.inputWrapper()"
    data-slot="command-input-wrapper"
  >
    <div
      :class="slots.inputGroup()"
      data-slot="command-input-group"
    >
      <span
        :class="slots.inputIcon()"
        aria-hidden="true"
        data-slot="command-input-icon"
      >
        <Search />
      </span>
      <ComboboxInput
        v-bind="{ ...$attrs, ...forwarded }"
        v-model="modelValue"
        :class="slots.input({ class: props.class as never })"
        data-slot="command-input"
      >
        <slot />
      </ComboboxInput>
    </div>
  </div>
</template>
