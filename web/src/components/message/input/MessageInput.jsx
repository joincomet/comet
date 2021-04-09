import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation } from 'urql'
import { SEND_MESSAGE } from '@/graphql/mutations'
import { IconFormatEmoji, IconUpload } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import ContentEditable from '@/components/ui/editor/ContentEditable'
import MessageDropZone from '@/components/message/input/MessageDropZone'
import MessageUploadDialog from '@/components/message/input/MessageUploadDialog'
import { useTyping } from '@/components/message/input/useTyping'
import { useMessagePlaceholder } from '@/components/message/input/useMessagePlaceholder'
import { useMessageInput } from '@/components/message/input/useMessageInput'
import Twemoji from 'react-twemoji'

export default function MessageInput({ channel, group, user }) {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const placeholder = useMessagePlaceholder({ channel, group, user })
  const focus = useMessageInput(inputRef, placeholder)
  const [startTyping, typingNames] = useTyping({ channel, group, user })
  const [text, setText] = useState('')
  const [files, setFiles] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [{ fetching }, sendMessage] = useMutation(SEND_MESSAGE)

  const variables = {
    channelId: channel?.id,
    groupId: group?.id,
    userId: user?.id
  }

  const pasteListener = useCallback(e => {
    const files = e.clipboardData.files
    if (files && files.length > 0) {
      setFiles(files)
      e.preventDefault()
    }
  }, [])

  useEffect(() => {
    document.body.addEventListener('paste', pasteListener)
    return () => {
      document.body.removeEventListener('paste', pasteListener)
    }
  }, [pasteListener])

  useEffect(() => {
    if (files) {
      setCurrentFile(files[0])
      setCurrentFileIndex(0)
    }
  }, [files])

  useEffect(() => {
    if (!files) return
    let timeoutId
    if (currentFileIndex >= files.length) {
      setFiles(null)
      setCurrentFile(null)
      setCurrentFileIndex(0)
    } else {
      setCurrentFile(null)
      timeoutId = setTimeout(() => setCurrentFile(files[currentFileIndex]), 300)
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentFileIndex])

  const cancelAll = useCallback(() => {
    setFiles(null)
    setCurrentFile(null)
    setCurrentFileIndex(0)
  }, [setFiles, setCurrentFile, setCurrentFileIndex])

  useEffect(() => {
    setText('')
  }, [user, group, channel])

  return (
    <>
      <MessageDropZone placeholder={placeholder} setFiles={setFiles} />

      <MessageUploadDialog
        sendMessage={sendMessage}
        variables={variables}
        file={currentFile}
        setFileIndex={setCurrentFileIndex}
        placeholder={placeholder}
        multiple={files && files.length > 1}
        cancelAll={cancelAll}
      />

      <div className="px-4 dark:bg-gray-750">
        <div className="relative">
          <Tippy content={t('message.upload')}>
            <div className="block absolute left-4.5 top-1/2 transform -translate-y-1/2">
              <input
                className="hidden"
                id="file"
                name="file"
                type="file"
                onChange={e => setFiles(e.target.files)}
                multiple
              />
              <label htmlFor="file" className="text-tertiary highlightable">
                <IconUpload className="w-5 h-5" />
              </label>
            </div>
          </Tippy>

          {window.electron && window.electron.isEmojiPanelSupported() && (
            <div
              className="absolute right-4.5 top-1/2 transform -translate-y-1/2"
              onClick={() => {
                focus()
                const te = text
                setText('')
                setTimeout(() => setText(te))
                window.electron.showEmojiPanel()
              }}
            >
              <IconFormatEmoji className="w-5 h-5 text-tertiary cursor-pointer" />
            </div>
          )}

          <Twemoji options={{ className: 'twemoji' }}>
            <ContentEditable
              ref={inputRef}
              className="px-14 min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light py-3 w-full dark:bg-gray-700 rounded-lg text-base focus:outline-none text-secondary border-none"
              html={text}
              data-placeholder={`${t('message.message')} ${placeholder}`}
              onChange={e => {
                startTyping(variables)
                setText(e.target.value)
                if (text === '<br>') setText('')
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (text && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage({
                      text,
                      ...variables
                    })
                    setText('')
                  } else if (!text) {
                    e.preventDefault()
                  }
                }
              }}
            />
          </Twemoji>
        </div>

        <div
          className="h-6 flex items-center text-primoary text-xs"
          dangerouslySetInnerHTML={{ __html: typingNames }}
        />
      </div>
    </>
  )
}
