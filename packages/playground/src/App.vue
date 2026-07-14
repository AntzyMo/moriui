<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Button, Sonner } from 'moriui'

  import KbdExample from './examples/KbdExample.vue'
  import CardExample from './examples/CardExample.vue'
  import ItemExample from './examples/ItemExample.vue'
  import TabsExample from './examples/TabsExample.vue'
  import AlertExample from './examples/AlertExample.vue'
  import BadgeExample from './examples/BadgeExample.vue'
  import FieldExample from './examples/FieldExample.vue'
  import InputExample from './examples/InputExample.vue'
  import LabelExample from './examples/LabelExample.vue'
  import EmptyExample from './examples/EmptyExample.vue'
  import SheetExample from './examples/SheetExample.vue'
  import TableExample from './examples/TableExample.vue'
  import SonnerExample from './examples/SonnerExample.vue'
  import AvatarExample from './examples/AvatarExample.vue'
  import BubbleExample from './examples/BubbleExample.vue'
  import ButtonExample from './examples/ButtonExample.vue'
  import DialogExample from './examples/DialogExample.vue'
  import DrawerExample from './examples/DrawerExample.vue'
  import MarkerExample from './examples/MarkerExample.vue'
  import SelectExample from './examples/SelectExample.vue'
  import SliderExample from './examples/SliderExample.vue'
  import SwitchExample from './examples/SwitchExample.vue'
  import ToggleExample from './examples/ToggleExample.vue'
  import MessageExample from './examples/MessageExample.vue'
  import MenubarExample from './examples/MenubarExample.vue'
  import CommandExample from './examples/CommandExample.vue'
  import TooltipExample from './examples/TooltipExample.vue'
  import TextareaExample from './examples/TextareaExample.vue'
  import SkeletonExample from './examples/SkeletonExample.vue'
  import ProgressExample from './examples/ProgressExample.vue'
  import InputOTPExample from './examples/InputOTPExample.vue'
  import CalendarExample from './examples/CalendarExample.vue'
  import CarouselExample from './examples/CarouselExample.vue'
  import CheckboxExample from './examples/CheckboxExample.vue'
  import ComboboxExample from './examples/ComboboxExample.vue'
  import HoverCardExample from './examples/HoverCardExample.vue'
  import AccordionExample from './examples/AccordionExample.vue'
  import DirectionExample from './examples/DirectionExample.vue'
  import ResizableExample from './examples/ResizableExample.vue'
  import SeparatorExample from './examples/SeparatorExample.vue'
  import TypographyExample from './examples/TypographyExample.vue'
  import RadioGroupExample from './examples/RadioGroupExample.vue'
  import DatePickerExample from './examples/DatePickerExample.vue'
  import AttachmentExample from './examples/AttachmentExample.vue'
  import BreadcrumbExample from './examples/BreadcrumbExample.vue'
  import InputGroupExample from './examples/InputGroupExample.vue'
  import ScrollAreaExample from './examples/ScrollAreaExample.vue'
  import PaginationExample from './examples/PaginationExample.vue'
  import ToggleGroupExample from './examples/ToggleGroupExample.vue'
  import AlertDialogExample from './examples/AlertDialogExample.vue'
  import AspectRatioExample from './examples/AspectRatioExample.vue'
  import ButtonGroupExample from './examples/ButtonGroupExample.vue'
  import CollapsibleExample from './examples/CollapsibleExample.vue'
  import ContextMenuExample from './examples/ContextMenuExample.vue'
  import DropdownMenuExample from './examples/DropdownMenuExample.vue'
  import NavigationMenuExample from './examples/NavigationMenuExample.vue'
  import MessageScrollerExample from './examples/MessageScrollerExample.vue'
  import DateRangePickerExample from './examples/DateRangePickerExample.vue'
  import MessageScrollerHistoryExample from './examples/MessageScrollerHistoryExample.vue'
  import MessageScrollerCommandsExample from './examples/MessageScrollerCommandsExample.vue'
  import MessageScrollerStreamingExample from './examples/MessageScrollerStreamingExample.vue'
  import MessageScrollerVisibilityExample from './examples/MessageScrollerVisibilityExample.vue'

  const theme = shallowRef<'light' | 'dark'>('light')
</script>

<template>
  <main :data-theme="theme" class="playground">
    <Sonner :theme="theme" />
    <header class="playground__header">
      <div>
        <p class="playground__eyebrow">
          MoriUI
        </p>
        <h1>组件预览</h1>
      </div>
      <Button variant="outline" size="sm" @click="theme = theme === 'light' ? 'dark' : 'light'">
        切换到{{ theme === 'light' ? '深色' : '浅色' }}主题
      </Button>
    </header>

    <AccordionExample />
    <AlertExample />
    <AlertDialogExample />
    <AspectRatioExample />
    <AttachmentExample />
    <AvatarExample />
    <BadgeExample />
    <BreadcrumbExample />
    <BubbleExample />
    <ButtonExample />
    <ButtonGroupExample />
    <CalendarExample />
    <DatePickerExample />
    <DateRangePickerExample />
    <CardExample />
    <CarouselExample />
    <CheckboxExample />
    <RadioGroupExample />
    <CollapsibleExample />
    <ComboboxExample />
    <SelectExample />
    <CommandExample />
    <ContextMenuExample />
    <DialogExample />
    <HoverCardExample />
    <TooltipExample />
    <DirectionExample />
    <DrawerExample />
    <SheetExample />
    <EmptyExample />
    <DropdownMenuExample />
    <FieldExample />
    <InputExample />
    <TextareaExample />
    <TypographyExample />
    <LabelExample />
    <KbdExample />
    <InputOTPExample />
    <InputGroupExample />
    <ItemExample />
    <MarkerExample />
    <ProgressExample />
    <SliderExample />
    <SwitchExample />
    <ToggleExample />
    <ToggleGroupExample />
    <TabsExample />
    <ScrollAreaExample />
    <SeparatorExample />
    <SkeletonExample />
    <SonnerExample />
    <MenubarExample />
    <NavigationMenuExample />
    <PaginationExample />
    <TableExample />
    <ResizableExample />
    <MessageExample />
    <MessageScrollerExample />
    <MessageScrollerStreamingExample />
    <MessageScrollerHistoryExample />
    <MessageScrollerCommandsExample />
    <MessageScrollerVisibilityExample />
  </main>
</template>
