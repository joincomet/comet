import { whiteList } from '@/util/xss/xssWhiteList'

export const handleText = (text: string) =>
  filterXSS(text.replace(/<[^/>][^>]*><\/[^>]+>/, ''), { whiteList })
