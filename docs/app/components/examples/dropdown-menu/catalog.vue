<script setup lang="ts">
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'moriui'
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child><Button size="sm" variant="outline">菜单</Button></DropdownMenuTrigger>
    <DropdownMenuContent><DropdownMenuItem>操作</DropdownMenuItem></DropdownMenuContent>
  </DropdownMenu>
</template>
