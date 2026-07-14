<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { NavigationMenuContentEmits, NavigationMenuContentProps } from 'reka-ui'

  import { inject, shallowRef } from 'vue'
  import { NavigationMenuContent, useForwardPropsEmits } from 'reka-ui'

  import { navigationMenuVariants } from './variants'
  import { navigationMenuAutoViewportKey } from './context'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<Props>()

  const emit = defineEmits<NavigationMenuContentEmits>()

  interface Props extends NavigationMenuContentProps {
    class?: HTMLAttributes['class']
  }

  const forwarded = useForwardPropsEmits(props, emit)
  const slots = navigationMenuVariants()
  const autoViewport = inject(navigationMenuAutoViewportKey, shallowRef(false))
</script>

<template>
  <NavigationMenuContent
    v-bind="{ ...$attrs, ...forwarded }"
    :class="slots.content({ class: props.class as never })"
    :data-viewport="autoViewport ? 'auto' : 'manual'"
    data-slot="navigation-menu-content"
  >
    <slot />
  </NavigationMenuContent>
</template>
