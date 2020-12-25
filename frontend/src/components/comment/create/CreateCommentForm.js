// @refresh reset
import React, { useMemo, useState } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'
import NavLink from '@/components/NavLink'
import { serialize } from '@/lib/serializeHtml'
import { useForm } from 'react-hook-form'
import { useSubmitCommentMutation } from '@/lib/mutations/commentMutations'
import { useCommentStore } from '@/lib/stores/useCommentStore'
import { useQueryClient } from 'react-query'
import { useComments } from '@/lib/queries/useComments'

const postBtn =
  'disabled:opacity-50 rounded-full h-8 px-6 label inline-flex items-center justify-center bg-blue-600 cursor-pointer transition transform hover:scale-105 focus:outline-none'

export default function CreateCommentForm({
  post,
  parentComment,
  commentVariables
}) {
  const { setCreateComment } = useCommentStore()

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ]
  const [textContent, setTextContent] = useState(initialValue)

  const submitCommentMutation = useSubmitCommentMutation()

  const valid = () => {
    const html = serialize({ children: textContent })
    if (html && html !== `<p></p>`) return true
    return false
  }

  const { handleSubmit } = useForm()

  const queryClient = useQueryClient()
  const { comments, commentCount } = useComments(commentVariables).data

  const onSubmit = async () => {
    const variables = {
      postId: post.id
    }

    if (parentComment) variables.parentCommentId = parentComment.id

    if (textContent !== initialValue) {
      const html = serialize({ children: textContent })
      if (html && html !== `<p></p>`) variables.textContent = html
    }

    if (!variables.textContent) return

    const comment = await submitCommentMutation.mutateAsync(variables)
    if (parentComment) {
      if (!parentComment.childComments) parentComment.childComments = []
      parentComment.childComments.unshift(comment)
    } else {
      comments.unshift(comment)
      queryClient.setQueryData(['comments', commentVariables], {
        comments,
        commentCount
      })
    }
    setCreateComment(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 md:rounded-2xl bg-white dark:bg-gray-800 space-y-4"
    >
      <div className="label text-tertiary">
        Replying to{' '}
        <span className="text-accent">
          @
          {parentComment ? parentComment.author.username : post.author.username}
        </span>
      </div>

      <div className="header-2 text-secondary pb-2">New Comment</div>

      {parentComment && (
        <div
          dangerouslySetInnerHTML={{ __html: parentComment.textContent }}
          className="prose prose-sm dark:prose-dark p-3 border rounded border-gray-200 dark:border-gray-700 max-h-32 overflow-y-auto min-w-full"
        />
      )}

      <Editor value={textContent} setValue={setTextContent} />

      <div>
        <div className="flex">
          <button
            type="submit"
            disabled={!valid()}
            className={`ml-auto ${postBtn}`}
          >
            Done
          </button>
        </div>

        <div className="tip text-tertiary mt-4 text-right">
          Read the{' '}
          <a
            href="https://github.com/cometx-io/about/blob/master/CONTENT.md"
            rel="noopener noreferrer"
            target="_blank"
            className="text-accent cursor-pointer hover:underline"
          >
            Content Policy
          </a>{' '}
          before commenting
        </div>
      </div>
    </form>
  )
}

function Editor({ value, setValue }) {
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable
        placeholder="Write your comment"
        className="dark:bg-gray-900 p-3 rounded prose prose-sm dark:prose-dark h-32 min-w-full overflow-y-auto"
      />
    </Slate>
  )
}
