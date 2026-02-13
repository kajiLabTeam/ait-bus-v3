<script lang="ts" setup>
import type { Mode } from '~/types/mode';
import TimeTable from './TimeTable.vue';
import { Hooper, Slide, Navigation } from '@wattanx/hooper-vue3';
import '@wattanx/hooper-vue3/css';

const { todayMode } = defineProps<{
  todayMode: Mode | undefined;
}>();

const initialSlide = (() => {
  switch (todayMode) {
    case 'A':
      return 0;
    case 'B':
      return 1;
    case 'C':
      return 2;
    default:
      return 0;
  }
})();
</script>

<template>
  <LayoutsSection
    id="timetables"
    title="時刻表"
  >
    <Hooper
      class="hooper"
      :initial-slide="initialSlide"
    >
      <Slide>
        <TimeTable mode="A" />
      </Slide>
      <Slide>
        <TimeTable mode="B" />
      </Slide>
      <Slide>
        <TimeTable mode="C" />
      </Slide>

      <template #hooper-addons>
        <Navigation />
      </template>
    </Hooper>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
.hooper {
  padding-bottom: 30px;
  height: fit-content;
}
</style>
