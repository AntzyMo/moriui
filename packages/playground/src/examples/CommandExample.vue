<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Button,
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
  } from 'moriui'

  const commandDialogOpen = shallowRef(false)
  const lastCommand = shallowRef('尚未执行命令')

  function runCommand(command: string) {
    lastCommand.value = `已执行：${command}`
    commandDialogOpen.value = false
  }
</script>

<template>
  <section class="playground__section">
    <h2>Command</h2>
    <div class="playground__stack max-w-md">
      <Command>
        <CommandInput aria-label="搜索命令" />
        <CommandList>
          <CommandEmpty />
          <CommandGroup heading="导航">
            <CommandItem value="首页" @select="runCommand('前往首页')">
              前往首页
              <CommandShortcut>G H</CommandShortcut>
            </CommandItem>
            <CommandItem value="组件" @select="runCommand('查看组件')">
              查看组件
              <CommandShortcut>G C</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="操作">
            <CommandItem value="新建项目" @select="runCommand('新建项目')">
              新建项目
              <CommandShortcut>⌘ N</CommandShortcut>
            </CommandItem>
            <CommandItem disabled value="发布">
              发布项目
              <CommandShortcut>⌘ P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <div class="playground__row">
        <Button variant="outline" @click="commandDialogOpen = true">
          打开命令面板
        </Button>
        <span class="text-sm text-muted-foreground">{{ lastCommand }}</span>
      </div>
    </div>

    <CommandDialog v-model:open="commandDialogOpen">
      <Command>
        <CommandInput aria-label="搜索弹窗命令" />
        <CommandList>
          <CommandEmpty />
          <CommandGroup heading="快速操作">
            <CommandItem value="创建文件" @select="runCommand('创建文件')">
              创建文件
              <CommandShortcut>⌘ N</CommandShortcut>
            </CommandItem>
            <CommandItem value="下载构建产物" @select="runCommand('下载构建产物')">
              下载构建产物
              <CommandShortcut>⌘ D</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  </section>
</template>
