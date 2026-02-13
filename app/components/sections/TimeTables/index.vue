<script lang="ts" setup>
import type { Mode } from '~/types/mode';
import TimeTable from './TimeTable.vue';

const { todayMode } = defineProps<{
  todayMode: Mode | undefined;
}>();

const sliderRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  const initialSlide = (() => {
    switch (todayMode) {
      case 'A':
        return 1;
      case 'B':
        return 2;
      case 'C':
        return 1;
      default:
        return 0;
    }
  })();

  const wrapper = sliderRef.value;
  if (!wrapper) return;

  const slideWidth = wrapper.children[0]?.clientWidth;
  if (!slideWidth) return;
  wrapper.scrollLeft = (slideWidth + 32) * initialSlide;
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
          <TimeTable mode="A" />
        </div>
        <div class="slide">
          <TimeTable mode="B" />
        </div>
        <div class="slide">
          <TimeTable mode="C" />
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
