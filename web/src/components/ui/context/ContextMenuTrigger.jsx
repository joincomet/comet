import { useContextTrigger } from '@/providers/ContextMenuProvider'

export default function ContextMenuTrigger({
  data,
  leftClick = false,
  children
}) {
  const [bindTrigger] = useContextTrigger(data, leftClick)

  return <div {...bindTrigger}>{children}</div>
}
