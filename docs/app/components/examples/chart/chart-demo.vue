<script setup lang="ts">
  import type { ChartConfig } from 'moriui'

  import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartCrosshair,
    ChartTooltipContent,
    componentToString

  } from 'moriui'

  const months = ['一月', '二月', '三月', '四月', '五月', '六月']

  const chartData = [
    { month: '一月', desktop: 186, mobile: 80 },
    { month: '二月', desktop: 305, mobile: 200 },
    { month: '三月', desktop: 237, mobile: 120 },
    { month: '四月', desktop: 73, mobile: 190 },
    { month: '五月', desktop: 209, mobile: 130 },
    { month: '六月', desktop: 214, mobile: 140 }
  ]

  const chartConfig = {
    desktop: {
      label: '桌面端',
      color: '#2563eb'
    },
    mobile: {
      label: '移动端',
      color: '#60a5fa'
    }
  } satisfies ChartConfig

  const tooltipTemplate = componentToString(chartConfig, ChartTooltipContent, {
    labelFormatter: (_x: number) => chartData[_x]?.month ?? ''
  })
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>柱状图 - 分组</CardTitle>
      <CardDescription>近六个月桌面端与移动端访问量对比</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig" class="aspect-auto h-[250px] w-full">
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
      </ChartContainer>
    </CardContent>
  </Card>
</template>
