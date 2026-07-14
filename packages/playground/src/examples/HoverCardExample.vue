<script setup lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    HoverCard,
    HoverCardContent,
    HoverCardPortal,
    HoverCardTrigger
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Hover Card</h2>
    <p class="text-sm text-muted-foreground">
      悬停查看
      <HoverCard>
        <HoverCardTrigger as-child>
          <a class="font-medium text-foreground underline underline-offset-4" href="https://github.com/antzymo">
            @antzymo
          </a>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent>
            <div class="flex gap-3">
              <Avatar>
                <AvatarImage alt="antzymo 的头像" src="https://github.com/antzymo.png" />
                <AvatarFallback>AZ</AvatarFallback>
              </Avatar>
              <div class="space-y-1">
                <p class="text-sm font-medium">
                  Antzymo
                </p>
                <p class="text-xs text-muted-foreground">
                  MoriUI：基于 Reka UI 与 Nova 视觉语言的 Vue 组件库。
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
      的个人资料。
    </p>
  </section>
</template>
