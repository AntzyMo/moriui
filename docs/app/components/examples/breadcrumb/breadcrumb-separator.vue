<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'moriui'
</script>
<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">首页</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight class="size-3.5" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">文档</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronRight class="size-3.5" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>组件</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
