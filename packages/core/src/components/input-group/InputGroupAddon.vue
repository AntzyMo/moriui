<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { InputGroupAddonVariants } from './variants'

  import { computed } from 'vue'
  import { inputGroupVariants } from './variants'

  interface Props {
    align?: InputGroupAddonVariants['align']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    align: 'inline-start'
  })
  const slots = computed(() => inputGroupVariants({ align: props.align }))

  function handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null

    if (target?.closest('button, a, input, select, textarea, [role="button"]'))
      return

    const addon = event.currentTarget as HTMLElement
    addon.parentElement?.querySelector<HTMLElement>('[data-slot="input-group-control"]')?.focus()
  }
</script>

<template>
  <div
    :class="slots.addon({ class: props.class as never })"
    :data-align="align"
    data-slot="input-group-addon"
    role="group"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
