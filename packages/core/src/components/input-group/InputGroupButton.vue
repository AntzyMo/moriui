<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ButtonVariants } from '../button/variants'
  import type { InputGroupButtonVariants } from './variants'

  import { computed } from 'vue'
  import Button from '../button/Button.vue'
  import { inputGroupVariants } from './variants'

  interface Props {
    variant?: ButtonVariants['variant']
    size?: InputGroupButtonVariants['size']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'ghost',
    size: 'xs'
  })
  const slots = computed(() => inputGroupVariants({ size: props.size }))
</script>

<template>
  <Button
    :class="slots.button({ class: props.class as never })"
    :data-size="size"
    data-slot="input-group-button"
    type="button"
    :variant="variant"
  >
    <slot />
  </Button>
</template>
