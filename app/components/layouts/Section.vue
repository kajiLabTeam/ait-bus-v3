<script lang="ts" setup>
defineProps<{
  id: string;
  title: string;
}>();
</script>

<template>
  <section
    :id="id"
    class="section"
  >
    <div class="header">
      <h2
        v-if="title"
        class="title"
      >
        {{ title }}
      </h2>
    </div>

    <slot />
  </section>
</template>

<style lang="scss" scoped>
.section {
  padding: 20px 20px 40px;
  border-radius: 5px;
  background-color: #ffffff;

  .header {
    margin-bottom: 1.5rem;

    .title {
      font-size: 2rem;

      &::after {
        content: "";
        margin: 1rem auto 1rem;
        width: 3.25em;
        height: 2px;
        border-radius: 2px;
        background-image: linear-gradient(90deg, #efa8b0, #a89cc8, #8cc9f0);
        display: block;
      }
    }
  }
}
</style>
