import { Link, useHistory } from 'react-router-dom'
import AuthCard from '@/pages/auth/AuthCard'
import isEmail from 'validator/es/lib/isEmail'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useMutation } from 'urql'
import { CREATE_ACCOUNT } from '@/graphql/mutations'
import { useCurrentUser } from '@/providers/UserProvider'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function RegisterPage() {
  const { t } = useTranslation()
  const [{ fetching }, createAccount] = useMutation(CREATE_ACCOUNT)
  const { register, handleSubmit } = useForm()
  const { push } = useHistory()
  const user = useCurrentUser()

  useEffect(() => {
    if (user) push('/me')
  }, [user])

  const onSubmit = variables => createAccount(variables)

  return (
    <>
      <Helmet>
        <title>{t('auth.login')}</title>
      </Helmet>

      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="title mb-6">{t('auth.createAccount')}</div>
          <div className="mb-4">
            <label htmlFor="username" className="label">
              {t('auth.username')}
            </label>
            <input
              className="textbox px-3"
              id="username"
              {...register('username', { required: true })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="label">
              {t('auth.email')}
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
              {t('auth.password')}
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
              {t('auth.alreadyHaveAccount')}
            </Link>
          </div>
        </form>
      </AuthCard>
    </>
  )
}
