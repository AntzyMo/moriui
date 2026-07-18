<script setup lang="ts">
  import CodeBlock from './CodeBlock.vue'

  defineProps<{
    title: string
    description: string
    code: string
  }>()
</script>

<template>
  <section class="grid gap-4">
    <div class="grid gap-1">
      <h3 class="font-medium">
        {{ title }}
      </h3>
      <p class="text-sm leading-6 text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <div class="grid min-h-44 place-items-center rounded-xl bg-muted/35 p-6">
      <slot name="preview" />
    </div>
    <CodeBlock :code="code" />
  </section>
</template>
