<script lang="ts" setup>
import dayjs from 'dayjs';
import '@/assets/styles/globals.scss';

dayjs.locale('ja');

let timer: ReturnType<typeof setInterval>;
let nextBus = getNextBus(dayjs());
let busMode = getTodayBusMode(dayjs());

onMounted(() => {
  timer = setInterval(() => {
    nextBus = getNextBus(dayjs());
    busMode = getTodayBusMode(dayjs());
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
