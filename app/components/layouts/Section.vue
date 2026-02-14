<script lang="ts" setup>
defineProps<{
  id: string;
  title: string;
  isTop?: boolean;
}>();
</script>

<template>
  <section
    :id="id"
    class="section"
    :class="{ is_top: isTop }"
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
  scroll-margin-top: 100px;

  &.is_top {
    border-radius: 0 0 5px 5px;
    scroll-margin-top: 999px;
  }

  @include mobile {
    padding: 15px 10px 30px;

    &.is_top {
      border-radius: 5px;
    }
  }

  .header {
    margin-bottom: 1.5rem;

    @include mobile {
      margin-bottom: 1rem;
    }

    .title {
      font-size: 2rem;
      line-height: 2rem;

      @include mobile {
        font-size: 1.5rem;
        line-height: 1.5rem;
      }

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
