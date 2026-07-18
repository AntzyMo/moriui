<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CalendarRootEmits, CalendarRootProps, DateValue } from 'reka-ui'

  import { ChevronLeft, ChevronRight } from '@lucide/vue'
  import { CalendarRoot, useForwardPropsEmits } from 'reka-ui'

  import CalendarCell from './CalendarCell.vue'
  import CalendarGrid from './CalendarGrid.vue'
  import CalendarNext from './CalendarNext.vue'
  import CalendarPrev from './CalendarPrev.vue'
  import { calendarVariants } from './variants'
  import CalendarHeader from './CalendarHeader.vue'
  import CalendarGridRow from './CalendarGridRow.vue'
  import CalendarHeading from './CalendarHeading.vue'
  import CalendarGridBody from './CalendarGridBody.vue'
  import CalendarGridHead from './CalendarGridHead.vue'
  import CalendarHeadCell from './CalendarHeadCell.vue'
  import CalendarCellTrigger from './CalendarCellTrigger.vue'

  interface Props extends Omit<CalendarRootProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  type Emits = Pick<CalendarRootEmits, 'update:placeholder'>

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const modelValue = defineModel<DateValue | DateValue[] | null>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <CalendarRoot
    v-slot="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="calendarVariants().root({ class: props.class as never })"
    data-slot="calendar"
  >
    <CalendarHeader>
      <div :class="calendarVariants().navigation()" data-slot="calendar-navigation">
        <CalendarPrev>
          <slot name="prev-icon">
            <ChevronLeft
              :class="calendarVariants().prevIcon()"
              aria-hidden="true"
              data-slot="calendar-prev-icon"
            />
          </slot>
        </CalendarPrev>
        <CalendarHeading v-slot="headingProps">
          <slot name="heading" v-bind="headingProps">
            {{ headingProps.headingValue }}
          </slot>
        </CalendarHeading>
        <CalendarNext>
          <slot name="next-icon">
            <ChevronRight
              :class="calendarVariants().nextIcon()"
              aria-hidden="true"
              data-slot="calendar-next-icon"
            />
          </slot>
        </CalendarNext>
      </div>
    </CalendarHeader>

    <div :class="calendarVariants().months()" data-slot="calendar-months">
      <CalendarGrid
        v-for="month in slotProps.grid"
        :key="month.value.toString()"
      >
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell
              v-for="weekDay in slotProps.weekDays"
              :key="weekDay"
            >
              {{ weekDay }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`${month.value.toString()}-${index}`"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
              >
                <template #default="dayProps">
                  <slot name="day" v-bind="dayProps">
                    {{ dayProps.dayValue }}
                  </slot>
                </template>
              </CalendarCellTrigger>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
