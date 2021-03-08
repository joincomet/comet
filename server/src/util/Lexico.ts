const START_CHAR_CODE = 32
const END_CHAR_CODE = 126
export const FIRST_POSITION = String.fromCharCode(START_CHAR_CODE + 1)

function assertDev(expr: boolean) {
  if (!expr) {
    throw Error('Assertion Error')
  }
}

export function comparePositions(firstPos: string, secondPos: string): number {
  return +(firstPos < secondPos) - +(firstPos > secondPos)
}

export function isValidPosition(pos: string): boolean {
  if (pos === '' || pos.charCodeAt(pos.length - 1) == START_CHAR_CODE) {
    return false
  }
  for (let i = 0; i < pos.length; i++) {
    const t = pos.charCodeAt(i)
    if (t < START_CHAR_CODE || t > END_CHAR_CODE) {
      return false
    }
  }
  return true
}

export function positionBefore(pos: string): string {
  assertDev(0 !== pos.length)

  for (let i = pos.length - 1; i >= 0; i--) {
    let curCharCode = pos.charCodeAt(i)
    if (curCharCode > START_CHAR_CODE + 1) {
      let position = pos.substr(0, i) + String.fromCharCode(curCharCode - 1)
      assertDev(isValidPosition(position))
      return position
    }
  }
  let position =
    pos.substr(0, pos.length - 1) +
    String.fromCharCode(START_CHAR_CODE) +
    String.fromCharCode(END_CHAR_CODE)
  assertDev(isValidPosition(position))
  return position
}
export function positionAfter(pos: string): string {
  assertDev(0 !== pos.length)

  for (let i = pos.length - 1; i >= 0; i--) {
    let curCharCode = pos.charCodeAt(i)
    if (curCharCode < END_CHAR_CODE) {
      let position = pos.substr(0, i) + String.fromCharCode(curCharCode + 1)
      assertDev(isValidPosition(position))
      return position
    }
  }
  let position = pos + String.fromCharCode(START_CHAR_CODE + 1)
  assertDev(isValidPosition(position))
  return position
}

function avg(a: number, b: number): number {
  return Math.trunc((a + b) / 2)
}

export function positionBetween(firstPos: string, secondPos: string): string {
  assertDev(firstPos < secondPos)
  let flag = false
  let position = ''
  const maxLength = Math.max(firstPos.length, secondPos.length)
  for (let i = 0; i < maxLength; i++) {
    const lower = i < firstPos.length ? firstPos.charCodeAt(i) : START_CHAR_CODE
    const upper =
      i < secondPos.length && !flag ? secondPos.charCodeAt(i) : END_CHAR_CODE
    if (lower === upper) {
      position += String.fromCharCode(lower)
    } else if (upper - lower > 1) {
      position += String.fromCharCode(avg(lower, upper))
      flag = false
      break
    } else {
      position += String.fromCharCode(lower)
      flag = true
    }
  }

  if (flag) {
    position += String.fromCharCode(avg(START_CHAR_CODE, END_CHAR_CODE))
  }
  assertDev(firstPos < position)
  assertDev(position < secondPos)
  assertDev(isValidPosition(position))
  return position
}

interface IOrdering<T> {
  readonly positionBefore: (a: T) => T
  readonly positionAfter: (a: T) => T
  readonly positionBetween: (a: T, b: T) => T

  readonly positionsEqual: (a: T, b: T) => boolean
  readonly comparePositions: (a: T, b: T) => number
  readonly isValidPosition: (a: T) => boolean
  readonly FIRST_POSITION: T
}

export const Lexico: IOrdering<string> = {
  positionBefore,
  positionAfter,
  positionBetween,
  positionsEqual: (a, b) => a === b,
  comparePositions: (a, b) => -comparePositions(a, b),
  isValidPosition,
  FIRST_POSITION
}
