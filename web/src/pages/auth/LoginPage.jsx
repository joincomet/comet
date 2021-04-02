import { Link, useHistory } from 'react-router-dom'
import AuthCard from '@/pages/auth/AuthCard'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useMutation } from 'urql'
import { LOGIN } from '@/graphql/mutations'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useEffect } from 'react'

export default function LoginPage() {
  const [{ fetching }, login] = useMutation(LOGIN)
  const { register, handleSubmit } = useForm()
  const { push } = useHistory()
  const user = useCurrentUser()

  useEffect(() => {
    if (user) push('/me')
  }, [user])

  const onSubmit = variables => login(variables)

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="title mb-6">Welcome back!</div>
        <div className="mb-4">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="textbox px-3"
            id="email"
            {...register('email', { required: true })}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            className="textbox px-3"
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
        </div>

        <Button loading={fetching}>Log In</Button>
        <div className="pt-3 text-mid text-sm">
          Need an account?{' '}
          <Link to="/register" className="text-accent hover:underline">
            Register
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}
