import React from 'react'
import { textbox } from './LoginPage.module.css'

export default function LoginPage() {
  return (
    <div className="h-full flex items-center justify-center dark:bg-gray-850">
      <div className="rounded-lg shadow-lg dark:bg-gray-750 max-w-md w-full px-5 py-3">
        <div className="pb-2 text-base">Log In</div>
        <input className={textbox} placeholder="Username" />
      </div>
    </div>
  )
}
