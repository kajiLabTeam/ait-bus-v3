<script lang="ts" setup>
import { BUS_TIME_TABLE_MAP } from '~/consts/timetable';
import type { Mode } from '~/types/mode';
import type { Hour } from '~/types/timetable';

const { mode } = defineProps<{
  mode: Mode;
}>();

const timetable = computed(() => BUS_TIME_TABLE_MAP[mode]);
</script>

<template>
  <h3>{{ `${mode}ダイヤ` }}</h3>
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
            >
              {{ minute }}
            </span>
          </td>
          <td>
            <span
              v-for="minute in timetable.toYakusa[hour as Hour]"
              :key="minute"
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
}

table {
  margin-inline: auto;
  width: 100%;
  max-width: 600px;
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
    }
  }
}
</style>
