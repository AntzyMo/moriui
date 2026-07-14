<script setup lang="ts">
  import { watch } from 'vue'
  import { injectContextMenuRootContext } from 'reka-ui'

  interface Props {
    open?: boolean
  }

  const props = defineProps<Props>()
  const rootContext = injectContextMenuRootContext()

  watch(
    () => props.open,
    open => {
      if (open !== undefined && rootContext.open.value !== open)
        rootContext.onOpenChange(open)
    },
    { immediate: true }
  )
</script>

<template>
  <slot />
</template>
