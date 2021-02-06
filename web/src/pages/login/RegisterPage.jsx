import React from 'react'
import { textbox, label, button } from './Login.module.css'
import { Link } from 'react-router-dom'
import LoginCard from '@/pages/login/LoginCard'

export default function RegisterPage() {
  return (
    <LoginCard>
      <div className="text-2xl font-bold mb-6">Create an account</div>
      <div className="w-full mb-4">
        <div className={label}>Username</div>
        <input className={textbox} />
      </div>

      <div className="w-full mb-4">
        <div className={label}>Email (Optional)</div>
        <input className={textbox} />
      </div>

      <div className="w-full mb-6">
        <div className={label}>PASSWORD</div>
        <input className={textbox} />
      </div>

      <button type="button" disabled className={button}>
        Continue
      </button>
      <div className="pt-3 text-mid text-sm w-full text-left">
        <Link to="/login" className="text-accent hover:underline">
          Already have an account?
        </Link>
      </div>
    </LoginCard>
  )
}
