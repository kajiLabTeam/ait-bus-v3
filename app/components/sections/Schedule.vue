<script lang="ts" setup>
import type { Mode } from '~/types/mode';
import '@vuepic/vue-datepicker/dist/main.css';

const { date, busMode } = defineProps<{
  date: Date | null;
  busMode: Mode | undefined;
}>();

const specifiedDay = computed(() => dateToString(date));
</script>

<template>
  <LayoutsSection
    id="schedule"
    :title="`${specifiedDay}の運行ダイヤ`"
  >
    <p class="schedule">
      {{ busMode ? `${busMode}ダイヤ` : '運行なし' }}
    </p>
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
</style>
