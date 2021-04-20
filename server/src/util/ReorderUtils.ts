import * as mudder from 'mudder'

export const ReorderUtils = {
  positionBefore: (pos: string) => mudder.base62.mudder('', pos, 1)[0],
  positionAfter: (pos: string) => mudder.base62.mudder(pos, '', 1)[0],
  positionBetween: (beforePos: string, afterPos: string) =>
    mudder.base62.mudder(beforePos, afterPos, 1)[0],
  FIRST_POSITION: mudder.base62.mudder('', '', 1)[0]
}
