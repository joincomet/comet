import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useSubscription } from 'urql'
import { SEND_MESSAGE, START_TYPING } from '@/graphql/mutations'
import { IconSpinner, IconUpload } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import { USER_STARTED_TYPING } from '@/graphql/subscriptions'
import { useCurrentUser } from '@/providers/UserProvider'
import ContentEditable from '@/components/ui/editor/ContentEditable'
import Dialog from '@/components/ui/dialog/Dialog'
import DialogTitle from '@/components/ui/dialog/DialogTitle'
import { useDataUrl } from '@/hooks/useDataUrl'
import ctl from '@netlify/classnames-template-literals'

const cancelBtnClass = ctl(`
  ml-auto
  text-sm
  text-primary
  h-10
  px-7
  hover:underline
  focus:outline-none
  select-none
`)

const uploadBtnClass = ctl(`
  text-sm
  text-primary
  transition
  bg-blue-500
  hover:bg-blue-600
  flex
  items-center
  justify-center
  rounded
  px-7
  h-10
  focus:outline-none
  select-none
  disabled:opacity-50
`)

const TYPING_TIMEOUT = 3000

export default function MessageInput({ channel, group, user }) {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()
  const [typingNames, setTypingNames] = useState(new Set())

  const variables = {
    channelId: channel?.id,
    groupId: group?.id,
    userId: user?.id
  }

  useSubscription(
    {
      query: USER_STARTED_TYPING,
      variables,
      pause: !channel && !group && !user
    },
    (_, { userStartedTyping: username }) => {
      setTypingNames(prev => new Set(prev.add(username)))
      setTimeout(
        () =>
          setTypingNames(
            prev => new Set([...prev].filter(u => u !== username))
          ),
        TYPING_TIMEOUT
      )
    }
  )

  const [_startTypingRes, startTyping] = useMutation(START_TYPING)

  const typingNamesDisplay = useMemo(() => {
    const names = [...typingNames]
      .filter(u => u !== currentUser.username)
      .map(
        u =>
          `<span style="font-weight: 700">
          ${u.split('#')[0]}&nbsp;
        </span>`
      )
    if (names.length === 0) return null
    else if (names.length === 1)
      return t('message.typing.one', { name: names[0] })
    else if (names.length === 2)
      return t('message.typing.two', { name1: names[0], name2: names[1] })
    else if (names.length === 3)
      return t('message.typing.three', {
        name1: names[0],
        name2: names[1],
        name3: names[2]
      })
    else return t('message.typing.several')
  }, [typingNames, currentUser.username])

  const [{ fetching }, sendMessage] = useMutation(SEND_MESSAGE)

  const placeholder = useMemo(() => {
    if (channel) return `#${channel.name}`
    else if (group) return `${group.name}`
    else if (user) return `@${user.name}`
    return ``
  }, [channel, group, user])

  const inputRef = useRef(null)
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)

  const focus = () => inputRef.current?.el?.current?.focus()

  useEffect(() => focus(), [])

  useEffect(() => {
    if (inputRef.current?.el?.current)
      inputRef.current.el.current.dataset.placeholder = `${t(
        'message.message'
      )} ${placeholder}`
  }, [placeholder])

  const keypress = e => {
    focus()
  }

  useEffect(() => {
    document.body.addEventListener('keypress', keypress)
    return () => document.body.removeEventListener('keypress', keypress)
  })

  return (
    <div className="px-4 dark:bg-gray-750">
      <div className="relative">
        <Tippy content={t('message.upload')}>
          <div className="block absolute left-4.5 top-1/2 transform -translate-y-1/2">
            <input className="hidden" id="file" name="file" type="file" />
            <label htmlFor="file" className="text-tertiary highlightable">
              <IconUpload className="w-5 h-5" />
            </label>
          </div>
        </Tippy>

        <UploadDialog
          {...{
            placeholder,
            file,
            setFile,
            text,
            setText,
            sendMessage,
            fetching,
            variables
          }}
        />

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
      </div>

      <div
        className="h-6 flex items-center text-primoary text-xs"
        dangerouslySetInnerHTML={{ __html: typingNamesDisplay }}
      />
    </div>
  )
}

function UploadDialog({
  placeholder,
  file,
  setFile,
  sendMessage,
  fetching,
  variables
}) {
  const [text, setText] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const imgSrc = useDataUrl(file)

  const pasteListener = e => {
    const file = e.clipboardData.files[0]
    if (file) {
      setFile(file)
      setUploadOpen(true)
      e.preventDefault()
    }
  }

  const send = () =>
    sendMessage({ text: text ? text : null, file, ...variables }).then(() =>
      close()
    )

  const enterPressed = e => {
    if (e.key === 'Enter' && !!file) {
      send()
    }
  }

  useEffect(() => {
    document.body.addEventListener('paste', pasteListener)
    document.body.addEventListener('keydown', enterPressed)
    return () => {
      document.body.removeEventListener('paste', pasteListener)
      document.body.removeEventListener('keydown', enterPressed)
    }
  })

  const close = () => {
    setUploadOpen(false)
    setTimeout(() => {
      setFile(null)
      setText(null)
    }, 300)
  }

  return (
    <Dialog close={close} isOpen={uploadOpen}>
      <div className="text-left relative w-full rounded-xl dark:bg-gray-750 max-w-lg mx-auto">
        <div className="absolute left-5 -top-20 flex w-46 h-40">
          <img
            alt=""
            src={imgSrc}
            className="absolute max-w-full max-h-full top-0 left-0 rounded shadow-md object-cover"
          />
        </div>

        <div className="px-5 pt-24 pb-5">
          <DialogTitle className="truncate text-left text-xl text-primary font-semibold select-none">
            {file?.name ?? ''}
          </DialogTitle>

          <div className="text-tertiary text-13 pb-5 pt-0.5 select-none">
            Upload to{' '}
            <span className="font-medium text-secondary">{placeholder}</span>
          </div>

          <label
            htmlFor="comment"
            className="block uppercase text-xs font-medium text-secondary pb-1.5"
          >
            Add a Comment <span className="text-tertiary">(Optional)</span>
          </label>
          <input
            className="h-10 rounded-lg dark:bg-gray-700 w-full focus:outline-none px-4 text-secondary text-base"
            id="comment"
            value={text}
            onChange={e => {
              const val = e.target.value
              setText(val)
            }}
          />
        </div>

        <div className="flex p-4 dark:bg-gray-775 rounded-b-xl">
          <button className={cancelBtnClass} onClick={close}>
            Cancel
          </button>
          <button
            className={uploadBtnClass}
            disabled={!file || fetching}
            onClick={send}
          >
            Upload
            {fetching && (
              <div className="ml-3">
                <IconSpinner />
              </div>
            )}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
