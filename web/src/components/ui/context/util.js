export const warn = (...args) => {
  const parts = [`[react-context-menu-wrapper]`].concat(args)
  console.warn.apply(null, parts)
}

export const isMobileDevice =
  typeof window.orientation !== 'undefined' ||
  navigator.userAgent.indexOf('IEMobile') !== -1

export const determineMenuPlacement = (
  clientX,
  clientY,
  menuWidth,
  menuHeight
) => {
  let left, top
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  if (isMobileDevice) {
    // On mobile devices, horizontally centre the menu on the tap, and place it above the tap
    const halfWidth = menuWidth / 2
    left = clientX - halfWidth
    top = clientY - menuHeight - 20
  } else {
    // On desktop, mimic native context menu placement
    const placeLeft = windowWidth - clientX <= menuWidth
    const placeBelow = windowHeight - clientY > menuHeight
    left = placeLeft ? clientX : clientX + menuWidth
    top = placeBelow ? clientY : windowHeight - (windowHeight - clientY)
  }

  // If menu overflows the page, try to nudge it in the correct direction, applying a small buffer
  const bufferX = 24
  const bufferY = 12
  const right = windowWidth - left - menuWidth
  const bottom = windowHeight - top - menuHeight
  if (right < 0) left += right - bufferX
  if (bottom < 0) top += bottom - bufferY
  if (left < 0) left = bufferX
  if (top < 0) top = bufferY

  return {
    left,
    top
  }
}
