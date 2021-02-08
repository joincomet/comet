import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthCard from '@/pages/auth/AuthCard'
import isEmail from 'validator/es/lib/isEmail'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import IconSpinner from '@/components/ui/icons/IconSpinner'
import { CURRENT_USER_QUERY } from '@/lib/queries/useCurrentUser'

const SIGNUP_MUTATION = gql`
  mutation signUp($username: String!, $email: String, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
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

export default function RegisterPage() {
  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION)
  const { register, handleSubmit } = useForm()
  const { push } = useHistory()

  const onSubmit = variables =>
    signUp({
      variables
    }).then(
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
        <div className="title mb-6">Create an account</div>
        <div className="mb-4">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            className="textbox"
            id="username"
            {...register('username', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="label">
            Email (Recommended)
          </label>
          <input
            className="textbox"
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
            className="textbox"
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
        </div>

        <button type="submit" className="button" disabled={loading}>
          Continue
          {loading && <IconSpinner className="w-5 h-5 ml-3" />}
        </button>
        <div className="pt-3 text-mid text-sm">
          <Link to="/login" className="text-accent hover:underline">
            Already have an account?
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}
