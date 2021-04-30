import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconUpload } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import MessageDropZone from '@/components/message/input/MessageDropZone'
import MessageUploadDialog from '@/components/message/input/MessageUploadDialog'
import { useTyping } from '@/components/message/input/useTyping'
import { useMessagePlaceholder } from '@/components/message/input/useMessagePlaceholder'
import {
  MessagesDocument,
  useCreateMessageMutation,
  useServerUsersQuery
} from '@/graphql/hooks'
import {
  EditorContent,
  useEditor,
  ReactRenderer,
  Extension
} from '@tiptap/react'
import { defaultExtensions } from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Mention from '@tiptap/extension-mention'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import tippy from 'tippy.js/headless'
import { MentionList } from '@/components/message/input/MentionList'

const exts = [
  'doc',
  'text',
  'dropCursor',
  'gapcursor',
  'paragraph',
  'history',
  'code',
  'codeBlock',
  'hardBreak'
]

export default function MessageInput({
  channel,
  group,
  user,
  users,
  serverUsers
}) {
  const { t } = useTranslation()
  const placeholder = useMessagePlaceholder({ channel, group, user })
  const [startTyping, typingNames] = useTyping({ channel, group, user })
  const [files, setFiles] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)

  const [createMessage] = useCreateMessageMutation({
    update(cache, { data: { createMessage } }) {
      const messageChannelId = channel?.id
      const messageGroupId = group?.id
      const messageUserId = user?.id
      const queryOptions = {
        query: MessagesDocument,
        variables: {
          userId: messageUserId,
          groupId: messageGroupId,
          channelId: messageChannelId,
          cursor: null
        }
      }
      const queryData = cache.readQuery(queryOptions)
      if (
        queryData &&
        !queryData.messages.messages.map(m => m.id).includes(createMessage.id)
      ) {
        cache.writeQuery({
          ...queryOptions,
          data: {
            messages: {
              ...queryData.messages,
              messages: [...queryData.messages.messages, createMessage]
            }
          }
        })
      }
    }
  })

  const computedServerUsers = useMemo(() => {
    if (serverUsers) return serverUsers
    else return users.map(user => ({ user, name: user.name }))
  }, [serverUsers, users])

  const editor = useEditor({
    autofocus: true,
    extensions: [
      ...defaultExtensions().filter(extension =>
        exts.includes(extension.config.name)
      ),
      Link,
      Placeholder.configure({
        placeholder: `${t('message.message')} ${placeholder}`
      }),
      Extension.create({
        addCommands() {
          return {
            getState: () => ({ state }) => state
          }
        },
        addKeyboardShortcuts() {
          return {
            Enter: ({ editor }) => {
              const text = editor.getHTML()
              if (text !== '<p></p>') {
                createMessage({
                  variables: { input: { text, ...variables } }
                })
                editor.commands.clearContent()
                return true
              }
              return false
            }
          }
        }
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention'
        },
        suggestion: {
          allowSpaces: true,
          items: query => {
            return computedServerUsers
              .filter(
                su =>
                  su.name.toLowerCase().startsWith(query.toLowerCase()) ||
                  su.user.username.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 5)
          },
          render: () => {
            let reactRenderer
            let popup

            return {
              onStart: props => {
                reactRenderer = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor
                })

                popup = tippy('body', {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'top-start',
                  render(instance) {
                    // The recommended structure is to use the popper as an outer wrapper
                    // element, with an inner `box` element
                    const popper = document.createElement('div')
                    const box = document.createElement('div')

                    popper.appendChild(box)

                    box.innerHTML = ''
                    box.appendChild(instance.props.content)

                    function onUpdate(prevProps, nextProps) {
                      // DOM diffing
                      if (prevProps.content !== nextProps.content) {
                        box.innerHTML = ''
                        box.appendChild(nextProps.content)
                      }
                    }

                    // Return an object with two properties:
                    // - `popper` (the root popper element)
                    // - `onUpdate` callback whenever .setProps() or .setContent() is called
                    return {
                      popper,
                      onUpdate // optional
                    }
                  }
                })
              },
              onUpdate(props) {
                reactRenderer.updateProps(props)

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect
                })
              },
              onKeyDown(props) {
                return reactRenderer.ref?.onKeyDown(props)
              },
              onExit() {
                popup[0].destroy()
                reactRenderer.destroy()
              }
            }
          }
        }
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
        createMessage={createMessage}
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

          <div className="px-14 min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light py-3 w-full dark:bg-gray-700 rounded-lg text-base focus:outline-none text-secondary border-none">
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
