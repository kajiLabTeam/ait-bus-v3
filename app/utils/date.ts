import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ja');
dayjs.extend(utc);
dayjs.extend(timezone);

export function getDayjs() {
  return dayjs().tz('Asia/Tokyo').set('dates', 12);
}
