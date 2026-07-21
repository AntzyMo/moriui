<script setup lang="ts">
  import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport
  } from 'moriui'
</script>

<template>
  <MessageScrollerProvider class="w-full">
    <MessageScroller class="h-48">
      <MessageScrollerViewport>
        <MessageScrollerContent>
          <MessageScrollerItem message-id="1">
            <p class="p-3">
              消息列表
            </p>
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport><MessageScrollerButton />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
