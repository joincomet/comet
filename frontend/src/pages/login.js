import Layout from '../components/Layout'
import SignUpForm from '@/components/SignUpForm'
import { withLayout } from '@moxy/next-layout'
import React from 'react'

function LoginPage() {
  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
        }
      `}</style>

      <div className="w-full h-full flex">
        <div className="relative m-auto">
          <SignUpForm />
        </div>
      </div>
    </>
  )
}

export default withLayout(<Layout />)(LoginPage)
