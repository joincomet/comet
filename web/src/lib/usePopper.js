import { useRef, useCallback, useMemo } from 'react'
import { createPopper } from '@popperjs/core'

/**
 * Example implementation to use Popper: https://popper.js.org/
 */
export function usePopper(options) {
  let reference = useRef(null)
  let popper = useRef(null)

  let cleanupCallback = useRef(() => {})

  let instantiatePopper = useCallback(() => {
    if (!reference.current) return
    if (!popper.current) return

    if (cleanupCallback.current) cleanupCallback.current()

    cleanupCallback.current = createPopper(
      reference.current,
      popper.current,
      options
    ).destroy
  }, [reference, popper, cleanupCallback, options])

  return useMemo(
    () => [
      referenceDomNode => {
        reference.current = referenceDomNode
        instantiatePopper()
      },
      popperDomNode => {
        popper.current = popperDomNode
        instantiatePopper()
      }
    ],
    [reference, popper, instantiatePopper]
  )
}
