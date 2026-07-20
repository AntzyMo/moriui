<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'moriui'
</script>
<template>
  <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">首页</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>文档</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
</template>
