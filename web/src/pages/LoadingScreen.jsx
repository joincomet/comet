import { IconSpinner } from '@/components/ui/icons/Icons'
import { VectorLogo } from '@/components/ui/vectors'

export default function LoadingScreen() {
  return (
    <div
      style={{ zIndex: 9999 }}
      className="h-full fixed inset-x-0 bottom-0 top-0 electron:top-5.5 flex items-center justify-center dark:bg-gray-800"
    >
      <div className="space-y-8">
        <VectorLogo className="w-36" />
        <div className="flex items-center justify-center">
          <IconSpinner />
        </div>
      </div>
    </div>
  )
}
