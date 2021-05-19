import ctl from '@netlify/classnames-template-literals'
import { useEffect, useMemo } from 'react'
import { useDropZone } from '@/hooks/useDropZone'
import {
  IconFileCode,
  IconFileImage,
  IconFileVideo
} from '@/components/ui/icons/Icons'

const className = show =>
  ctl(`
  fixed
  inset-0
  transition-all
  bg-black
  ${show ? 'visible bg-opacity-75' : 'invisible bg-opacity-0'}
  flex
  items-center
  justify-center
`)

const popupClassName = show =>
  ctl(`
  ${show ? 'scale-100' : 'scale-0'}
  transform
  transition
  bg-gradient-to-br
  from-red-400
  to-indigo-600
  rounded-xl
  p-3
  max-w-sm
  w-full
  relative
`)

export default function MessageDropZone({ channel, user, group, setFiles }) {
  const [files, isDragging] = useDropZone()

  useEffect(() => setFiles(files), [files, setFiles])

  const name = useMemo(() => {
    if (channel) return `#${channel.name}`
    else if (user) return `@${user.username}`
    else if (group) return `${group.displayName}`
  }, [channel, user, group])

  return (
    <>
      <div className={className(isDragging)} style={{ zIndex: 999999 }}>
        <div className={popupClassName(isDragging)}>
          <div
            className={`flex absolute left-1/2 transform top-0 -translate-x-1/2 -translate-y-1/2 transition delay-75 ${
              isDragging ? 'scale-100' : 'scale-0'
            }`}
          >
            <div className="relative transform translate-x-6 translate-y-3 -rotate-12">
              <div
                className="absolute left-5 top-9 w-14 h-14 bg-red-400"
                style={{ zIndex: -1 }}
              />
              <IconFileCode className="w-24 h-24" />
            </div>
            <div className="relative">
              <div
                className="absolute left-5 top-9 w-14 h-14 bg-red-400"
                style={{ zIndex: -1 }}
              />
              <IconFileVideo className="w-24 h-24 " />
            </div>
            <div className="relative transform -translate-x-6 translate-y-3 rotate-12">
              <div
                className="absolute left-5 top-8 w-14 h-14 bg-red-400"
                style={{ zIndex: -1 }}
              />
              <IconFileImage className="w-24 h-24" />
            </div>
          </div>

          <div className="rounded-xl border-dashed border-white border-2 px-4 pb-4 pt-16 text-center">
            <div className="text-xl font-bold text-primary">
              Upload to <span className="text-white">{name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
