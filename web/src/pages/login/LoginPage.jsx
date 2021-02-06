import React from 'react'
import { textbox, label, button } from './Login.module.css'
import { Link } from 'react-router-dom'
import LoginCard from '@/pages/login/LoginCard'

export default function LoginPage() {
  return (
    <LoginCard>
      <div className="text-2xl font-bold mb-6">Welcome back!</div>
      <div className="w-full mb-4">
        <div className={label}>Email, Phone Number, or Username#tag</div>
        <input className={textbox} />
      </div>

      <div className="w-full mb-6">
        <div className={label}>PASSWORD</div>
        <input className={textbox} />
      </div>

      <button type="button" disabled className={button}>
        Log In
      </button>
      <div className="pt-3 text-mid text-sm w-full text-left">
        Need an account?{' '}
        <Link to="/register" className="text-accent hover:underline">
          Register
        </Link>
      </div>
    </LoginCard>
  )
}