import Sidebar from '@/components/ui/sidebar/Sidebar'
import ctl from '@netlify/classnames-template-literals'
import { Link } from 'react-router-dom'

const linkClass = ctl(`
  cursor-pointer
  hover:underline
`)

export default function InfoSidebar() {
  return (
    <Sidebar right>
      <div className="px-2.5 py-2.5">
        <div className="dark:border-gray-750 border rounded p-2.5 text-xs text-tertiary space-x-3 leading-5">
          <Link to="/about" target="_blank" className={linkClass}>
            Terms
          </Link>
          <Link to="/about" target="_blank" className={linkClass}>
            Privacy Policy
          </Link>
          <Link to="/about" target="_blank" className={linkClass}>
            Content Policy
          </Link>

          <a
            href="https://github.com/joincomet/comet"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>

          <a
            href="https://discord.gg/NPCMGSm"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Discord
          </a>
        </div>
      </div>
    </Sidebar>
  )
}
