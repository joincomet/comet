import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthCard from '@/pages/auth/AuthCard'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/graphql/oldmutations'
import Button from '@/components/Button'

export default function LoginPage() {
  const [{ data, fetching, error }, login] = useLoginMutation()
  const { register, handleSubmit } = useForm()
  const { push } = useHistory()

  const onSubmit = variables =>
    login(variables).then(
      ({
        data: {
          login: { accessToken }
        }
      }) => {
        localStorage.setItem('token', accessToken)
        push('/home')
      }
    )

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="title mb-6">Welcome back!</div>
        <div className="mb-4">
          <label htmlFor="name" className="label">
            Email or Username#tag
          </label>
          <input
            className="textbox px-3"
            id="name"
            {...register('name', { required: true })}
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
