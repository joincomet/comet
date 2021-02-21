import dayjs from 'dayjs'
import dayjsTwitter from 'dayjs-twitter'

dayjs.extend(dayjsTwitter)

export function shortDate(date) {
  return dayjs(date).twitter()
}

export function fullDate(date) {
  return dayjs(date).format('dddd, MMMM D, YYYY h:mm A')
}
