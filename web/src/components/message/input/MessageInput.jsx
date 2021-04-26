import { useCallback, useEffect, useRef, useState } from 'react'
import { IconUpload } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import MessageDropZone from '@/components/message/input/MessageDropZone'
import MessageUploadDialog from '@/components/message/input/MessageUploadDialog'
import { useTyping } from '@/components/message/input/useTyping'
import { useMessagePlaceholder } from '@/components/message/input/useMessagePlaceholder'
import { useCreateMessageMutation } from '@/graphql/hooks'
import { EditorContent, useEditor } from '@tiptap/react'
import { defaultExtensions } from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

const exts = [
  'doc',
  'text',
  'dropCursor',
  'gapcursor',
  'paragraph',
  'history',
  'code',
  'codeBlock'
]

export default function MessageInput({ channel, group, user }) {
  const { t } = useTranslation()
  const placeholder = useMessagePlaceholder({ channel, group, user })
  const [startTyping, typingNames] = useTyping({ channel, group, user })
  const [files, setFiles] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [sendMessage] = useCreateMessageMutation()

  const editor = useEditor({
    extensions: [
      ...defaultExtensions().filter(extension =>
        exts.includes(extension.config.name)
      ),
      Link,
      Placeholder.configure({
        placeholder: `${t('message.message')} ${placeholder}`
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-dark focus:outline-none max-w-none'
      }
    }
  })

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
    editor?.commands?.clearContent()
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

          <div
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const text = editor.getHTML()
                if (text && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage({
                    variables: { input: { text, ...variables } }
                  })
                  editor.commands.clearContent()
                } else if (!text) {
                  e.preventDefault()
                  console.log('a')
                }
              }
            }}
            className="px-14 min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light py-3 w-full dark:bg-gray-700 rounded-lg text-base focus:outline-none text-secondary border-none"
          >
            <EditorContent editor={editor} />
          </div>
        </div>

        <div
          className="h-6 flex items-center text-secondary text-xs"
          dangerouslySetInnerHTML={{ __html: typingNames }}
        />
      </div>
    </>
  )
}
