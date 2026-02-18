<script lang="ts" setup>
import { VueDatePicker, type ModelValue } from '@vuepic/vue-datepicker';
import { ja } from 'date-fns/locale';
import '@vuepic/vue-datepicker/dist/main.css';
import { BUS_MODE_MAP } from '~/consts/mode';

const { onDateChange } = defineProps<{
  onDateChange: (newDate: ModelValue) => void;
}>();

const dateModel = defineModel<Date | null>();

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

const format = 'yyyy年M月d日';

const dates = Object.keys(BUS_MODE_MAP);
const minDate = dates.reduce((min, date) => {
  const currentDate = getDayjs({ from: date });
  return currentDate < min ? currentDate : min;
}, getDayjs({ from: dates[0] }));
const maxDate = dates.reduce((max, date) => {
  const currentDate = getDayjs({ from: date });
  return currentDate > max ? currentDate : max;
}, getDayjs({ from: dates[0] }));
const yearRange: [number, number] = [minDate.year(), maxDate.year()];
</script>

<template>
  <LayoutsSection
    id="date-select"
    title="日付検索"
  >
    <div class="specified-day">
      <span>日付検索:</span>
      <VueDatePicker
        v-if="isMounted"
        v-model="dateModel"
        :locale="ja"
        :vertical="true"
        :min-date="new Date(minDate.valueOf())"
        :max-date="new Date(maxDate.valueOf())"
        :year-range="yearRange"
        :formats="{ input: format, preview: format }"
        :auto-apply="true"
        :time-picker="false"
        :time-config="{ enableTimePicker: false }"
        @update:model-value="onDateChange"
      />
      <div
        v-else
        class="date_picker_placeholder"
      >
        <input class="dp__input dp__input_icon_pad">
        <CommonIconsCalendar />
      </div>
    </div>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
.specified-day {
  margin: 2rem auto 0;
  width: fit-content;
  height: 3rem;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
}

.date_picker_placeholder {
  width: 100%;
  height: 38px;
  border-radius: 4px;
  border: 1px solid rgb(221, 221, 221);
  color: var(--dp-text-color);
  box-sizing: border-box;
  display: inline-block;
  position: relative;

  div {
    overflow-wrap: break-word;
    line-break: after-white-space;
    display: block;
    --webkit-nbsp-mode: space;
    --webkit-user-modify: read-write-plaintext-only;
  }

  svg {
    box-sizing: content-box;
    padding: 6px 11px;
    width: 1rem;
    height: 1rem;
    color: rgb(149, 149, 149);
    position: absolute;
    top: 50%;
    inset-inline-start: 0;
    transform: translateY(-50%);
  }
}
</style>
