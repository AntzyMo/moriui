<script setup lang="ts">
  import {
    Bubble,
    BubbleContent,
    Message,
    MessageContent,
    MessageFooter,
    MessageHeader,
    MessageScrollerItem
  } from 'moriui'

  interface Props {
    align: 'start' | 'end'
    author?: string
    content: string
    footer?: string
    id: string
    scrollAnchor?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    author: undefined,
    footer: undefined,
    scrollAnchor: false
  })
</script>

<template>
  <MessageScrollerItem :message-id="id" :scroll-anchor="scrollAnchor">
    <Message :align="align">
      <MessageContent>
        <MessageHeader v-if="author">
          {{ author }}
        </MessageHeader>
        <Bubble :variant="align === 'end' ? 'default' : 'muted'">
          <BubbleContent class="whitespace-pre-wrap">
            {{ content }}
          </BubbleContent>
        </Bubble>
        <MessageFooter v-if="footer">
          {{ footer }}
        </MessageFooter>
      </MessageContent>
    </Message>
  </MessageScrollerItem>
</template>
