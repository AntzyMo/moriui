<script setup lang="ts">
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from 'moriui'
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">更多</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuItem>新建文件</DropdownMenuItem>
      <DropdownMenuItem>打开文件</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>导入</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>从文件导入</DropdownMenuItem>
          <DropdownMenuItem>从剪贴板导入</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>从云端导入</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Google Drive</DropdownMenuItem>
              <DropdownMenuItem>Dropbox</DropdownMenuItem>
              <DropdownMenuItem>iCloud</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>导出</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>导出为 PDF</DropdownMenuItem>
          <DropdownMenuItem>导出为 PNG</DropdownMenuItem>
          <DropdownMenuItem>导出为 SVG</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
