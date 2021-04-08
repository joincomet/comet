import Dialog from '@/components/ui/dialog/Dialog'
import { useState } from 'react'

export default function MessageImageDialog({ message }) {
  const [showImagePopup, setShowImagePopup] = useState(false)

  if (!message.image) return null
  return (
    <div className="pt-1">
      <img
        onClick={() => setShowImagePopup(true)}
        src={message.image.smallUrl}
        alt=""
        className="rounded cursor-pointer"
        width={message.image.smallWidth}
        height={message.image.smallHeight}
      />

      <Dialog
        closeOnOverlayClick
        close={() => setShowImagePopup(false)}
        isOpen={showImagePopup}
      >
        <div className="mx-auto">
          <div className="text-left">
            <img
              onClick={e => e.stopPropagation()}
              src={message.image.popupUrl}
              alt=""
              width={message.image.popupWidth}
              height={message.image.popupHeight}
            />
            <div className="pt-1">
              <a
                href={message.image.originalUrl}
                className="hover:underline cursor-pointer text-mid font-semibold text-13"
                target="_blank"
                rel="noreferrer noopener"
                onClick={e => e.stopPropagation()}
              >
                Open original
              </a>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
