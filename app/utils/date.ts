import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ja');
dayjs.extend(utc);
dayjs.extend(timezone);

export function getDayjs(from?: Date | string | null) {
  if (from) return dayjs(from).tz('Asia/Tokyo');
  return dayjs().tz('Asia/Tokyo');
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
