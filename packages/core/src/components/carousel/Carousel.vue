<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { CarouselApi, CarouselAutoplayOptions, CarouselOptions, CarouselOrientation, CarouselPlugin } from './types'

  import Autoplay from 'embla-carousel-autoplay'
  import emblaCarouselVue from 'embla-carousel-vue'
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    provide,
    shallowRef,
    watch
  } from 'vue'

  import { carouselContextKey } from './types'
  import { carouselVariants } from './variants'

  interface Props {
    autoplay?: boolean | CarouselAutoplayOptions
    class?: HTMLAttributes['class']
    opts?: CarouselOptions
    orientation?: CarouselOrientation
    plugins?: CarouselPlugin[]
  }
  interface Emits { initApi: [api: CarouselApi] }

  const props = withDefaults(defineProps<Props>(), { autoplay: false, orientation: 'horizontal', plugins: () => [] })
  const emit = defineEmits<Emits>()
  const carouselRoot = shallowRef<HTMLElement>()
  const canScrollNext = shallowRef(false)
  const canScrollPrev = shallowRef(false)
  const autoplayPausedByUser = shallowRef(false)
  const isAutoplayPlaying = shallowRef(false)
  const prefersReducedMotion = shallowRef(false)
  const selectedIndex = shallowRef(0)
  const slideCount = shallowRef(0)
  const orientation = computed(() => props.orientation)
  const isAutoplayEnabled = computed(() => props.autoplay !== false)
  const emblaOptions = computed<CarouselOptions>(() => ({ ...props.opts, axis: orientation.value === 'horizontal' ? 'x' as const : 'y' as const }))
  const emblaPlugins = computed<CarouselPlugin[]>(() => {
    if (!isAutoplayEnabled.value || props.plugins.some(plugin => plugin.name === 'autoplay'))
      return props.plugins
    const options = typeof props.autoplay === 'object' ? props.autoplay : {}
    return [...props.plugins, Autoplay({
      delay: 5000,
      playOnInit: false,
      rootNode: () => carouselRoot.value ?? null,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      ...options
    })]
  })
  const [carouselRef, api] = emblaCarouselVue(emblaOptions, emblaPlugins)
  const slots = computed(() => carouselVariants({ orientation: orientation.value }))

  function syncState(carouselApi: CarouselApi) {
    canScrollNext.value = carouselApi.canScrollNext()
    canScrollPrev.value = carouselApi.canScrollPrev()
    selectedIndex.value = carouselApi.selectedScrollSnap()
    slideCount.value = carouselApi.scrollSnapList().length
    isAutoplayPlaying.value = carouselApi.plugins().autoplay?.isPlaying() ?? false
  }
  function suspendAutoplay() {
    api.value?.plugins().autoplay?.stop()
    isAutoplayPlaying.value = false
  }
  function resumeAutoplay() {
    if (!isAutoplayEnabled.value || prefersReducedMotion.value || autoplayPausedByUser.value)
      return
    api.value?.plugins().autoplay?.play()
    isAutoplayPlaying.value = api.value?.plugins().autoplay?.isPlaying() ?? false
  }
  function stopAutoplay() {
    autoplayPausedByUser.value = true
    suspendAutoplay()
  }
  function playAutoplay() {
    autoplayPausedByUser.value = false
    resumeAutoplay()
  }

  function scrollNext() {
    stopAutoplay(); api.value?.scrollNext()
  }
  function scrollPrev() {
    stopAutoplay(); api.value?.scrollPrev()
  }
  function scrollTo(index: number) {
    stopAutoplay(); api.value?.scrollTo(index)
  }
  function onKeyDown(event: KeyboardEvent) {
    const previous = orientation.value === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
    const next = orientation.value === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
    if (event.key === previous) {
      event.preventDefault(); scrollPrev()
    } else if (event.key === next) {
      event.preventDefault(); scrollNext()
    }
  }
  function onPointerEnter() {
    suspendAutoplay()
  }
  function onPointerLeave() {
    resumeAutoplay()
  }
  function onFocusIn() {
    suspendAutoplay()
  }
  function onFocusOut(event: FocusEvent) {
    if (!carouselRoot.value?.contains(event.relatedTarget as Node | null))
      resumeAutoplay()
  }

  provide(carouselContextKey, { api, carouselRef, canScrollNext, canScrollPrev, isAutoplayEnabled, isAutoplayPlaying, orientation, selectedIndex, slideCount, scrollNext, scrollPrev, scrollTo, playAutoplay, stopAutoplay })

  let mediaQuery: MediaQueryList | undefined
  function onMotionChange(event: MediaQueryListEvent) {
    prefersReducedMotion.value = event.matches
    if (event.matches)
      suspendAutoplay()
    else
      resumeAutoplay()
  }
  function onAutoplayChange(carouselApi: CarouselApi) {
    isAutoplayPlaying.value = carouselApi.plugins().autoplay?.isPlaying() ?? false
  }
  watch(api, (carouselApi, previousApi) => {
    previousApi?.off('init', syncState).off('reInit', syncState).off('select', syncState).off('autoplay:play', onAutoplayChange).off('autoplay:stop', onAutoplayChange)
    if (!carouselApi)
      return
    carouselApi.on('init', syncState).on('reInit', syncState).on('select', syncState).on('autoplay:play', onAutoplayChange).on('autoplay:stop', onAutoplayChange)
    syncState(carouselApi)
    emit('initApi', carouselApi)
    resumeAutoplay()
  })
  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener('change', onMotionChange)
    if (prefersReducedMotion.value)
      suspendAutoplay()
    else resumeAutoplay()
  })
  onBeforeUnmount(() => mediaQuery?.removeEventListener('change', onMotionChange))
  defineExpose({ api, carouselRef, canScrollNext, canScrollPrev, isAutoplayPlaying, orientation, selectedIndex, slideCount, scrollNext, scrollPrev, scrollTo, playAutoplay, stopAutoplay })
</script>

<template>
  <div
    ref="carouselRoot"
    :class="slots.base({ class: props.class as never })"
    :data-orientation="orientation"
    :data-autoplay="isAutoplayEnabled ? 'enabled' : 'disabled'"
    aria-roledescription="carousel"
    data-slot="carousel"
    role="region"
    tabindex="0"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @keydown="onKeyDown"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <slot
      :api="api"
      :can-scroll-next="canScrollNext"
      :can-scroll-prev="canScrollPrev"
      :is-autoplay-playing="isAutoplayPlaying"
      :orientation="orientation"
      :scroll-next="scrollNext"
      :scroll-prev="scrollPrev"
      :scroll-to="scrollTo"
    />
  </div>
</template>
