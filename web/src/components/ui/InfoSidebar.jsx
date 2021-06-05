import Sidebar from '@/components/ui/sidebar/Sidebar'
import ctl from '@netlify/classnames-template-literals'
import { Link } from 'react-router-dom'
import { useCopyToClipboard } from 'react-use'
import Tippy from '@tippyjs/react'
import toast from 'react-hot-toast'

const linkClass = ctl(`
  cursor-pointer
  hover:underline
`)

const btcAddress = import.meta.env.VITE_BTC_ADDRESS
const ethAddress = import.meta.env.VITE_ETH_ADDRESS

export default function InfoSidebar() {
  const copyToClipboard = useCopyToClipboard()[1]

  return (
    <Sidebar right>
      <div className="px-2.5 py-2.5 flex flex-col">
        <div className="mt-auto" />
        <div className="dark:border-gray-750 border rounded p-2.5 text-xs text-tertiary leading-5">
          <div className="space-x-3">
            <Link to="/help/terms" target="_blank" className={linkClass}>
              Terms
            </Link>
            <Link to="/help/privacy" target="_blank" className={linkClass}>
              Privacy Policy
            </Link>
            <Link to="/help/content" target="_blank" className={linkClass}>
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

          <div className="pt-1.5">
            &copy; {new Date().getFullYear()} CometX, LLC
          </div>
        </div>

        <div className="space-y-0.5 text-xs text-tertiary leading-5 pt-1.5 break-all">
          <div>Donations appreciated!</div>
          <Tippy content="Click to copy">
            <div
              className="cursor-pointer"
              onClick={() => {
                copyToClipboard(btcAddress)
                toast.success('BTC donation address copied!')
              }}
            >
              <span className="select-none">BTC:&nbsp;</span>
              <span className="highlightable">{btcAddress}</span>
            </div>
          </Tippy>
          <Tippy content="Click to copy">
            <div
              className="cursor-pointer"
              onClick={() => {
                copyToClipboard(ethAddress)
                toast.success('ETH/BSC/MATIC donation address copied!')
              }}
            >
              <span className="select-none">ETH/BSC/MATIC:&nbsp;</span>
              <span className="highlightable">{ethAddress}</span>
            </div>
          </Tippy>
        </div>
      </div>
    </Sidebar>
  )
}
