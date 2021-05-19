import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconUpload } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import MessageDropZone from '@/components/message/input/MessageDropZone'
import MessageUploadDialog from '@/components/message/input/MessageUploadDialog'
import { useTyping } from '@/components/message/input/useTyping'
import {
  ChannelType,
  MessagesDocument,
  RelationshipStatus,
  ServerPermission,
  useCreateMessageMutation
} from '@/graphql/hooks'
import {
  EditorContent,
  useEditor,
  ReactRenderer,
  Extension
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Mention } from '@/components/ui/editor/Mention'
import tippy from 'tippy.js/headless'
import { MentionList } from '@/components/message/input/MentionList'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useOpenLogin } from '@/hooks/useLoginDialog'

export default function MessageInput({ channel, server, group, user, users }) {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const isBlocked =
    !!user && user.relationshipStatus === RelationshipStatus.Blocked
  const isBlocking =
    !!user && user.relationshipStatus === RelationshipStatus.Blocking
  const [canUseRestrictedChannel, canUsePrivateChannel] =
    useHasServerPermissions({
      server,
      permissions: [
        ServerPermission.RestrictedChannels,
        ServerPermission.PrivateChannels
      ]
    })
  const canUseChannel =
    !!channel &&
    (channel.type === ChannelType.Public ||
      (channel.type === ChannelType.Restricted && canUseRestrictedChannel) ||
      (channel.type === ChannelType.Private && canUsePrivateChannel))
  const canMessageUser = !!user && !isBlocked && !isBlocking
  const canSendMessage =
    !!currentUser &&
    ((!!user && canMessageUser) || (!!channel && canUseChannel) || !!group)

  const placeholder = useMemo(() => {
    if (!currentUser) return `Must log in to send messages`
    if (channel) {
      if (!canUseChannel)
        return `You do not have permission to send messages in this channel`
      return `Message #${channel.name}`
    } else if (group) return `Message ${group.name}`
    else if (user) {
      if (isBlocked) return `This user has blocked you`
      if (isBlocking) return `You are blocking this user`
      return `Message @${user.name}`
    }
    return ``
  }, [currentUser, channel, group, user, canUseChannel, isBlocked, isBlocking])

  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        heading: false
      }),
      Link,
      Placeholder.configure({
        placeholder: `${placeholder}`,
        showOnlyWhenEditable: false
      }),
      Extension.create({
        addKeyboardShortcuts() {
          return {
            Enter: ({ editor }) => {
              let text = editor.getHTML()
              const isEmpty = editor.state.doc.textContent.length === 0
              if (!isEmpty) {
                const pRegex = /^<p>|<\/p>$/gi
                const brRegex =
                  /^\s*(?:<br\s*\/?\s*>)+|(?:<br\s*\/?\s*>)+\s*$/gi
                text = text.replace(pRegex, '')
                text = text.replace(brRegex, '')
                createMessage({
                  variables: { input: { text, ...variables } }
                })
                editor.commands.clearContent()
              }
              return true
            }
          }
        }
      }),
      Mention.configure({
        suggestion: {
          allowSpaces: true,
          render: () => {
            let reactRenderer
            let popup

            return {
              onStart: props => {
                reactRenderer = new ReactRenderer(MentionList, {
                  props: {
                    ...props,
                    users: ['@everyone'].concat(users)
                  },
                  editor: props.editor
                })

                popup = tippy('body', {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
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
    },
    editable: canSendMessage
  })

  const [startTyping, typingNames] = useTyping({
    channel,
    group,
    user,
    users
  })
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

  const variables = {
    channelId: channel?.id,
    groupId: group?.id,
    userId: user?.id
  }

  const openLogin = useOpenLogin()

  const pasteListener = useCallback(
    e => {
      const files = e.clipboardData.files
      if (files && files.length > 0) {
        setFiles(files)
        e.preventDefault()
      } else {
        const text = e.clipboardData.getData('text')
        if (text) {
          editor?.commands.focus()
        }
      }
    },
    [editor]
  )

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
    setTimeout(() => editor?.commands?.clearContent())
  }, [user, group, channel])

  return (
    <>
      {!!currentUser && (
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
        </>
      )}

      <div
        className="px-4 dark:bg-gray-750 relative"
        onKeyPress={() => {
          if (currentUser) {
            startTyping()
          }
        }}
      >
        <div className="relative">
          {!!currentUser && (
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
          )}

          <div
            onClick={() => {
              if (!currentUser) openLogin()
            }}
            className={`${
              canSendMessage ? 'px-14 ' : 'px-4 cursor-pointer opacity-50'
            } min-h-[3rem] max-h-[20rem] overflow-y-auto scrollbar-light dark:bg-gray-700 py-3 w-full  rounded-lg text-base focus:outline-none text-secondary border-none`}
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
