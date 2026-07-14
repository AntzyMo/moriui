<script setup lang="ts">
  import { Check, GitBranch, RotateCcw, Search } from '@lucide/vue'
  import { Marker, MarkerContent, MarkerIcon, Spinner } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Marker</h2>
    <div class="playground__marker-examples">
      <Marker>
        <MarkerIcon>
          <GitBranch />
        </MarkerIcon>
        <MarkerContent>已切换到新分支</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>正在整理对话</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>今天</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <Search />
        </MarkerIcon>
        <MarkerContent>已探索 4 个文件</MarkerContent>
      </Marker>
      <Marker as-child>
        <a href="#marker-example">
          <MarkerIcon>
            <Check />
          </MarkerIcon>
          <MarkerContent>查看已完成的检查</MarkerContent>
        </a>
      </Marker>
      <Marker as-child>
        <button type="button">
          <MarkerIcon>
            <RotateCcw />
          </MarkerIcon>
          <MarkerContent>撤销这项变更</MarkerContent>
        </button>
      </Marker>
    </div>
  </section>
</template>
