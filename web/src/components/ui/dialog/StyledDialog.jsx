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
        className={`rounded-lg dark:bg-gray-800 w-full relative text-left ${
          !small && !large ? 'max-w-lg' : ''
        } ${small ? 'max-w-sm' : ''} ${large ? 'max-w-screen-lg' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
        {!!buttons && (
          <>
            <div className="rounded-b-lg dark:bg-gray-750 h-9" />
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
