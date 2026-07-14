<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SheetSide } from './variants'
  import type { DialogContentEmits, DialogContentProps } from 'reka-ui'

  import { X } from '@lucide/vue'
  import { DialogContent, useForwardPropsEmits } from 'reka-ui'

  import Button from '../button/Button.vue'
  import SheetClose from './SheetClose.vue'
  import { sheetVariants } from './variants'
  import SheetPortal from './SheetPortal.vue'
  import SheetOverlay from './SheetOverlay.vue'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(defineProps<Props>(), {
    side: 'right',
    showCloseButton: true
  })

  const emits = defineEmits<DialogContentEmits>()

  interface Props extends DialogContentProps {
    class?: HTMLAttributes['class']
    side?: SheetSide
    showCloseButton?: boolean
  }

  const forwarded = useForwardPropsEmits(() => {
    const { side: _, showCloseButton: __, ...rekaProps } = props
    return rekaProps
  }, emits)
  const slots = sheetVariants()
</script>

<template>
  <SheetPortal>
    <SheetOverlay />
    <DialogContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      :data-side="side"
      data-slot="sheet-content"
    >
      <slot />

      <SheetClose v-if="showCloseButton" as-child>
        <Button
          :class="slots.closeButton()"
          size="icon-sm"
          variant="ghost"
        >
          <X aria-hidden="true" />
        </Button>
      </SheetClose>
    </DialogContent>
  </SheetPortal>
</template>
