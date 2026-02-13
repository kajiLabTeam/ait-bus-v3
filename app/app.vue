<script lang="ts" setup>
import '@/assets/styles/globals.scss';
</script>

<template>
  <CommonAppHeader />
  <CommonTabBar />

  <main class="main">
    <SectionsNextBus />
    <SectionsSchedule />
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
