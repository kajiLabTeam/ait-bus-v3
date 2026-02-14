<script lang="ts" setup>
import '@/assets/styles/globals.scss';

let timer: ReturnType<typeof setInterval>;
const nextBus = ref(getNextBus(getDayjs()));
const busMode = ref(getBusMode(getDayjs()));

onMounted(() => {
  timer = setInterval(() => {
    const day = getDayjs();

    nextBus.value = getNextBus(day);
    busMode.value = getBusMode(day);
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
