<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogContentEmits, DialogContentProps } from 'reka-ui'

  import { X } from '@lucide/vue'
  import { DialogContent, useForwardPropsEmits } from 'reka-ui'

  import Button from '../button/Button.vue'
  import DialogClose from './DialogClose.vue'
  import { dialogVariants } from './variants'
  import DialogPortal from './DialogPortal.vue'
  import DialogOverlay from './DialogOverlay.vue'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(defineProps<Props>(), {
    showCloseButton: true
  })

  const emits = defineEmits<DialogContentEmits>()

  interface Props extends DialogContentProps {
    class?: HTMLAttributes['class']
    showCloseButton?: boolean
  }

  const forwarded = useForwardPropsEmits(() => {
    const { showCloseButton: _, ...rekaProps } = props
    return rekaProps
  }, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="dialogVariants().content({ class: props.class as never })"
      data-slot="dialog-content"
    >
      <slot />

      <DialogClose v-if="showCloseButton" as-child>
        <Button
          :class="dialogVariants().closeButton()"
          size="icon-sm"
          variant="ghost"
        >
          <X aria-hidden="true" />
          <span class="sr-only">关闭</span>
        </Button>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
