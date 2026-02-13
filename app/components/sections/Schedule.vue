<script lang="ts" setup>
import type { Mode } from '~/types/mode';

defineProps<{
  busMode: Mode | undefined;
}>();
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
