import { FiImage, FiLink, FiX } from 'react-icons/fi'
import {
  HiGlobeAlt,
  HiOutlineGlobeAlt,
  HiPhotograph,
  HiPlusCircle,
  HiUpload
} from 'react-icons/hi'
import { BiText } from 'react-icons/bi'
import React, { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import { useForm } from 'react-hook-form'
import { useSubmitPostMutation } from '@comet/coremutations/postMutations'
import toast from 'react-hot-toast'
// import Editor from '@/components/editor/Editor'
import Spinner from '@/components/ui/Spinner'
import PlanetsSelect from '@/components/ui/PlanetsSelect'
import { useHistory, useParams } from 'react-router-dom'

const error = 'tip text-red-400 mb-2'

const imageBtn =
  'text-sm font-medium inline-flex items-center text-secondary rounded-md dark:bg-gray-650 px-3 h-10 cursor-pointer' +
  ' select-none hover:shadow-md dark:hover transition'

const postBtn =
  'text-sm font-medium inline-flex items-center text-primary rounded-md dark:bg-blue-600 px-3 h-10' +
  ' cursor-pointer' +
  ' select-none hover:shadow-md dark:hover transition'

const textField =
  'block p-0 border-none bg-transparent focus:ring-0 resize-none placeholder-tertiary w-full focus:outline-none'

export default function CreatePostDialog({ activator }) {
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

  const [textContent, setTextContent] = useState('')

  const images = Array.from(watch('images') || [])

  const previews = images.map(image =>
    image ? URL.createObjectURL(image) : null
  )

  const { push } = useHistory()

  const params = useParams()

  const link = watch('link')
  const title = watch('title')

  let setO

  const submitPostMutation = useSubmitPostMutation({
    onSuccess: ({ relativeUrl }) => {
      setO(false)
      push(relativeUrl)
    },
    onError: error => toast.error(error.response.errors[0].message)
  })

  const onSubmit = async ({ title, link }) => {
    const variables = {}
    if (title) variables.title = title
    if (link) variables.link = link
    if (textContent) variables.textContent = textContent

    if (images && images.length > 0) variables.images = images
    if (params.planetName) variables.planetName = params.planetName
    submitPostMutation.mutate(variables)
  }

  const validUrl = url => {
    if (!url) return true
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <Dialog activator={activator}>
      {({ setOpen }) => {
        setO = setOpen

        return (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 lg:rounded-lg bg-white dark:bg-gray-750 space-y-5 border dark:border-gray-850"
          >
            <div>
              {errors.title && (
                <div className={error}>
                  {errors.title?.type === 'required' && 'Title is required'}
                  {errors.title?.type === 'maxLength' &&
                    'Title must be no longer than 300 characters'}
                </div>
              )}

              <div className="flex items-center space-x-3">
                <BiText className="text-tertiary w-6 h-6" />
                <input
                  type="text"
                  name="title"
                  ref={register({
                    maxLength: 300
                  })}
                  placeholder="Title"
                  className={`${textField} text-xl font-semibold`}
                />
              </div>
            </div>

            <div>
              {errors.link && (
                <div className={error}>
                  {errors.link?.type === 'validate' && 'Invalid URL'}
                  {errors.link?.type === 'maxLength' &&
                    'Link must be no longer than 5000 characters'}
                </div>
              )}

              <div className="flex items-center space-x-3">
                <HiOutlineGlobeAlt className="w-6 h-6 text-tertiary" />
                <input
                  name="link"
                  ref={register({
                    maxLength: 5000,
                    validate: url => validUrl(url)
                  })}
                  placeholder="Link URL"
                  className={`${textField} font-medium text-secondary`}
                />
              </div>
            </div>

            {/*<Editor value={textContent} setValue={setTextContent} />*/}
            <div>
              <div className={error}>
                {errors.images?.type === 'size' && 'Max image size is 16 Mb'}
                {errors.images?.type === 'count' &&
                  'Cannot upload more than 10 images'}
              </div>

              <div className="flex">
                {images.length === 0 ? (
                  <label htmlFor="images" className={imageBtn}>
                    <HiPhotograph size={20} className="mr-3" />
                    Upload Images
                  </label>
                ) : (
                  <div
                    onClick={() => setValue('images', null)}
                    className={imageBtn}
                  >
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
                          images.filter(i => i.size > 1024 * 1024 * 16)
                            .length === 0
                        )
                      },
                      count: images => {
                        images = Array.from(images || [])
                        return images.length <= 10
                      }
                    }
                  })}
                />

                <button
                  type="submit"
                  disabled={
                    submitPostMutation.isLoading ||
                    (!textContent &&
                      (!link || (link && !validUrl(link))) &&
                      !title &&
                      (!images || images.length === 0))
                  }
                  className={`ml-auto ${postBtn}`}
                >
                  {submitPostMutation.isLoading ? (
                    <div className="mr-3">
                      <Spinner />
                    </div>
                  ) : (
                    <HiUpload className="w-5 h-5 mr-3" />
                  )}
                  Post
                </button>
              </div>

              <div className="mt-4 h-64">
                <PlanetsSelect />
              </div>

              {/*<div className="tip text-tertiary mt-4 text-right">
                Read the{' '}
                <a
                  to="https://github.com/cometx-io/about/blob/master/CONTENT.md"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-accent cursor-pointer hover:underline"
                >
                  Content Policy
                </a>{' '}
                before posting
              </div>*/}
            </div>
            {previews && previews.length > 0 && (
              <div className="space-y-4 flex flex-col items-center">
                {previews.map((preview, index) => (
                  <img key={index} src={preview} className="rounded-2xl" />
                ))}
              </div>
            )}
          </form>
        )
      }}
    </Dialog>
  )
}
