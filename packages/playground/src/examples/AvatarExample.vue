<script setup lang="ts">
  import { Check } from '@lucide/vue'
  import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
    MessageAvatar
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Avatar</h2>
    <div class="playground__avatar-examples">
      <Avatar size="sm">
        <AvatarImage alt="MoriUI 小号头像" src="https://github.com/shadcn.png" />
        <AvatarFallback>MU</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MU</AvatarFallback>
        <AvatarBadge aria-label="在线" />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage alt="MoriUI 大号头像" src="https://github.com/shadcn.png" />
        <AvatarFallback>MU</AvatarFallback>
        <AvatarBadge>
          <Check aria-hidden="true" />
        </AvatarBadge>
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarImage alt="成员一" src="https://github.com/shadcn.png" />
          <AvatarFallback>一</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>二</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
      <MessageAvatar class="size-8 text-sm">
        客
      </MessageAvatar>
    </div>
  </section>
</template>
