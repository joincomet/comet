import React from 'react'

export default function Container({ children, rightSidebar = false }) {
  return (
    <div
      className={`pl-78 pt-12 max-h-full h-full flex flex-col ${
        rightSidebar ? 'pr-60' : ''
      }`}
    >
      {children}
    </div>
  )
}
