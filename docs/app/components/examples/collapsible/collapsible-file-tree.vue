<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { ChevronRight, File, Folder } from '@lucide/vue'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'moriui'

  const srcOpen = shallowRef(true)
  const componentsOpen = shallowRef(false)
  const utilsOpen = shallowRef(false)
</script>

<template>
  <div class="w-full max-w-sm rounded-md border p-3 text-sm font-mono">
    <div class="flex items-center gap-2 px-2 py-1 text-muted-foreground">
      <Folder class="size-4 text-blue-500" />
      <span class="font-medium text-foreground">project</span>
    </div>
    <div class="ml-4 border-l pl-3">
      <Collapsible v-model:open="srcOpen">
        <CollapsibleTrigger class="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-muted/50">
          <ChevronRight class="size-3 transition-transform" :class="srcOpen && 'rotate-90'" />
          <Folder class="size-4 text-yellow-500" />
          <span>src</span>
        </CollapsibleTrigger>
        <CollapsibleContent class="ml-4 border-l pl-3">
          <Collapsible v-model:open="componentsOpen">
            <CollapsibleTrigger class="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-muted/50">
              <ChevronRight class="size-3 transition-transform" :class="componentsOpen && 'rotate-90'" />
              <Folder class="size-4 text-yellow-500" />
              <span>components</span>
            </CollapsibleTrigger>
            <CollapsibleContent class="ml-4 border-l pl-3">
              <div class="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground">
                <File class="size-4" />
                <span>Button.vue</span>
              </div>
              <div class="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground">
                <File class="size-4" />
                <span>Card.vue</span>
              </div>
              <div class="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground">
                <File class="size-4" />
                <span>Modal.vue</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible v-model:open="utilsOpen">
            <CollapsibleTrigger class="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-muted/50">
              <ChevronRight class="size-3 transition-transform" :class="utilsOpen && 'rotate-90'" />
              <Folder class="size-4 text-yellow-500" />
              <span>utils</span>
            </CollapsibleTrigger>
            <CollapsibleContent class="ml-4 border-l pl-3">
              <div class="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground">
                <File class="size-4" />
                <span>format.ts</span>
              </div>
              <div class="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground">
                <File class="size-4" />
                <span>validate.ts</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
      <div class="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground">
        <File class="size-4" />
        <span>index.html</span>
      </div>
      <div class="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground">
        <File class="size-4" />
        <span>package.json</span>
      </div>
    </div>
  </div>
</template>
