import Layout from '../components/Layout'
import SignUpForm from '@/components/SignUpForm'

export default function LoginPage() {
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
      <Layout>
        <div className="w-full h-full">
          <div className="relative inset-center">
            <div
              style={{ zIndex: -1 }}
              className="absolute rounded-md transform -rotate-6 shadow-md w-full h-full inset-0 bg-gradient-to-br to-red-400 from-blue-500"
            />

            <SignUpForm />
          </div>
        </div>
      </Layout>
    </>
  )
}
