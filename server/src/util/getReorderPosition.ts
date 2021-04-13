import { ReorderUtils } from '@/util/ReorderUtils'

export const getReorderPosition = (
  firstPosition: string | null | undefined,
  beforePosition: string | null | undefined,
  afterPosition: string | null | undefined
): string => {
  let position: string
  if (beforePosition) {
    position = afterPosition
      ? ReorderUtils.positionBetween(beforePosition, afterPosition)
      : ReorderUtils.positionAfter(beforePosition)
  } else {
    position = firstPosition
      ? ReorderUtils.positionBefore(firstPosition)
      : ReorderUtils.FIRST_POSITION
  }
  return position
}
