import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ja');
dayjs.extend(utc);
dayjs.extend(timezone);

export function getDayjs(from?: Date | string | null) {
  if (from) return dayjs(from).tz('Asia/Tokyo');
  return dayjs().tz('Asia/Tokyo').set('dates', 12);
}

export function isToday(date: Date): boolean {
  if (!date) return true;
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
}
