<script lang="ts" setup>
import { VueDatePicker, type ModelValue } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const { onDateChange } = defineProps<{
  onDateChange: (newDate: ModelValue) => void;
}>();

const dateModel = defineModel<Date | null>();
const format = 'yyyy年M月d日';
</script>

<template>
  <LayoutsSection
    id="date-select"
    title="日付検索"
  >
    <ClientOnly>
      <div class="specified-day">
        <span for="date-picker">日付検索:</span>
        <VueDatePicker
          id="date-picker"
          v-model="dateModel"
          :formats="{ input: format, preview: format }"
          :auto-apply="true"
          :time-picker="false"
          :time-config="{ enableTimePicker: false }"
          @update:model-value="onDateChange"
        />
      </div>
    </ClientOnly>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
.specified-day {
  margin: 2rem auto 0;
  width: fit-content;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
}
</style>
