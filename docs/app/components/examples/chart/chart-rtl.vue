<script setup lang="ts">
  import type { ChartConfig } from 'moriui'

  import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
  import {
    ChartContainer,
    ChartCrosshair,
    ChartLegendContent,
    ChartTooltipContent,
    DirectionProvider,
    componentToString
  } from 'moriui'

  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو']

  const chartData = [
    { month: 'يناير', desktop: 186, mobile: 80 },
    { month: 'فبراير', desktop: 305, mobile: 200 },
    { month: 'مارس', desktop: 237, mobile: 120 },
    { month: 'أبريل', desktop: 73, mobile: 190 },
    { month: 'مايو', desktop: 209, mobile: 130 },
    { month: 'يونيو', desktop: 214, mobile: 140 }
  ]

  const chartConfig = {
    desktop: {
      label: 'سطح المكتب',
      color: '#2563eb'
    },
    mobile: {
      label: 'الجوال',
      color: '#60a5fa'
    }
  } satisfies ChartConfig

  const tooltipTemplate = componentToString(chartConfig, ChartTooltipContent, {
    labelFormatter: (_x: number) => chartData[_x]?.month ?? ''
  })
</script>

<template>
  <DirectionProvider direction="rtl">
    <ChartContainer :config="chartConfig" class="min-h-[200px] w-full" dir="rtl">
      <VisXYContainer :data="chartData">
        <VisGroupedBar
          :x="(_d: unknown, i: number) => i"
          :y="[(d: { desktop: number }) => d.desktop, (d: { mobile: number }) => d.mobile]"
          :color="(_d: unknown, i: number) => `var(--color-${i === 0 ? 'desktop' : 'mobile'})`"
          :rounded-corners="4"
        />
        <VisAxis
          type="x"
          :tick-format="(tick: number) => months[tick] ?? ''"
          :grid-line="false"
          :tick-line="false"
        />
        <VisAxis type="y" :grid-line="false" :tick-line="false" />
        <ChartCrosshair :template="tooltipTemplate" />
      </VisXYContainer>
      <ChartLegendContent class="mt-4" />
    </ChartContainer>
  </DirectionProvider>
</template>
