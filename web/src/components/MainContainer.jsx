import React from 'react'

export default function MainContainer({ children, rightSidebar = false }) {
  return (
    <div
      className={`pl-76 pt-12 max-h-full h-full flex flex-col ${
        rightSidebar ? 'pr-60' : ''
      }`}
    >
      {children}
    </div>
  )
}
