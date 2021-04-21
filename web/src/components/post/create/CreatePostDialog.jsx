import { useState } from 'react'
import ctl from '@netlify/classnames-template-literals'
import Editor from '@/components/ui/editor/Editor'
import {
  IconFormatImage,
  IconLinkChain,
  IconLinkWeb,
  IconSpinner,
  IconText
} from '@/components/ui/icons/Icons'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ServerPermission, useCreatePostMutation } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import Dialog from '@/components/ui/dialog/Dialog'
import { useForm } from 'react-hook-form'
import ServerSelect from '@/components/post/create/ServerSelect'
import { useJoinedServers } from '@/hooks/graphql/useJoinedServers'
import PostEmbed from '@/components/post/PostEmbed'

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
`)

const cancelBtnClass = ctl(`
  text-base
  text-tertiary
  focus:outline-none
  px-2
  h-9
  flex
  items-center
`)

const tabClass = active =>
  ctl(`
  px-5
  h-12
  border-b-2
  dark:hover:bg-gray-775
  ${
    active
      ? 'dark:border-gray-100 text-primary dark:bg-gray-775'
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

const Tab = {
  Text: 'Text',
  Link: 'Link',
  Image: 'Image'
}

export default function CreatePostDialog({ open, setOpen }) {
  const [text, setText] = useState('')
  const [createPost, { loading }] = useCreatePostMutation()
  const { t } = useTranslation()
  const { push } = useHistory()
  const { serverId } = useParams()
  const servers = useJoinedServers().filter(s =>
    s.permissions.includes(ServerPermission.CreatePost)
  )
  const [server, setServer] = useState(servers?.find(s => s.id === serverId))
  const [currentTab, setCurrentTab] = useState(Tab.Text)
  const { register, handleSubmit, reset, formState, watch } = useForm()
  const linkUrl = watch('linkUrl')

  const onSubmit = ({ title, linkUrl, text }) => {
    createPost({
      variables: {
        input: {
          title,
          text: text ? text : null,
          serverId
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
    <Dialog isOpen={open} close={() => setOpen(false)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-md w-full dark:bg-gray-800 text-left rounded-xl"
      >
        <div className="grid grid-cols-4">
          <ServerSelect
            servers={servers}
            server={server}
            setServer={setServer}
          />
          <div
            className={tabClass(currentTab === Tab.Text)}
            onClick={() => setCurrentTab(Tab.Text)}
          >
            <IconText className="mr-2 w-5 h-5" />
            Text
          </div>
          <div
            className={tabClass(currentTab === Tab.Link)}
            onClick={() => setCurrentTab(Tab.Link)}
          >
            <IconLinkChain className="mr-2 w-5 h-5" />
            Link
          </div>
          <div
            className={tabClass(currentTab === Tab.Image)}
            onClick={() => setCurrentTab(Tab.Image)}
          >
            <IconFormatImage className="mr-2 w-5 h-5" />
            Images
          </div>
        </div>

        <div className="p-5">
          <div className="relative">
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input
              className="px-4 h-10 placeholder-tertiary dark:bg-gray-750 rounded text-sm text-primary w-full focus:outline-none"
              {...register('title')}
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
              <div className="pb-5 pt-0.5">
                <span className="text-xs text-blue-500 hover:underline cursor-pointer">
                  Use 'Example Title'
                </span>
              </div>

              <label
                htmlFor="linkUrl"
                className="block text-11 pb-1.5 font-semibold tracking-widest uppercase text-tertiary"
              >
                Link URL
              </label>
              <div className="relative h-10 mb-5">
                <IconLinkChain
                  className={`top-1/2 left-2.5 transform -translate-y-1/2 absolute w-5 h-5 text-mid`}
                />

                <input
                  className="pl-10 pr-4 h-10 dark:bg-gray-750 rounded text-sm text-primary w-full focus:outline-none"
                  {...register('linkUrl')}
                  id="linkUrl"
                />
              </div>

              <PostEmbed linkUrl={linkUrl} />
            </>
          )}

          <div className="flex items-center pt-5">
            <div className="ml-auto flex items-center space-x-3">
              <button
                type="button"
                className={cancelBtnClass}
                onClick={() => {
                  setOpen(false)
                  setText('')
                }}
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
