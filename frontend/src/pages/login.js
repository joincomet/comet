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
        <div className="relative inset-center">
          <div
            style={{ zIndex: -1 }}
            className="absolute rounded-md shadow-md w-full h-full transform -rotate-6 inset-0 bg-gradient-to-br to-red-400 from-indigo-500"
          />

          <div className="max-w-sm w-full p-6 bg-white dark:bg-gray-800 rounded-md shadow-xl z-10">
            <SignUpForm />
          </div>
        </div>
      </Layout>
    </>
  )
}
