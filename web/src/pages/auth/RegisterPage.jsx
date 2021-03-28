import { Link, useHistory } from 'react-router-dom'
import AuthCard from '@/pages/auth/AuthCard'
import isEmail from 'validator/es/lib/isEmail'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useMutation } from 'urql'
import { CREATE_ACCOUNT } from '@/graphql/mutations'

export default function RegisterPage() {
  const [{ fetching }, createAccount] = useMutation(CREATE_ACCOUNT)
  const { register, handleSubmit } = useForm()
  const { push } = useHistory()

  const onSubmit = variables =>
    createAccount(variables).then(
      ({
        data: {
          signUp: { accessToken }
        }
      }) => {
        localStorage.setItem('token', accessToken)
        push('/me')
      }
    )

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="title mb-6">Create an account</div>
        <div className="mb-4">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            className="textbox px-3"
            id="username"
            {...register('username', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="label">
            Email (Recommended)
          </label>
          <input
            className="textbox px-3"
            id="email"
            type="email"
            {...register('email', { validate: email => isEmail(email) })}
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

        <Button loading={fetching}>Continue</Button>
        <div className="pt-3 text-mid text-sm">
          <Link to="/login" className="text-accent hover:underline">
            Already have an account?
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}
