<script setup lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Kbd,
    KbdGroup
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Kbd</h2>
    <div class="playground__stack">
      <p>
        按下 <Kbd>⌘</Kbd> <Kbd>K</Kbd> 打开命令菜单。
      </p>

      <div class="flex items-center gap-3">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <span>打开命令菜单</span>
      </div>

      <div class="flex items-center gap-3">
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>P</Kbd>
        </KbdGroup>
        <span>打印</span>
      </div>

      <InputGroup>
        <InputGroupInput aria-label="搜索" placeholder="搜索文档..." />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </section>
</template>
