import { CurrentUserInfo } from '@/components/user/CurrentUserInfo'

export default function Sidebar({ children, right = false, show = true }) {
  return (
    <div
      className={`${
        show ? 'flex' : 'hidden'
      } fixed bottom-0 w-60 bg-gray-200 dark:bg-gray-800 ${
        right ? 'right-0 top-12' : 'top-0 left-18 pb-12 rounded-tl-lg'
      }`}
    >
      <div className="relative h-full w-full scrollbar-dark">{children}</div>
      {!right && <CurrentUserInfo />}
    </div>
  )
}
