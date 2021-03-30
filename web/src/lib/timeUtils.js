import dayjs from 'dayjs'
import dayjsTwitter from 'dayjs-twitter'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(dayjsTwitter)
dayjs.extend(calendar)

export function shortDate(date) {
  return dayjs(date).twitter()
}

export function fullDate(date) {
  return dayjs(date).format('dddd, MMMM D, YYYY h:mm A')
}

export function calendarDate(date) {
  return dayjs(date).calendar()
}

export function shortTime(date) {
  return dayjs(date).format('h:mm A')
}
