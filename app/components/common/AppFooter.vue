<script lang="ts" setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <p class="copyright">
      © {{ year }} 愛知工業大学 梶研究室
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 50px 0 0;

  .copyright {
    color: $color-on-background;
    text-align: center;
    font-weight: normal;
    font-size: 1rem;
  }
}
</style>
