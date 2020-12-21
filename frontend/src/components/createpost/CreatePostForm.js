// @refresh reset
import { useForm } from 'react-hook-form'
import React, { useMemo, useState } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { FiImage, FiLink, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import NavLink from '@/components/NavLink'
import { useSubmitPostMutation } from '@/lib/mutations/postMutations'
import { serialize } from '@/lib/serializeHtml'

const error = 'tip text-red-400 mb-2'

const imageBtn =
  'rounded-full h-8 px-6 label inline-flex items-center justify-center bg-black bg-opacity-25 border border-gray-500 text-blue-500 cursor-pointer transition transform hover:scale-105'

const postBtn =
  'disabled:opacity-50 rounded-full h-8 px-6 label inline-flex items-center justify-center bg-blue-600 cursor-pointer transition transform hover:scale-105 focus:outline-none'

export default function CreatePostForm() {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    formState,
    setValue
  } = useForm({
    mode: 'onChange'
  })

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ]
  const [textContent, setTextContent] = useState(initialValue)

  let images = Array.from(watch('images') || [])

  const previews = () =>
    images.map(image => (image ? URL.createObjectURL(image) : null))

  const { query, push } = useRouter()
  const currentUser = useCurrentUser().data

  const destination = query.planetname
    ? `+${query.planetname}`
    : `@${currentUser.username}`

  const link = watch('link')

  const submitPostMutation = useSubmitPostMutation()

  const onSubmit = async ({ title, link }) => {
    const variables = {}
    if (title) variables.title = title
    if (link) variables.link = link

    if (textContent !== initialValue) {
      const html = serialize({ children: textContent })
      if (html && html !== `<p></p>`) variables.textContent = html
    }

    if (images && images.length > 0) variables.images = images
    if (query.planetname) variables.planetName = query.planetname
    const { relativeUrl } = await submitPostMutation.mutateAsync(variables)
    await push(relativeUrl)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 md:rounded-2xl bg-white dark:bg-gray-800 space-y-4"
    >
      <div className="label text-tertiary">
        Posting to <span className="text-accent">{destination}</span>
      </div>

      <div className="header-2 text-secondary pb-2">Create Post</div>

      <div>
        <div className={error}>
          {errors.title?.type === 'required' && 'Title is required'}
          {errors.title?.type === 'maxLength' &&
            'Title must be no longer than 300 characters'}
        </div>
        <textarea
          name="title"
          ref={register({
            maxLength: 300
          })}
          placeholder="Share something..."
          className="block border-none h-20 focus:ring-0 resize-none bg-gray-200 dark:bg-gray-900 rounded placeholder-white placeholder-opacity-33 px-3 w-full focus:outline-none"
        />
      </div>

      <div>
        <div className={error}>
          {errors.link?.type === 'validate' && 'Invalid URL'}
          {errors.link?.type === 'maxLength' &&
            'Link must be no longer than 5000 characters'}
        </div>

        <div className="relative h-12">
          <div className="h-12 w-12 absolute left-0 top-0 bottom-0 inline-flex items-center justify-center">
            <FiLink
              size={18}
              className={`${
                link ? 'text-accent opacity-100' : 'text-primary opacity-33'
              }`}
            />
          </div>
          <input
            name="link"
            ref={register({
              maxLength: 5000,
              validate: url => {
                if (!url) return true
                try {
                  new URL(url)
                  return true
                } catch {
                  return false
                }
              }
            })}
            placeholder="Link URL"
            className="block body text-accent bg-gray-200 dark:bg-gray-900 h-full rounded placeholder-white placeholder-opacity-33 px-12 w-full focus:outline-none"
          />
        </div>
      </div>

      <Editor value={textContent} setValue={setTextContent} />
      <div>
        <div className={error}>
          {errors.images?.type === 'size' && 'Max image size is 16 Mb'}
          {errors.images?.type === 'count' &&
            'Cannot upload more than 20 images'}
        </div>

        <div className="flex">
          {images.length === 0 ? (
            <label htmlFor="images" className={imageBtn}>
              <FiImage size={20} className="mr-3" />
              Upload Images
            </label>
          ) : (
            <div onClick={() => setValue('images', null)} className={imageBtn}>
              <FiX size={20} className="mr-3" />
              Remove Images
            </div>
          )}

          <input
            id="images"
            className="hidden"
            name="images"
            type="file"
            multiple
            accept="image/png, image/jpeg, image/gif"
            ref={register({
              validate: {
                size: images => {
                  images = Array.from(images || [])
                  return (
                    images.filter(i => i.size > 1024 * 1024 * 16).length === 0
                  )
                },
                count: images => {
                  images = Array.from(images || [])
                  return images.length <= 20
                }
              }
            })}
          />

          <button
            type="submit"
            disabled={!formState.isValid}
            className={`ml-auto ${postBtn}`}
          >
            Post
          </button>
        </div>

        <div className="tip text-tertiary mt-4 text-right">
          Read the{' '}
          <NavLink
            href="/about/content"
            className="text-accent cursor-pointer hover:underline"
          >
            Content Policy
          </NavLink>{' '}
          before posting
        </div>
      </div>
      {previews().map((preview, index) => (
        <div key={index} className="aspect-w-16 aspect-h-9 w-full">
          <img
            key={index}
            src={preview}
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
      ))}
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
        placeholder="Details"
        className="dark:bg-gray-900 p-3 rounded prose prose-sm dark:prose-dark h-24 min-w-full overflow-y-auto"
      />
    </Slate>
  )
}
