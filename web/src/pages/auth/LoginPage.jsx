import { Link, useHistory } from 'react-router-dom'
import AuthCard from '@/pages/auth/AuthCard'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { CurrentUserDocument, useLoginMutation } from '@/graphql/hooks'

export default function LoginPage() {
  const { t } = useTranslation()
  const [login, { loading }] = useLoginMutation({
    refetchQueries: [{ query: CurrentUserDocument }],
    awaitRefetchQueries: true
  })
  const { register, handleSubmit, watch } = useForm()
  const email = watch('email')
  const password = watch('password')
  const { push } = useHistory()

  const onSubmit = input => {
    login({ variables: { input } }).then(() => {
      push('/me')
    })
  }

  return (
    <>
      <Helmet>
        <title>{t('auth.login')}</title>
      </Helmet>

      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="title mb-6">{t('auth.welcomeBack')}</div>
          <div className="mb-4">
            <label htmlFor="email" className="label">
              {t('auth.email')}
            </label>
            <input
              className="textbox px-3"
              id="email"
              {...register('email', { required: true })}
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

          <Button loading={loading} disabled={!email || !password}>
            Log In
          </Button>
          <div className="pt-3 text-mid text-sm">
            {t('auth.needAccount')}{' '}
            <Link to="/register" className="text-accent hover:underline">
              {t('auth.register')}
            </Link>
          </div>
        </form>
      </AuthCard>
    </>
  )
}
