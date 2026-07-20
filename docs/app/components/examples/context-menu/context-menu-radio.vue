<script setup lang="ts">
import { ref } from 'vue'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItemIndicator,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from 'moriui'
import { Check } from '@lucide/vue'

const alignment = ref<string>('left')
const lineHeight = ref<string>('1.5')
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        在文本上右键点击
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuRadioGroup v-model="alignment">
        <ContextMenuRadioItem value="left">
          <ContextMenuItemIndicator>
            <Check class="size-3" />
          </ContextMenuItemIndicator>
          左对齐
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="center">
          <ContextMenuItemIndicator>
            <Check class="size-3" />
          </ContextMenuItemIndicator>
          居中对齐
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="right">
          <ContextMenuItemIndicator>
            <Check class="size-3" />
          </ContextMenuItemIndicator>
          右对齐
        </ContextMenuRadioItem>
      </ContextMenuRadioGroup>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup v-model="lineHeight">
        <ContextMenuRadioItem value="1.0">
          <ContextMenuItemIndicator>
            <Check class="size-3" />
          </ContextMenuItemIndicator>
          行距 1.0
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="1.5">
          <ContextMenuItemIndicator>
            <Check class="size-3" />
          </ContextMenuItemIndicator>
          行距 1.5
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="2.0">
          <ContextMenuItemIndicator>
            <Check class="size-3" />
          </ContextMenuItemIndicator>
          行距 2.0
        </ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  </ContextMenu>
</template>
