<script lang="ts" setup>
import type { Mode } from '~/types/mode';
import { VueDatePicker, type ModelValue } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref<Date | null>(new Date());
const specifiedBusMode = ref(getBusMode(getDayjs(date?.value)));

const format = 'yyyy年M月d日';
const inputFormat = 'yyyy/MM/dd';

const onDateChange = (newDate: ModelValue) => {
  if (!newDate) return;
  specifiedBusMode.value = getBusMode(getDayjs(newDate.toLocaleString()));
};

const { busMode } = defineProps<{
  busMode: Mode | undefined;
}>();

const specifiedDay = computed(() => {
  if (!date.value || isToday(date.value)) return '今日';

  const isThisYear = date.value.getFullYear() === new Date().getFullYear();
  return date.value.toLocaleDateString('ja-JP', isThisYear
    ? { month: 'long', day: 'numeric' }
    : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
});

const specifiedSchedule = computed(() => {
  if (!date.value || isToday(date.value)) return busMode ? `今日は${busMode}ダイヤです` : '今日は運休です';
  return specifiedBusMode.value ? `${specifiedBusMode.value}ダイヤです` : '運休です';
});
</script>

<template>
  <LayoutsSection
    id="schedule"
    :title="`${specifiedDay}の運行ダイヤ`"
  >
    <p class="schedule">
      {{ specifiedSchedule }}
    </p>

    <ClientOnly>
      <div class="specified-day">
        <span for="date-picker">日時検索:</span>
        <VueDatePicker
          id="date-picker"
          v-model="date"
          :formats="{ input: format, preview: format }"
          :text-input="{ format: inputFormat }"
          :auto-apply="true"
          arrow-navigation
          @update:model-value="onDateChange"
        />
      </div>
    </ClientOnly>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
.schedule {
  font-size: 2rem;
  line-height: 2.5rem;
  background-color: #dcedc8;

  @include mobile {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

.specified-day {
  margin: 2rem auto 0;
  width: fit-content;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
}
</style>
