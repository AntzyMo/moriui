<script setup lang="ts">
  import { computed } from 'vue'
  import { chartThemes, useChartContext } from './context'

  interface Props {
    id: string
  }

  const props = defineProps<Props>()
  const { config } = useChartContext()

  const styleText = computed(() => {
    const colorConfig = Object.entries(config.value).filter(([, item]) => item.color || item.theme)

    if (!colorConfig.length) {
      return ''
    }

    return chartThemes.map(theme => {
      const declarations = colorConfig.map(([key, item]) => {
        const color = item.theme?.[theme] ?? item.color
        return color ? `  --color-${key}: ${color};` : ''
      }).filter(Boolean).join('\n')

      const selector = theme === 'light'
        ? `[data-chart='${props.id}']`
        : `[data-theme='${theme}'] [data-chart='${props.id}']`

      return `${selector} {\n${declarations}\n}`
    }).join('\n')
  })
</script>

<template>
  <component is="style" v-if="styleText">
    {{ styleText }}
  </component>
</template>
