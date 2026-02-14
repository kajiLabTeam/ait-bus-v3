<script lang="ts" setup>
import type { ModelValue } from '@vuepic/vue-datepicker';
import '@/assets/styles/globals.scss';

const route = useRoute();
const dateQuery = parseDate(route.query.date as string | undefined);

let timer: ReturnType<typeof setInterval>;
const todayNextBus = ref(getNextBus(getDayjs(dateQuery)));
const todayBusMode = ref(getBusMode(getDayjs(dateQuery)));

const specifiedDate = ref<Date | null>(null);
const specifiedBusMode = ref(getBusMode(getDayjs({ from: specifiedDate.value })));

onMounted(() => {
  timer = setInterval(() => {
    const day = getDayjs(dateQuery);

    todayNextBus.value = getNextBus(day);
    todayBusMode.value = getBusMode(day);
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const onDateChange = (newDate: ModelValue) => {
  if (!newDate) return;
  specifiedBusMode.value = getBusMode(getDayjs({ from: newDate.toLocaleString() }));
};

const busMode = computed(() => {
  if (!specifiedDate.value || isToday(specifiedDate.value)) return todayBusMode.value;
  return specifiedBusMode.value;
});
const nextBus = computed(() => {
  if (!specifiedDate.value || isToday(specifiedDate.value)) return todayNextBus.value;
  return null; // 指定日が今日以外の場合、次のバス情報は表示しない
});
</script>

<template>
  <NuxtPwaManifest />
  <CommonAppHeader />
  <CommonTabBar />

  <main class="main">
    <SectionsNextBus :next-bus="todayNextBus" />
    <SectionsDateSelect
      v-model="specifiedDate"
      @date-change="onDateChange"
    />
    <SectionsSchedule
      :bus-mode="busMode"
      :date="specifiedDate"
    />
    <SectionsTimeTables
      :bus-mode="busMode"
      :next-bus="nextBus"
    />
    <SectionsPWA />
  </main>

  <CommonAppFooter />
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
