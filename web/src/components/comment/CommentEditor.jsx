import { useState } from 'react'
import ctl from '@netlify/classnames-template-literals'
import Editor from '@/components/ui/editor/Editor'
import { useMutation } from 'urql'
import { CREATE_COMMENT } from '@/graphql/mutations'
import { IconSpinner } from '@/components/ui/icons/Icons'
import { useTranslation } from 'react-i18next'

const commentBtnClass = ctl(`
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

export default function CommentEditor({ postId, parentCommentId, setOpen }) {
  const [text, setText] = useState('')
  const [{ fetching }, createComment] = useMutation(CREATE_COMMENT)
  const { t } = useTranslation()

  return (
    <div className="max-w-screen-md w-full">
      <Editor text={text} setText={setText} />
      <div className="flex justify-end space-x-3 items-center pt-3">
        <button
          className={cancelBtnClass}
          onClick={() => {
            setOpen(false)
            setText('')
          }}
        >
          {t('comment.create.cancel')}
        </button>
        <button
          className={commentBtnClass}
          disabled={!text || fetching}
          onClick={() => {
            createComment({ postId, text, parentCommentId }).then(() => {
              setOpen(false)
              setText('')
            })
          }}
        >
          {t('comment.create.submit')}
          {fetching && <IconSpinner className="w-5 h-5 text-primary ml-3" />}
        </button>
      </div>
    </div>
  )
}
