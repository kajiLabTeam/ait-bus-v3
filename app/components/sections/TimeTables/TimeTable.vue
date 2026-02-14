<script lang="ts" setup>
import { BUS_TIME_TABLE_MAP } from '~/consts/timetable';
import type { Destination } from '~/types/destination';
import type { Mode } from '~/types/mode';
import type { Hour, NextBus } from '~/types/timetable';

const { busMode, nextBus, isActive } = defineProps<{
  busMode: Mode;
  nextBus: NextBus | null;
  isActive: boolean;
}>();

const timetable = computed(() => BUS_TIME_TABLE_MAP[busMode]);

function highlightClass(hour: Hour, minute: number, destination: Destination) {
  if (!isActive || !nextBus) return {};

  const next = nextBus[destination].next;
  const afterNext = nextBus[destination].afterNext;

  const isNext
    = next !== undefined
      && next[0] === hour
      && next[1] === minute;

  const isAfterNext
    = afterNext !== undefined
      && afterNext[0] === hour
      && afterNext[1] === minute;

  return {
    highlightNext: isNext,
    highlightAfterNext: isAfterNext,
  };
}
</script>

<template>
  <h3 :class="{ active: isActive }">
    <span>{{ `${busMode}ダイヤ` }}</span>
  </h3>
  <table>
    <thead>
      <tr>
        <th>時</th>
        <th>大学行</th>
        <th>八草行</th>
      </tr>
    </thead>

    <tbody>
      <template
        v-for="hour in Array.from({ length: 24 }, (_, i) => i)"
        :key="hour"
      >
        <tr v-if="timetable.toAIT[hour as Hour]?.length || timetable.toYakusa[hour as Hour]?.length">
          <td>{{ hour }}</td>
          <td>
            <span
              v-for="minute in timetable.toAIT[hour as Hour]"
              :key="minute"
              class="to_ait"
              :class="highlightClass(hour as Hour, minute, 'toAIT')"
            >
              {{ minute }}
            </span>
          </td>
          <td>
            <span
              v-for="minute in timetable.toYakusa[hour as Hour]"
              :key="minute"
              class="to_yakusa"
              :class="highlightClass(hour as Hour, minute, 'toYakusa')"
            >
              {{ minute }}
            </span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
h3 {
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;

  span {
    padding: 0.5rem 2rem;
    border-radius: 5px;
  }

  &.active {
    span {
      background-color: #dcedc8;
    }
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  color: rgb(99, 99, 99);

  th {
    color: #636363;
    font-size: 1em;
    line-height: 1.5rem;
    font-weight: 400;
    text-align: center;
    border: 1px solid #7cd1e0;
  }

  tr {
    &:nth-child(odd) {
      background-color: rgba(222, 222, 222, 0.25);
    }
  }

  tr,
  td {
    padding: 10px;
    border: 1px solid #7cd1e0;
    text-align: left;

    span {
      display: inline-block;
      width: 2rem;
      text-align: center;
      border-radius: 3px;

      &.highlightNext.to_ait {
        background-color: #ffccbc;
      }
      &.highlightAfterNext.to_ait {
        background-color: rgba(255, 204, 188, 0.5);
      }
      &.highlightNext.to_yakusa {
        background-color: #b3e5fc;
      }
      &.highlightAfterNext.to_yakusa {
        background-color: rgba(179, 229, 252, 0.5);
      }
    }
  }
}
</style>
