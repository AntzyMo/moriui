<script setup lang="ts">
  import { Button, Popover, PopoverContent, PopoverTrigger } from 'moriui'
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" size="sm">
          Start
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" class="w-36">
        对齐到 start
      </PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" size="sm">
          Center
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" class="w-36">
        对齐到 center
      </PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" size="sm">
          End
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" class="w-36">
        对齐到 end
      </PopoverContent>
    </Popover>
  </div>
</template>
