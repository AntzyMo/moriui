<script setup lang="ts">
  import { ref } from 'vue'
  import { Check } from '@lucide/vue'
  import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuItemIndicator,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger
  } from 'moriui'

  const bookmark = ref(true)
  const theme = ref<string>('system')
</script>

<template>
  <div class="flex items-center justify-center">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="flex h-48 w-full max-w-96 items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
          在此区域右键点击
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent class="w-56">
        <ContextMenuGroup>
          <ContextMenuLabel>操作</ContextMenuLabel>
          <ContextMenuItem>
            复制
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            粘贴
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            删除
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem v-model="bookmark">
          <ContextMenuItemIndicator>
            <Check class="size-3" />
          </ContextMenuItemIndicator>
          添加书签
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>主题</ContextMenuLabel>
          <ContextMenuRadioGroup v-model="theme">
            <ContextMenuRadioItem value="light">
              <ContextMenuItemIndicator>
                <Check class="size-3" />
              </ContextMenuItemIndicator>
              浅色
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">
              <ContextMenuItemIndicator>
                <Check class="size-3" />
              </ContextMenuItemIndicator>
              深色
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">
              <ContextMenuItemIndicator>
                <Check class="size-3" />
              </ContextMenuItemIndicator>
              跟随系统
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>更多工具</ContextMenuSubTrigger>
          <ContextMenuSubContent class="w-48">
            <ContextMenuItem>
              开发者工具
              <ContextMenuShortcut>⌘⇧I</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              控制台
              <ContextMenuShortcut>⌘⇧J</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  </div>
</template>
