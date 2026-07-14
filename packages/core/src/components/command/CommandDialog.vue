<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogRootProps } from 'reka-ui'

  import { commandVariants } from './variants'
  import {
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    useForwardProps
  } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(defineProps<Props>(), {
    description: '搜索并执行命令。',
    title: '命令面板'
  })

  interface Props extends Omit<DialogRootProps, 'open'> {
    class?: HTMLAttributes['class']
    description?: string
    title?: string
  }

  const open = defineModel<boolean | undefined>('open', { default: undefined })
  const forwarded = useForwardProps(props)
  const slots = commandVariants()
</script>

<template>
  <DialogRoot
    v-bind="forwarded"
    v-model:open="open"
    data-slot="command-dialog"
  >
    <DialogPortal data-slot="command-dialog-portal">
      <DialogOverlay
        :class="slots.dialogOverlay()"
        data-slot="command-dialog-overlay"
      />
      <DialogContent
        v-bind="$attrs"
        :class="slots.dialogContent({ class: props.class as never })"
        data-slot="command-dialog-content"
        @keydown.escape="open = false"
      >
        <DialogTitle
          :class="slots.dialogTitle()"
          data-slot="command-dialog-title"
        >
          {{ title }}
        </DialogTitle>
        <DialogDescription
          :class="slots.dialogDescription()"
          data-slot="command-dialog-description"
        >
          {{ description }}
        </DialogDescription>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
