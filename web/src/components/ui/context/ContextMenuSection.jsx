import ReactDOMServer from 'react-dom/server'
import ctl from '@netlify/classnames-template-literals'

const unavailableClass = ctl(
  `
  select-none
  w-full
  px-2
  h-8
  flex
  items-center
  text-13
  text-mid
  cursor-default
  rounded-sm
  font-medium
  focus:outline-none
`
)

export default function ContextMenuSection({ children }) {
  if (isChildNull(children))
    return (
      <div className="space-y-0.5">
        <div className={unavailableClass}>No actions available</div>
      </div>
    )
  return <div className="space-y-0.5">{children}</div>
}

const isChildNull = children => {
  return !ReactDOMServer.renderToStaticMarkup(children)
}
