export const getMenuPosition = (rect, [x, y]) => {
  const menuStyles = {
    top: y,
    left: x,
    isRight: false
  }

  const { innerWidth, innerHeight } = window

  if (y + rect.height > innerHeight) {
    menuStyles.top -= rect.height
  }

  if (x + rect.width > innerWidth) {
    menuStyles.left -= rect.width
  }

  if (x + rect.width * 2 > innerWidth) {
    menuStyles.isRight = true
  }

  if (menuStyles.top < 0) {
    menuStyles.top =
      rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0
  }

  if (menuStyles.left < 0) {
    menuStyles.left =
      rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0
  }

  return menuStyles
}

export const getCoords = (event, config) =>
  ['X', 'Y'].map(
    axis =>
      (event[`client${axis}`] ||
        (event.touches && event.touches[0][`page${axis}`])) -
      config[`pos${axis}`]
  )
