import { useState } from 'react'
import ctl from '@netlify/classnames-template-literals'
import Editor from '@/components/ui/editor/Editor'
import {
  IconFormatImage,
  IconLinkChain,
  IconPlus,
  IconSpinner,
  IconText,
  IconX
} from '@/components/ui/icons/Icons'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCreatePostMutation, useGetLinkMetaQuery } from '@/graphql/hooks'
import Dialog from '@/components/ui/dialog/Dialog'
import { useForm } from 'react-hook-form'
import ServerSelect from '@/components/post/create/ServerSelect'
import PostEmbed from '@/components/post/PostEmbed'
import ContentEditable from '@/components/ui/editor/ContentEditable'
import isURL from 'validator/es/lib/isURL'
import { useDebounce } from 'react-use'
import { canEmbed } from '@/components/ui/CustomEmbed'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

const labelClass = ctl(`
  block
  text-11
  pb-1.5
  font-semibold
  tracking-widest
  uppercase
  text-tertiary
`)

const postBtnClass = ctl(`
  text-base
  text-primary
  disabled:opacity-50
  bg-green-600
  rounded
  px-5
  h-9
  flex
  items-center
  disabled:cursor-not-allowed
  focus:outline-none
  select-none
`)

const cancelBtnClass = ctl(`
  text-base
  text-tertiary
  focus:outline-none
  px-2
  h-9
  flex
  items-center
  select-none
`)

const tabClass = active =>
  ctl(`
  px-5
  h-12
  border-b-2
  dark:hover:bg-gray-775
  hover:bg-gray-200
  ${
    active
      ? 'dark:border-gray-100 text-primary dark:bg-gray-775 bg-gray-200'
      : 'border-transparent text-tertiary'
  }
  flex
  items-center
  justify-center
  select-none
  cursor-pointer
  text-sm
  last:rounded-tr-xl
`)

const titleClass = ctl(`
  px-4
  h-10
  placeholder-tertiary
  dark:bg-gray-750
  bg-gray-100
  rounded
  text-sm
  text-primary
  w-full
  focus:outline-none
`)

const Tab = {
  Text: 'Text',
  Link: 'Link',
  Image: 'Image'
}

export default function CreatePostDialog({ open, setOpen, serverId }) {
  const [text, setText] = useState('')
  const [createPost, { loading }] = useCreatePostMutation()
  const { t } = useTranslation()
  const { push } = useHistory()
  const [currentUser] = useCurrentUser()
  const servers = currentUser?.servers ?? []
  const [server, setServer] = useState(
    serverId ? servers?.find(s => s.id === serverId) : null
  )
  const [currentTab, setCurrentTab] = useState(Tab.Text)
  const { register, handleSubmit, reset, formState, watch, setValue, trigger } =
    useForm({ mode: 'onChange' })
  const linkUrl = watch('linkUrl')
  const [debouncedLinkUrl, setDebouncedLinkUrl] = useState('')
  useDebounce(
    () => {
      setDebouncedLinkUrl(linkUrl)
    },
    500,
    [linkUrl]
  )
  const title = watch('title')
  const { data: linkMetaData, loading: loadingMeta } = useGetLinkMetaQuery({
    variables: {
      linkUrl: debouncedLinkUrl
    },
    skip: !debouncedLinkUrl || !isURL(debouncedLinkUrl)
  })
  const linkMeta = linkMetaData?.getLinkMeta

  const [images, setImages] = useState([])
  function readFileAsDataURL(file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader()

      fr.onload = function () {
        resolve(fr.result)
      }

      fr.onerror = function () {
        reject(fr)
      }

      fr.readAsDataURL(file)
    })
  }

  const onChangeImages = e => {
    const files = e.target.files
    if (files && files.length > 0) {
      setImages(
        Array.from(files).map(file => ({ file, caption: '', linkUrl: '' }))
      )
      let readers = []
      for (let i = 0; i < files.length; i++) {
        readers.push(readFileAsDataURL(files[i]))
      }
      Promise.all(readers).then(values =>
        setImages(
          values.map((data, i) => ({
            file: files[i],
            caption: '',
            linkUrl: '',
            data
          }))
        )
      )
    }
  }
  const onAddImages = e => {
    const files = e.target.files
    if (files && files.length > 0) {
      setImages([
        ...images,
        ...Array.from(files).map(file => ({ file, caption: '', linkUrl: '' }))
      ])
      let readers = []
      for (let i = 0; i < files.length; i++) {
        readers.push(readFileAsDataURL(files[i]))
      }
      Promise.all(readers).then(values => {
        setImages([
          ...images,
          ...values.map((data, i) => ({
            file: files[i],
            caption: '',
            linkUrl: '',
            data
          }))
        ])
      })
    }
  }
  const [selectedImage, setSelectedImage] = useState(0)

  const close = () => {
    setOpen(false)
    setTimeout(() => {
      setSelectedImage(0)
      setImages([])
      setCurrentTab(Tab.Text)
      reset()
    }, 300)
  }

  const onSubmit = ({ title, linkUrl }) => {
    createPost({
      variables: {
        input: {
          title,
          text: text && currentTab === Tab.Text ? text : null,
          linkUrl: linkUrl && currentTab === Tab.Link ? linkUrl : null,
          serverId: server.id,
          images:
            images && images.length > 0 && currentTab === Tab.Image
              ? images.map(({ file, caption, linkUrl }) => ({
                  file,
                  caption,
                  linkUrl
                }))
              : null
        }
      }
    }).then(({ data }) => {
      const post = data?.createPost
      if (!post) return
      setOpen(false)
      reset()
      push(post.relativeUrl)
    })
  }

  return (
    <Dialog isOpen={open} close={close}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-md w-full dark:bg-gray-800 bg-white text-left rounded-xl"
      >
        <div className="grid grid-cols-4">
          <ServerSelect
            servers={servers}
            server={server}
            setServer={setServer}
          />
          <div
            className={tabClass(currentTab === Tab.Text)}
            onClick={() => {
              setCurrentTab(Tab.Text)
              setValue('linkUrl', '')
              setImages([])
            }}
          >
            <IconText className="mr-2 w-5 h-5" />
            Text
          </div>
          <div
            className={tabClass(currentTab === Tab.Link)}
            onClick={() => {
              setCurrentTab(Tab.Link)
              setText('')
              setImages([])
            }}
          >
            <IconLinkChain className="mr-2 w-5 h-5" />
            Link
          </div>
          <div
            className={tabClass(currentTab === Tab.Image)}
            onClick={() => {
              setCurrentTab(Tab.Image)
              setValue('linkUrl', '')
              trigger('linkUrl')
              setText('')
            }}
          >
            <IconFormatImage className="mr-2 w-5 h-5" />
            Images
          </div>
        </div>

        <div className="p-5">
          <div className="relative">
            <label htmlFor="title" className={labelClass}>
              Title
              {title?.length > 0 && ` (${title?.length}/300)`}
            </label>
            <input
              maxLength={300}
              className={titleClass}
              {...register('title', {
                required: true
              })}
              id="title"
            />
          </div>

          {currentTab === Tab.Text && (
            <div className="pt-5">
              <Editor text={text} setText={setText} />
            </div>
          )}

          {currentTab === Tab.Link && (
            <>
              <div className="pb-5 pt-1.5">
                {linkMeta?.title && title !== linkMeta?.title && (
                  <span
                    className="text-xs text-blue-500 hover:underline cursor-pointer line-clamp-1"
                    onClick={() => {
                      setValue('title', linkMeta?.title)
                      trigger('title')
                    }}
                  >
                    {linkMeta?.title}
                  </span>
                )}
              </div>

              <label
                htmlFor="linkUrl"
                className="block text-11 pb-1.5 font-semibold tracking-widest uppercase text-tertiary"
              >
                Link URL
              </label>
              <div className="relative h-10">
                <IconLinkChain
                  className={`top-1/2 left-2.5 transform -translate-y-1/2 absolute w-5 h-5 text-mid`}
                />

                <input
                  maxLength={2000}
                  className="px-10 h-10 dark:bg-gray-750 bg-gray-100 rounded text-sm text-primary w-full focus:outline-none"
                  {...register('linkUrl', {
                    validate: url => !url || isURL(url)
                  })}
                  id="linkUrl"
                />

                {loadingMeta && (
                  <div className="top-1/2 right-2.5 transform -translate-y-1/2 absolute">
                    <IconSpinner />
                  </div>
                )}
              </div>

              {linkUrl && !isURL(linkUrl) && (
                <div className="text-13 text-red-400 pt-1">
                  Must be a valid URL
                </div>
              )}

              {debouncedLinkUrl && isURL(debouncedLinkUrl) && !!linkMeta && (
                <div className="mt-5">
                  <PostEmbed dark metadata={linkMeta} />
                </div>
              )}
            </>
          )}

          {currentTab === Tab.Image && (
            <div className="mt-5">
              {images && images.length > 0 ? (
                <div>
                  <div className="flex">
                    <div className="flex scrollbar-custom items-center space-x-3 overflow-x-auto border dark:border-gray-700 rounded-md h-31 px-3 max-w-full w-full">
                      {images.map((image, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`cursor-pointer group relative rounded border ${
                            selectedImage === i
                              ? 'dark:border-gray-500'
                              : 'dark:border-transparent'
                          }`}
                        >
                          <div
                            className={`max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] transform ${
                              selectedImage === i ? 'scale-85' : ''
                            }`}
                          >
                            <div
                              className="absolute top-1 right-1 rounded-full bg-black p-0.5 hidden group-hover:block z-10"
                              onClick={() => {
                                if (selectedImage >= i && selectedImage > 0) {
                                  setImmediate(() =>
                                    setSelectedImage(selectedImage - 1)
                                  )
                                }
                                const newImages = images.slice()
                                newImages.splice(i, 1)
                                setImages(newImages)
                              }}
                            >
                              <IconX className="w-4.5 h-4.5 text-white" />
                            </div>
                            <div className="absolute inset-0 bg-black rounded bg-opacity-0 group-hover:bg-opacity-50" />
                            <div
                              style={{ backgroundImage: `url(${image.data})` }}
                              className={`max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] bg-cover bg-center select-none rounded`}
                            />
                          </div>
                        </div>
                      ))}

                      <div className="w-25 h-25 rounded relative flex items-center justify-center border dark:border-gray-700 border-dashed cursor-pointer transition dark:hover:bg-gray-775">
                        <input
                          type="file"
                          id="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          hidden
                          multiple
                          onChange={onAddImages}
                        />
                        <label
                          htmlFor="file"
                          className="absolute inset-0 block cursor-pointer"
                        />
                        <IconPlus className="w-1/2 h-1/2 text-tertiary" />
                      </div>
                    </div>
                  </div>

                  {images && images?.length > 0 && (
                    <div className="mt-5 flex space-x-5">
                      <div
                        className="w-81 h-81 bg-contain bg-center bg-no-repeat dark:bg-gray-775 flex-shrink-0"
                        style={{
                          backgroundImage: `url(${images[selectedImage]?.data})`
                        }}
                      />

                      <div className="space-y-5 max-w-full flex-grow">
                        <div>
                          <label htmlFor="caption" className={labelClass}>
                            Caption
                            {images[selectedImage]?.caption?.length > 0 &&
                              ` (${images[selectedImage]?.caption?.length}/180)`}
                          </label>
                          <ContentEditable
                            id="caption"
                            className={`px-4 py-2.5 min-h-[2.5rem] dark:bg-gray-750 bg-gray-100 rounded text-sm text-primary focus:outline-none break-word`}
                            html={images[selectedImage]?.caption || ''}
                            onChange={e => {
                              if (
                                images[selectedImage]?.caption?.length >= 180
                              ) {
                                return
                              }
                              const temp = images.slice()
                              let val = e.target.value
                              if (val.length > 180) {
                                val = val.substring(0, 181)
                              }
                              temp[selectedImage].caption = val
                              setImages(temp)
                            }}
                          />
                        </div>

                        <div>
                          <label htmlFor="link" className={labelClass}>
                            Link
                          </label>
                          <input
                            id="link"
                            className={titleClass}
                            value={images[selectedImage]?.linkUrl || ''}
                            onChange={e => {
                              const temp = images.slice()
                              temp[selectedImage].linkUrl = e.target.value
                              setImages(temp)
                            }}
                          />
                          {images[selectedImage]?.linkUrl &&
                            !isURL(images[selectedImage]?.linkUrl) && (
                              <div className="text-13 text-red-400 pt-1">
                                Must be a valid URL
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    id="files"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    hidden
                    multiple
                    onChange={onChangeImages}
                  />
                  <label
                    htmlFor="files"
                    className="select-none cursor-pointer flex items-center justify-center text-base text-tertiary h-30 border border-dashed dark:border-gray-700 rounded-md transition dark:hover:bg-gray-775"
                  >
                    Drag 'n' drop some images here, or click to select images
                  </label>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center pt-5">
            <div className="ml-auto flex items-center space-x-3">
              <button
                type="button"
                className={cancelBtnClass}
                onClick={() => close()}
              >
                {t('post.create.cancel')}
              </button>
              <button
                type="submit"
                className={postBtnClass}
                disabled={!formState.isValid || !server || loading}
              >
                {t('post.create.submit')}
                {loading && (
                  <IconSpinner className="w-5 h-5 text-primary ml-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  )
}
