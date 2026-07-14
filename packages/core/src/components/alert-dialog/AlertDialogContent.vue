<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AlertDialogContentEmits, AlertDialogContentProps } from 'reka-ui'

  import { alertDialogVariants } from './variants'
  import AlertDialogPortal from './AlertDialogPortal.vue'
  import AlertDialogOverlay from './AlertDialogOverlay.vue'
  import { AlertDialogContent, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(defineProps<Props>(), { size: 'default' })

  const emits = defineEmits<AlertDialogContentEmits>()

  interface Props extends AlertDialogContentProps {
    class?: HTMLAttributes['class']
    size?: 'default' | 'sm'
  }

  const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="alertDialogVariants({ contentSize: size }).content({ class: props.class as never })"
      :data-size="size"
      data-slot="alert-dialog-content"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
