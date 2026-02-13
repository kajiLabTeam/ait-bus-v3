<script lang="ts" setup>
import date from './utils/date';
import '@/assets/styles/globals.scss';

let timer: ReturnType<typeof setInterval>;
let nextBus = getNextBus(date);
let busMode = getTodayBusMode(date);

onMounted(() => {
  timer = setInterval(() => {
    nextBus = getNextBus(date);
    busMode = getTodayBusMode(date);
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <CommonAppHeader />
  <CommonTabBar />

  <main class="main">
    <SectionsNextBus :next-bus="nextBus" />
    <SectionsSchedule :bus-mode="busMode" />
    <SectionsTimeTables
      :today-mode="busMode"
      :next-bus="nextBus"
    />
  </main>
</template>

<style lang="scss" scoped>
.title {
  font-weight: normal;
  color: $color-on-background;
}

.main {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
</style>
