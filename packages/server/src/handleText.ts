import { whiteList } from '@/XSSWhiteList'

export const handleText = (text: string) =>
  filterXSS(text.replace(/<[^/>][^>]*><\/[^>]+>/, ''), { whiteList })
