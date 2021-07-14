import { Fragment } from 'react'
import Dialog from '@/components/ui/dialog/Dialog'

export default function StyledDialog({
  children,
  buttons,
  open,
  close,
  closeOnOverlayClick,
  onSubmit,
  small = false,
  large = false
}) {
  return (
    <Dialog
      isOpen={open}
      close={close}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <form
        onSubmit={onSubmit}
        className={`md:rounded-lg dark:bg-gray-800 min-w-screen w-full relative text-left bg-white text-white ${
          !small && !large ? 'md:max-w-lg' : ''
        } ${small ? 'md:max-w-sm' : ''} ${large ? 'md:max-w-screen-lg' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
        {!!buttons && (
          <>
            <div className="md:rounded-b-lg dark:bg-gray-750 h-9" />
            <div className="absolute right-5 bottom-9 transform translate-y-1/2 flex items-center space-x-3 justify-end h-9">
              {(buttons.type === Fragment
                ? buttons.props.children
                : [buttons]
              ).map((button, index) => (
                <div key={index} className="dark:bg-gray-800 rounded">
                  {button}
                </div>
              ))}
            </div>
          </>
        )}
      </form>
    </Dialog>
  )
}
