import { Link } from 'react-router-dom'
import {
  GraphicLogo,
  GraphicGrass,
  GraphicTelescopeMan,
  GraphicMeteors
} from '@/lib/Icons'

const logo = <GraphicLogo className="absolute left-8 top-8 h-6" />

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

      {window.electron ? logo : <Link to="/">{logo}</Link>}

      <div className="flex absolute bottom-0 left-0 right-0 z-10 text-gray-900">
        <GraphicGrass className="w-1/2" />
        <GraphicGrass className="w-1/2" />
      </div>
      <GraphicTelescopeMan className="absolute bottom-0 right-32 text-gray-900 z-10 h-96" />
      <GraphicMeteors />
    </div>
  )
}
