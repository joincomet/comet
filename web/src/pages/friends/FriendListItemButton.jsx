import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import ctl from '@netlify/classnames-template-literals'

export const friendListButtonClass = ctl(`
  rounded-full
  dark:bg-gray-800
  dark:group-hover:bg-gray-900
  h-9 w-9
  flex
  items-center
  justify-center
  text-tertiary
`)

export default function FriendListItemButton({ children, label, onClick }) {
  const { t } = useTranslation()

  return (
    <Tippy content={t(label)}>
      <div onClick={onClick} className={friendListButtonClass}>
        {children}
      </div>
    </Tippy>
  )
}
