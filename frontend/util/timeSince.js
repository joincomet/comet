import { formatDistanceToNowStrict } from 'date-fns'

export const timeSince = (date) => {
  return formatDistanceToNowStrict(date)
    .replace(' years', 'y')
    .replace(' year', 'y')
    .replace(' months', 'mo')
    .replace(' month', 'mo')
    .replace(' days', 'd')
    .replace(' day', 'd')
    .replace(' hours', 'h')
    .replace(' hour', 'h')
    .replace(' minutes', 'm')
    .replace(' minute', 'm')
    .replace(' seconds', 's')
    .replace(' second', 's')
}
