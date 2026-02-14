import type { Dayjs } from 'dayjs';
import { DESTINATION } from '~/consts/destination';
import { BUS_MODE_MAP } from '~/consts/mode';
import { BUS_TIME_TABLE_MAP } from '~/consts/timetable';
import type { Hour, NextBus, Time, TimeTableToDestination } from '~/types/timetable';

/**
 * 指定した日のバス運行モードを取得する
 * @param day
 */
export function getBusMode(day: Dayjs) {
  const today = day.format('YYYY-MM-DD');
  return BUS_MODE_MAP?.[today];
}

/**
 * 指定した日時の次とさらにその次のバスの時刻を取得する
 * @param day
 */
export function getNextBus(day: Dayjs): NextBus {
  const todayMode = getBusMode(day);

  // 運休日 / 未登録
  if (todayMode == undefined) {
    return {
      toAIT: {
        next: undefined,
        afterNext: undefined,
      },
      toYakusa: {
        next: undefined,
        afterNext: undefined,
      },
    };
  }

  const timeTable = BUS_TIME_TABLE_MAP[todayMode];
  const busTimes = getBusTimes(timeTable);
  const toYakusaIndex = busTimes.toYakusa.findIndex(time => isAfter(day, time));
  const toAITIndex = busTimes.toAIT.findIndex(time => isAfter(day, time));

  const nextToYakusa = busTimes.toYakusa[toYakusaIndex];
  const afterNextToYakusa = busTimes.toYakusa[toYakusaIndex === -1 ? -1 : toYakusaIndex + 1];
  const nextToAIT = busTimes.toAIT[toAITIndex];
  const afterNextToAIT = busTimes.toAIT[toAITIndex === -1 ? -1 : toAITIndex + 1];

  return {
    toYakusa: {
      next: nextToYakusa,
      afterNext: afterNextToYakusa,
    },
    toAIT: {
      next: nextToAIT,
      afterNext: afterNextToAIT,
    },
  };
}

interface BusTimes {
  toYakusa: Time[];
  toAIT: Time[];
}

/**
 * 指定した時刻表から各行き先ごとのバス時刻配列を取得する
 */
function getBusTimes(timeTable: TimeTableToDestination): BusTimes {
  return DESTINATION.reduce<BusTimes>((acc, d) => {
    acc[d] = Array.from({ length: 24 }, (_, hour) =>
      timeTable[d][hour as Hour].map(
        minute => [hour as Hour, minute] as [Hour, number],
      ),
    ).flat();

    return acc;
  }, { toAIT: [], toYakusa: [] });
}

function isAfter(base: Dayjs, target: Time) {
  const hour = base.hour();
  const minute = base.minute();
  const [h, m] = target;
  return h > hour || (h === hour && m > minute);
}
