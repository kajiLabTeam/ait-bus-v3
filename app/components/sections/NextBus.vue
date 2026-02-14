<script lang="ts" setup>
import type { NextBus, Time } from '~/types/timetable';

defineProps<{
  nextBus: NextBus;
}>();

function formatTime(time: Time): string {
  return getDayjs().hour(time[0]).minute(time[1]).format('HH:mm');
}

function remainingTime(time: Time): string {
  const now = getDayjs();
  const busTime = getDayjs().hour(time[0]).minute(time[1]);
  const diff = busTime.diff(now, 'minute');
  if (diff < 0) return '';
  return `(${diff}分後)`;
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
        <span v-if="!nextBus.toAIT.next">本日の運行は終了しました</span>
        <span v-if="nextBus.toAIT.next">{{ formatTime(nextBus.toAIT.next) }}</span>
        <span
          v-if="nextBus.toAIT.next"
          class="remaining"
        >
          {{ remainingTime(nextBus.toAIT.next) }}
        </span>
      </p>

      <h4>after the next</h4>
      <p class="to_ait_after_the_next">
        <span v-if="!nextBus.toAIT.afterNext">ー</span>
        <span v-if="nextBus.toAIT.afterNext">{{ formatTime(nextBus.toAIT.afterNext) }}</span>
        <span
          v-if="nextBus.toAIT.afterNext"
          class="remaining"
        >
          {{ remainingTime(nextBus.toAIT.afterNext) }}
        </span>
      </p>
    </div>

    <div class="to_yakusa">
      <h3>
        大学→八草
      </h3>

      <h4>next</h4>
      <p class="to_yakusa_next">
        <span v-if="!nextBus.toYakusa.next">本日の運行は終了しました</span>
        <span v-if="nextBus.toYakusa.next">{{ formatTime(nextBus.toYakusa.next) }}</span>
        <span
          v-if="nextBus.toYakusa.next"
          class="remaining"
        >
          {{ remainingTime(nextBus.toYakusa.next) }}
        </span>
      </p>

      <h4>after the next</h4>
      <p class="to_yakusa_after_the_next">
        <span v-if="!nextBus.toYakusa.afterNext">ー</span>
        <span v-if="nextBus.toYakusa.afterNext">{{ formatTime(nextBus.toYakusa.afterNext) }}</span>
        <span
          v-if="nextBus.toYakusa.afterNext"
          class="remaining"
        >
          {{ remainingTime(nextBus.toYakusa.afterNext) }}
        </span>
      </p>
    </div>
  </LayoutsSection>
</template>

<style lang="scss" scoped>
h3 {
    padding: 0.5rem 0;
    font-size: 1.5rem;
    line-height: 1.2rem;

    @include mobile {
      font-size: 1.2rem;
      line-height: 1.2rem;
    }
  }

  h4 {
    padding: 1rem 0 0.5rem;
    font-size: 1.5rem;
    line-height: 1.5rem;

    @include mobile {
      padding: 0.5rem 0 0.5rem;
      font-size: 1.2rem;
      line-height: 1.2rem;
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
    display: flex;
    justify-content: center;
    align-items: center;

    @include mobile {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    .remaining {
      padding-left: 0.5rem;
      font-size: 1.5rem;

      @include mobile {
        padding-left: 0.2rem;
        font-size: 1rem;
      }
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
