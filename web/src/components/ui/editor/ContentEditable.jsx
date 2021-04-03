import { useRef, useEffect, useCallback, forwardRef } from 'react'
import ReactContentEditable from 'react-contenteditable'

const useRefCallback = (value, deps) => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, deps ?? [value])

  const result = useCallback((...args) => {
    ref.current?.(...args)
  }, [])

  return result
}

export default forwardRef(
  ({ onChange, onInput, onBlur, onKeyPress, onKeyDown, ...props }, ref) => {
    const onChangeRef = useRefCallback(onChange)
    const onInputRef = useRefCallback(onInput)
    const onBlurRef = useRefCallback(onBlur)
    const onKeyPressRef = useRefCallback(onKeyPress)
    const onKeyDownRef = useRefCallback(onKeyDown)

    return (
      <ReactContentEditable
        {...props}
        ref={ref}
        onChange={onChangeRef}
        onInput={onInputRef}
        onBlur={onBlurRef}
        onKeyPress={onKeyPressRef}
        onKeyDown={onKeyDownRef}
      />
    )
  }
)
