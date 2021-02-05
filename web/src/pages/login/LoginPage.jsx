import React from 'react'
import { textbox, label } from './LoginPage.module.css'

export default function LoginPage() {
  return (
    <div className="h-full flex items-center justify-center dark:bg-gray-850">
      <div className="flex flex-col items-center rounded shadow-lg dark:bg-gray-750 max-w-md w-full py-4 px-4">
        <div className="text-2xl font-bold mb-6">Welcome back!</div>
        <div className="w-full mb-4">
          <div className={label}>Email, Phone Number, or Username#tag</div>
          <input className={textbox} />
        </div>

        <div className="w-full mb-6">
          <div className={label}>PASSWORD</div>
          <input className={textbox} />
        </div>

        <div className="w-full rounded flex items-center justify-center h-10 text-sm font-medium bg-blue-500 cursor-pointer select-none hover:bg-blue-600 transition">
          Log In
        </div>
      </div>
    </div>
  )
}
