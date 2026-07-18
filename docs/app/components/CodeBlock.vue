<script setup lang="ts">
  import { ref } from 'vue'
  import { Copy } from '@lucide/vue'
  import { useClipboard } from '@vueuse/core'
  import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'moriui'

  const props = defineProps<{
    code: string
  }>()

  const isExpanded = ref(false)
  const { copy, copied } = useClipboard({ legacy: true })
</script>

<template>
  <TooltipProvider>
    <div class="relative overflow-hidden rounded-lg bg-muted/60">
      <div class="absolute right-2 top-2 z-10">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              size="icon-xs"
              type="button"
              variant="ghost"
              @click="copy(props.code)"
            >
              <Copy aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ copied ? '已复制' : '复制代码' }}</TooltipContent>
        </Tooltip>
      </div>
      <pre
        :class="isExpanded ? 'overflow-x-auto p-4 pb-12 text-xs leading-6' : 'max-h-80 overflow-x-auto overflow-y-hidden p-4 pb-12 text-xs leading-6'"
      ><code>{{ code }}</code></pre>
      <div
        v-if="!isExpanded"
        class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-muted to-transparent"
      />
      <Button
        class="absolute bottom-2 left-1/2 -translate-x-1/2"
        size="sm"
        type="button"
        variant="outline"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? '收起代码' : '展开代码' }}
      </Button>
      <span class="sr-only" aria-live="polite">{{ copied ? '代码已复制' : '' }}</span>
    </div>
  </TooltipProvider>
</template>
