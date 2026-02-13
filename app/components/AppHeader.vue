<template>
  <header class="header">
    <h1 class="title">
      <span>愛工大バス時刻案内</span>
      <br>
      <span>＜非公式＞</span>
    </h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 0 0 20px;

  .title {
    color: $color-on-background;
    text-align: center;
    font-weight: normal;
    font-size: 2rem;

    @include mobile {
      font-size: 1.5rem;
    }
  }
}
</style>
