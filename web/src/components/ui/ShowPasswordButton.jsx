import Tippy from '@tippyjs/react'
import { IconHide, IconShow } from '@/components/ui/icons/Icons'

export default function ShowPasswordButton({ showPassword, setShowPassword }) {
  return (
    <Tippy content={showPassword ? 'Hide Password' : 'Show Password'}>
      <div className={`form-show-password-button`}>
        {showPassword ? (
          <IconHide
            onClick={() => setShowPassword(false)}
            className="w-5 h-5"
          />
        ) : (
          <IconShow onClick={() => setShowPassword(true)} className="w-5 h-5" />
        )}
      </div>
    </Tippy>
  )
}
