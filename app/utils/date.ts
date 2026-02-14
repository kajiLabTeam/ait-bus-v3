import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ja');
dayjs.extend(utc);
dayjs.extend(timezone);

interface GetDayjsOptionsFrom {
  from: Date | string | null;
}
interface GetDayjsOptionsSetDate {
  year: number;
  month: number;
  day: number;
}

export function getDayjs(options?: GetDayjsOptionsFrom | GetDayjsOptionsSetDate): dayjs.Dayjs {
  if (!options) return dayjs().tz('Asia/Tokyo');
  if ('from' in options) return dayjs(options.from).tz('Asia/Tokyo');
  return dayjs().tz('Asia/Tokyo').set('year', options.year).set('month', options.month - 1).set('date', options.day);
}

export function isToday(date: Date): boolean {
  if (!date) return true;
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
}

export function dateToString(date: Date | null): string {
  if (!date || isToday(date)) return '今日';

  const isThisYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString('ja-JP', isThisYear
    ? { month: 'long', day: 'numeric' }
    : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
}

export function parseDate(str: string | undefined): GetDayjsOptionsSetDate | undefined {
  if (!str) return undefined;

  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return undefined;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  // 日付として妥当かチェック
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year) return undefined;
  if (date.getMonth() + 1 !== month) return undefined;
  if (date.getDate() !== day) return undefined;

  return { year, month, day };
}
