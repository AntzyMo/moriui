<script setup lang="ts">
  import { computed } from 'vue'
  import { resolveDocumentationExample } from '~/documentation/examples'
  import ExamplePanel from './ExamplePanel.vue'

  const props = defineProps<{ name: string }>()
  const example = computed(() => resolveDocumentationExample(props.name))
</script>

<template>
  <ExamplePanel :code="example.code">
    <template #preview>
      <component :is="example.preview" />
    </template>
  </ExamplePanel>
</template>
