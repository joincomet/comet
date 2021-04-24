import { IconSpinner } from '@/components/ui/icons/Icons'

export default function Button({
  type = 'submit',
  disabled = false,
  loading = false,
  children,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className="disabled:opacity-50 disabled:cursor-not-allowed w-full rounded space-x-3 flex items-center justify-center h-10 text-sm font-medium bg-blue-600 cursor-pointer select-none hover:bg-blue-600 transition focus:outline-none"
    >
      {children}
      {loading && <IconSpinner className="ml-3 w-5 h-5" />}
    </button>
  )
}
