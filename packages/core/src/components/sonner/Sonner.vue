<script setup lang="ts">
  import type { ToasterProps } from 'vue-sonner'
  import type { CSSProperties, HTMLAttributes, VNode } from 'vue'

  import { Toaster } from 'vue-sonner'
  import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
  import {
    CircleCheck,
    CircleX,
    Info,
    LoaderCircle,
    TriangleAlert,
    X
  } from '@lucide/vue'

  import { sonnerVariants } from './variants'

  interface Props extends Omit<ToasterProps, 'class'> {
    class?: HTMLAttributes['class']
  }

  interface Slots {
    'close-icon'?: () => VNode[]
    'error-icon'?: () => VNode[]
    'info-icon'?: () => VNode[]
    'loading-icon'?: () => VNode[]
    'success-icon'?: () => VNode[]
    'warning-icon'?: () => VNode[]
  }

  type SonnerTheme = NonNullable<ToasterProps['theme']>

  const props = defineProps<Props>()

  defineSlots<Slots>()

  const slots = sonnerVariants()
  const documentTheme = shallowRef<'dark' | 'light'>('light')

  const sonnerStyle = computed<CSSProperties>(() => ({
    '--border-radius': 'var(--radius)',
    '--gray1': 'var(--background)',
    '--gray2': 'var(--muted)',
    '--gray3': 'var(--border)',
    '--gray4': 'var(--border)',
    '--gray5': 'var(--border)',
    '--gray12': 'var(--popover-foreground)',
    '--normal-bg': 'var(--popover)',
    '--normal-border': 'var(--border)',
    '--normal-text': 'var(--popover-foreground)',
    ...props.style
  }))

  const resolvedTheme = computed<SonnerTheme>(() => props.theme ?? documentTheme.value)
  const toastOptions = computed<ToasterProps['toastOptions']>(() => ({
    ...props.toastOptions,
    classes: {
      ...props.toastOptions?.classes,
      toast: slots.toast({ class: props.toastOptions?.classes?.toast as never })
    }
  }))

  let observer: MutationObserver | undefined

  function readDocumentTheme() {
    documentTheme.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  }

  onMounted(() => {
    readDocumentTheme()
    observer = new MutationObserver(readDocumentTheme)
    observer.observe(document.documentElement, {
      attributeFilter: ['data-theme'],
      attributes: true
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
</script>

<template>
  <Toaster
    v-bind="props"
    :class="slots.base({ class: props.class as never })"
    :style="sonnerStyle"
    :theme="resolvedTheme"
    :toast-options="toastOptions"
    data-slot="sonner"
  >
    <template #success-icon>
      <slot name="success-icon">
        <CircleCheck aria-hidden="true" class="size-4" />
      </slot>
    </template>
    <template #info-icon>
      <slot name="info-icon">
        <Info aria-hidden="true" class="size-4" />
      </slot>
    </template>
    <template #warning-icon>
      <slot name="warning-icon">
        <TriangleAlert aria-hidden="true" class="size-4" />
      </slot>
    </template>
    <template #error-icon>
      <slot name="error-icon">
        <CircleX aria-hidden="true" class="size-4" />
      </slot>
    </template>
    <template #loading-icon>
      <slot name="loading-icon">
        <LoaderCircle aria-hidden="true" class="size-4 animate-[spinner-spin_700ms_linear_infinite] motion-reduce:animate-none" />
      </slot>
    </template>
    <template #close-icon>
      <slot name="close-icon">
        <X aria-hidden="true" class="size-4" />
      </slot>
    </template>
  </Toaster>
</template>
