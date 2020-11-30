import Layout from '../components/Layout'
import SignUpForm from '@/components/SignUpForm'
import { withLayout } from '@moxy/next-layout'

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
          <div
            style={{ zIndex: -1 }}
            className="absolute rounded-md transform -rotate-6 shadow-md w-full h-full inset-0 bg-gradient-to-br to-red-400 from-blue-500"
          />

          <SignUpForm />
        </div>
      </div>
    </>
  )
}

export default withLayout(<Layout />)(LoginPage)
