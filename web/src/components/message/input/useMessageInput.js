import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useMessageInput = (inputRef, placeholder) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (inputRef.current?.el?.current)
      inputRef.current.el.current.dataset.placeholder = `${t(
        'message.message'
      )} ${placeholder}`
  }, [inputRef, placeholder, t])

  const focus = useCallback(() => inputRef.current?.el?.current?.focus(), [
    inputRef
  ])
  useEffect(() => focus(), [focus])

  const keypress = useCallback(() => {
    focus()
  }, [focus])
  useEffect(() => {
    document.body.addEventListener('keypress', keypress)
    return () => document.body.removeEventListener('keypress', keypress)
  }, [keypress])

  return focus
}
