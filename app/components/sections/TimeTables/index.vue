<script lang="ts" setup>
import type { Mode } from '~/types/mode';
import TimeTable from './TimeTable.vue';
import type { NextBus } from '~/types/timetable';

const { todayMode } = defineProps<{
  todayMode: Mode | undefined;
  nextBus: NextBus;
}>();

const sliderRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  const wrapper = sliderRef.value;
  if (!wrapper) return;

  const slideIndex = ['A', 'B', 'C'].indexOf(todayMode ?? 'A');

  wrapper.children[slideIndex]?.scrollIntoView({
    behavior: 'instant',
    inline: 'center',
  });
});
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
            mode="A"
            :next-bus="nextBus"
            :is-active="todayMode === 'A'"
          />
        </div>
        <div class="slide">
          <TimeTable
            mode="B"
            :next-bus="nextBus"
            :is-active="todayMode === 'B'"
          />
        </div>
        <div class="slide">
          <TimeTable
            mode="C"
            :next-bus="nextBus"
            :is-active="todayMode === 'C'"
          />
        </div>
      </div>
    </div>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-inline: auto;
  overflow-x: scroll;

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
}
</style>
