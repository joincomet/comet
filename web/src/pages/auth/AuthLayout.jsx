import { Link } from 'react-router-dom'
import {
  VectorGrass,
  VectorLogo,
  VectorTelescopeMan
} from '@/components/ui/vectors'
import { Meteors } from '@/components/ui/meteors'

export default function AuthLayout({ children }) {
  return (
    <div
      className="h-full flex items-center justify-center relative overflow-x-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at top , #18181B 0%,  #27272A 95%)'
      }}
    >
      {children}

      <Link to="/">
        <VectorLogo className="absolute left-8 top-8 h-6" />
      </Link>

      <div className="flex absolute bottom-0 left-0 right-0 z-10 text-gray-900">
        <VectorGrass className="w-1/2" />
        <VectorGrass className="w-1/2" />
      </div>
      <VectorTelescopeMan className="absolute bottom-0 right-32 text-gray-900 z-10 h-96" />
      <Meteors />
    </div>
  )
}
