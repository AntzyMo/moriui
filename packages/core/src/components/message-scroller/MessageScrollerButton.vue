<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ButtonVariants } from '../button/variants'
  import type { MessageScrollerButtonDirection } from './types'

  import { computed } from 'vue'
  import { ChevronDown } from '@lucide/vue'

  import Button from '../button/Button.vue'
  import { messageScrollerVariants } from './variants'
  import { useMessageScroller, useMessageScrollerScrollable } from './useMessageScroller'

  interface Props {
    behavior?: ScrollBehavior
    class?: HTMLAttributes['class']
    direction?: MessageScrollerButtonDirection
    label?: string
    size?: ButtonVariants['size']
    variant?: ButtonVariants['variant']
  }

  const props = withDefaults(defineProps<Props>(), {
    behavior: 'smooth',
    direction: 'end',
    size: 'icon-sm',
    variant: 'secondary'
  })
  const { scrollToEnd, scrollToStart } = useMessageScroller()
  const scrollable = useMessageScrollerScrollable()
  const active = computed(() => props.direction === 'start' ? scrollable.start.value : scrollable.end.value)
  const slots = computed(() => messageScrollerVariants({ direction: props.direction }))
  const label = computed(() => props.label ?? '')

  function onClick(event: MouseEvent) {
    if (!active.value)
      return
    if (props.direction === 'start')
      scrollToStart({ behavior: props.behavior })
    else scrollToEnd({ behavior: props.behavior })
    ;(event.currentTarget as HTMLElement).blur()
  }
</script>

<template>
  <Button
    v-bind="$attrs"
    :aria-hidden="active ? undefined : 'true'"
    :aria-label="label || undefined"
    :class="slots.button({ class: props.class as never })"
    :data-active="active ? 'true' : 'false'"
    :data-direction="direction"
    :data-size="size"
    :data-variant="variant"
    :disabled="!active"
    :size="size"
    :tabindex="active ? undefined : -1"
    :variant="variant"
    data-slot="message-scroller-button"
    type="button"
    @click="onClick"
  >
    <slot :active="active" :direction="direction">
      <ChevronDown aria-hidden="true" />
      <span v-if="label" class="sr-only">{{ label }}</span>
    </slot>
  </Button>
</template>
