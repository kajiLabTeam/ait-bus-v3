<script lang="ts" setup>
import type { Mode } from '~/types/mode';
import TimeTable from './TimeTable.vue';
import type { NextBus } from '~/types/timetable';

const { busMode } = defineProps<{
  busMode: Mode | undefined;
  nextBus: NextBus | null;
}>();

const sliderRef = ref<HTMLElement | null>(null);
const currentSlide = ref(busMode ? getModeIndex(busMode) : 0);

onMounted(async () => {
  const wrapper = sliderRef.value;
  if (!wrapper) return;

  const slides = Array.from(wrapper.children);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = slides.indexOf(entry.target as Element);
          if (index !== -1) currentSlide.value = index;
        }
      });
    },
    {
      root: wrapper,
      threshold: 0.6, // 60%以上見えたらフォーカス
    },
  );

  slides.forEach(slide => observer.observe(slide));
});

onMounted(() => {
  scrollToCurrentSlide();
});

watch(
  () => busMode,
  async (newMode) => {
    const i = getModeIndex(newMode);
    if (i === -1) return;

    await nextTick(); // DOM更新後にスクロール
    currentSlide.value = i;
    scrollToCurrentSlide();
  },
);

function getModeIndex(mode: Mode | undefined) {
  if (!mode) return -1;
  return ['A', 'B', 'C'].indexOf(mode);
}

function scrollToCurrentSlide() {
  const wrapper = sliderRef.value;
  if (!wrapper) return;

  const slide = wrapper.children[currentSlide.value] as HTMLElement | undefined;
  if (!slide) return;

  const offset = slide.offsetLeft - (wrapper.clientWidth / 2 - slide.clientWidth / 2);
  wrapper.scrollTo({
    left: offset,
    behavior: 'smooth',
  });
}

function scrollToSlide(direction: 'prev' | 'next') {
  const wrapper = sliderRef.value;
  if (!wrapper) return;

  const slideWidth = wrapper.children[0]?.clientWidth ?? 0;
  const scrollAmount = direction === 'prev' ? -slideWidth : slideWidth;

  wrapper.scrollBy({
    left: scrollAmount,
    behavior: 'smooth',
  });
}
</script>

<template>
  <LayoutsSection
    id="timetables"
    title="時刻表"
  >
    <div
      class="wrapper"
    >
      <div
        ref="sliderRef"
        class="slider"
      >
        <div class="slide">
          <TimeTable
            bus-mode="A"
            :next-bus="nextBus"
            :is-active="busMode === 'A'"
          />
        </div>
        <div class="slide">
          <TimeTable
            bus-mode="B"
            :next-bus="nextBus"
            :is-active="busMode === 'B'"
          />
        </div>
        <div class="slide">
          <TimeTable
            bus-mode="C"
            :next-bus="nextBus"
            :is-active="busMode === 'C'"
          />
        </div>
      </div>

      <div class="pagenation">
        <button
          :disabled="currentSlide === 0"
          @click="scrollToSlide('prev')"
        >
          ＜
        </button>
        <button
          :disabled="currentSlide === 2"
          @click="scrollToSlide('next')"
        >
          ＞
        </button>
      </div>
    </div>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-inline: auto;
  overflow-x: scroll;
  position: relative;

  .slider {
    padding-bottom: 30px;
    height: fit-content;
    display: flex;
    gap: 2rem;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    .slide {
      box-sizing: content-box;
      width: 100%;
      max-width: 600px;
      flex-shrink: 0;
      scroll-snap-align: center;

      &:first-child {
        margin-left: 1000px;
      }

      &:last-child {
        margin-right: 1000px;
      }
    }
  }

  .pagenation {
    padding: 1rem;
    width: 100%;
    max-width: 600px;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    button {
      all: unset;
      cursor: pointer;

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }
}
</style>
