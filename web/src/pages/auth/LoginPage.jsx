import React from 'react'
import { textbox, label, button } from './Auth.module.css'
import { Link, useHistory } from 'react-router-dom'
import AuthCard from '@/pages/auth/AuthCard'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import IconSpinner from '@/components/ui/icons/IconSpinner'
import toast from 'react-hot-toast'
import { CURRENT_USER_QUERY } from '@/lib/queries/useCurrentUser'

const LOGIN_MUTATION = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      accessToken
      user {
        id
        admin
        username
        avatarUrl
      }
    }
  }
`

export default function LoginPage() {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true
  })
  const { register, handleSubmit } = useForm()
  const { push } = useHistory()

  const onSubmit = variables =>
    login({ variables }).then(
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
        <div className="text-2xl font-bold mb-6 text-center">Welcome back!</div>
        <div className="mb-4">
          <label htmlFor="name" className={label}>
            Email or Username#tag
          </label>
          <input
            className={textbox}
            id="name"
            {...register('name', { required: true })}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className={label}>
            PASSWORD
          </label>
          <input
            className={textbox}
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
        </div>

        <button type="submit" className={button}>
          Log In
          {loading && <IconSpinner className="w-5 h-5 ml-3" />}
        </button>
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
