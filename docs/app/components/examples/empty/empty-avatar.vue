<script setup lang="ts">
  import { User } from '@lucide/vue'
  import {
    Avatar,
    AvatarFallback,
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from 'moriui'
</script>

<template>
  <Empty class="w-full max-w-md">
    <EmptyHeader><EmptyMedia><Avatar><AvatarFallback><User class="size-4" /></AvatarFallback></Avatar></EmptyMedia><EmptyTitle>还没有成员</EmptyTitle><EmptyDescription>邀请同事加入这个工作区。</EmptyDescription></EmptyHeader><EmptyContent>
      <Button size="sm">
        邀请成员
      </Button>
    </EmptyContent>
  </Empty>
</template>
