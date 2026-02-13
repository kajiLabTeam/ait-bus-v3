<script lang="ts" setup>
import dayjs from 'dayjs';

dayjs.locale('ja');

const busMode = getTodayBusMode(dayjs());
</script>

<template>
  <LayoutsSection
    id="schedule"
    title="今日の運行ダイヤ"
  >
    <p>
      {{ busMode ? `今日は${busMode}ダイヤです` : '本日は運休です' }}
    </p>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
p {
  font-size: 2rem;
  line-height: 2.5rem;
  background-color: #dcedc8;
}
</style>
