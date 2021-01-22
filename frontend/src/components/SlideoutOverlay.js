import React from 'react'

export default function SlideoutOverlay({ slideoutLeft, slideoutRight }) {
  return (
    <>
      {((slideoutLeft && slideoutLeft.isOpen()) ||
        (slideoutRight && slideoutRight.isOpen())) && (
        <div
          className="fixed z-10 inset-0"
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            slideoutLeft.close()
            slideoutRight.close()
          }}
        />
      )}
    </>
  )
}
