import Header from '@/components/ui/header/Header'
import { IconAt } from '@/components/ui/icons/Icons'

export default function DmHeader({ user }) {
  return (
    <Header
      icon={<IconAt className="w-5 h-5" />}
      title={
        <>
          {user?.username ?? ''}
          <div
            className={`w-2.5 h-2.5 ml-3 rounded-full ${
              user?.isOnline ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        </>
      }
    ></Header>
  )
}
