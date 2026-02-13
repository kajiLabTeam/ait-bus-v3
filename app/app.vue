<script lang="ts" setup>
import '@/assets/styles/globals.scss';
</script>

<template>
  <AppHeader />

  <main class="main">
    <NextBus />
  </main>
</template>

<style lang="scss" scoped>
.title {
  font-weight: normal;
  color: $color-on-background;
}

.main {
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  background-color: #ffffff;
  text-align: center;
}
</style>
