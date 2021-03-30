import { useState } from 'react'
import ctl from '@netlify/classnames-template-literals'
import Editor from '@/components/editor/Editor'
import { useMutation } from 'urql'
import { CREATE_POST } from '@/graphql/mutations'
import { IconSpinner } from '@/lib/Icons'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const postBtnClass = ctl(`
  text-base
  text-primary
  disabled:opacity-50
  dark:disabled:bg-gray-600
  bg-green-600
  rounded
  px-3
  h-8
  flex
  items-center
  disabled:cursor-not-allowed
  focus:outline-none
`)

const cancelBtnClass = ctl(`
  text-base
  text-tertiary
  focus:outline-none
  px-2
  h-8
  flex
  items-center
`)

export default function PostEditor({ setOpen }) {
  const [text, setText] = useState('')
  const [{ fetching }, createPost] = useMutation(CREATE_POST)
  const { t } = useTranslation()
  const { push } = useHistory()
  const { serverId: sId } = useParams()
  const [serverId, setServerId] = useState(sId)
  const [title, setTitle] = useState('')

  return (
    <div className="max-w-screen-md w-full">
      <input
        className="px-4 h-9 placeholder-mid dark:bg-gray-700 rounded text-sm text-primary w-full mb-3 focus:outline-none"
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
      <Editor text={text} setText={setText} />
      <div className="flex justify-end space-x-3 items-center pt-3">
        <button
          className={cancelBtnClass}
          onClick={() => {
            setOpen(false)
            setText('')
          }}
        >
          {t('post.create.cancel')}
        </button>
        <button
          className={postBtnClass}
          disabled={!title || !serverId || fetching}
          onClick={() => {
            createPost({ title, text: text ? text : null, serverId }).then(
              ({ data }) => {
                const post = data?.createPost
                if (!post) return
                setOpen(false)
                setText('')
                setTitle('')
                push(post.relativeUrl)
              }
            )
          }}
        >
          {t('post.create.submit')}
          {fetching && <IconSpinner className="w-5 h-5 text-primary ml-3" />}
        </button>
      </div>
    </div>
  )
}
