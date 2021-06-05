import Dialog from '@/components/ui/dialog/Dialog'
import { useState } from 'react'

export default function MessageImageDialog({
  image,
  width,
  height,
  rounded = true
}) {
  const [showImagePopup, setShowImagePopup] = useState(false)

  return (
    <div>
      <img
        onClick={() => setShowImagePopup(true)}
        src={image.smallUrl}
        alt=""
        className={`${rounded ? 'rounded' : ''} cursor-pointer max-w-full`}
        width={width || image.smallWidth}
        height={height || image.smallHeight}
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
              src={image.popupUrl}
              alt=""
              width={image.popupWidth}
              height={image.popupHeight}
            />
            <div className="pt-1">
              <a
                href={image.originalUrl}
                className="hover:underline cursor-pointer text-mid font-semibold text-13 focus:outline-none"
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
