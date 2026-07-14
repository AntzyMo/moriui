<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DrawerContentEmits, DrawerContentProps } from 'reka-ui'

  import { drawerVariants } from './variants'
  import DrawerHandle from './DrawerHandle.vue'
  import DrawerPortal from './DrawerPortal.vue'
  import DrawerOverlay from './DrawerOverlay.vue'
  import { DrawerContent, injectDrawerRootContext, useForwardPropsEmits } from 'reka-ui'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(defineProps<Props>(), { showHandle: false })

  const emits = defineEmits<DrawerContentEmits>()

  interface Props extends DrawerContentProps {
    class?: HTMLAttributes['class']
    showHandle?: boolean
  }

  const rootContext = injectDrawerRootContext()
  const forwarded = useForwardPropsEmits(() => {
    const { showHandle: _, ...rekaProps } = props
    return rekaProps
  }, emits)
  const slots = drawerVariants()
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="{ ...$attrs, ...forwarded }"
      :class="slots.content({ class: props.class as never })"
      :data-snap-points="rootContext.snapPoints.value?.length ? '' : undefined"
      data-slot="drawer-content"
    >
      <DrawerHandle v-if="showHandle" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
