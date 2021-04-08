import { useContextTrigger } from '@/providers/ContextMenuProvider'

export default function ContextMenuTrigger({ data, children }) {
  const [bindTrigger] = useContextTrigger(data)

  return <div {...bindTrigger}>{children}</div>
}
