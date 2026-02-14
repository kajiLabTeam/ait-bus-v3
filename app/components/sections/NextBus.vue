<script lang="ts" setup>
import dayjs from 'dayjs';
import type { NextBus } from '~/types/timetable';

defineProps<{
  nextBus: NextBus;
}>();

function formatTime(time: [number, number]): string {
  return dayjs().hour(time[0]).minute(time[1]).format('HH:mm');
}
</script>

<template>
  <LayoutsSection
    id="nextbus"
    title="Next Time"
    :is-top="true"
  >
    <div class="to_ait">
      <h3>
        八草→大学
      </h3>

      <h4>next</h4>
      <p class="to_ait_next">
        {{ nextBus.toAIT.next ? formatTime(nextBus.toAIT.next) : '本日の運行は終了しました' }}
      </p>

      <h4>after the next</h4>
      <p class="to_ait_after_the_next">
        {{ nextBus.toAIT.afterNext ? formatTime(nextBus.toAIT.afterNext) : 'ー' }}
      </p>
    </div>

    <div class="to_yakusa">
      <h3>
        大学→八草
      </h3>

      <h4>next</h4>
      <p class="to_yakusa_next">
        {{ nextBus.toYakusa.next ? formatTime(nextBus.toYakusa.next) : '本日の運行は終了しました' }}
      </p>

      <h4>after the next</h4>
      <p class="to_yakusa_after_the_next">
        {{ nextBus.toYakusa.afterNext ? formatTime(nextBus.toYakusa.afterNext) : 'ー' }}
      </p>
    </div>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
h3 {
    padding: 0.5rem 0;
    font-size: 1.5rem;

    @include mobile {
      font-size: 1.2rem;
    }
  }

  h4 {
    padding: 1rem 0 0.5rem;
    font-size: 1.5rem;

    @include mobile {
      padding: 0.5rem 0 0.5rem;
      font-size: 1.2rem;
    }
  }

  .to_yakusa {
    margin-top: 2rem;

    @include mobile {
      margin-top: 1rem;
    }
  }

  .to_ait_next,
  .to_ait_after_the_next,
  .to_yakusa_next,
  .to_yakusa_after_the_next {
    font-size: 2rem;
    line-height: 2.5rem;

    @include mobile {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }

  .to_ait_next {
    background-color: #ffccbc;
  }

  .to_ait_after_the_next {
    background-color: rgba(255, 204, 188, 0.5);
  }

  .to_yakusa_next {
    background-color: #b3e5fc;
  }

  .to_yakusa_after_the_next {
    background-color: rgba(179, 229, 252, 0.5);
  }
</style>
