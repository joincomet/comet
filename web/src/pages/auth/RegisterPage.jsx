import { Link, useHistory } from 'react-router-dom'
import AuthCard from '@/pages/auth/AuthCard'
import isEmail from 'validator/es/lib/isEmail'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { CurrentUserDocument, useCreateAccountMutation } from '@/graphql/hooks'
import ctl from '@netlify/classnames-template-literals'

const errorClass = ctl(`
  text-xs
  text-red-400
  pt-1.5
`)

export default function RegisterPage() {
  const { t } = useTranslation()
  const [createAccount, { loading }] = useCreateAccountMutation({
    refetchQueries: [{ query: CurrentUserDocument }],
    awaitRefetchQueries: true
  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })
  const name = watch('name')
  const email = watch('email')
  const password = watch('password')
  const { push } = useHistory()

  const onSubmit = input => {
    createAccount({ variables: { input } }).then(() => {
      push('/explore')
    })
  }

  return (
    <>
      <Helmet>
        <title>{t('auth.login')}</title>
      </Helmet>

      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="title mb-6">{t('auth.createAccount')}</div>
          <div className="mb-4">
            <label htmlFor="name" className="label">
              {t('auth.name')}
            </label>
            <input
              className="textbox px-3"
              id="name"
              {...register('name', {
                required: true,
                minLength: 2,
                maxLength: 32
              })}
              maxLength={32}
              minLength={2}
            />
            {!!name && errors.name && (
              <div className={errorClass}>Name must be 2-32 characters</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="label">
              {t('auth.email')}
            </label>
            <input
              className="textbox px-3"
              id="email"
              type="email"
              {...register('email', {
                required: true,
                validate: email => isEmail(email)
              })}
            />
            {!!email && errors.email && (
              <div className={errorClass}>Invalid email</div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="label">
              {t('auth.password')}
            </label>
            <input
              className="textbox px-3"
              type="password"
              id="password"
              {...register('password', { required: true, minLength: 6 })}
              minLength={6}
            />
            {!!password && errors.password && (
              <div className={errorClass}>
                Password must be at least 6 characters
              </div>
            )}
          </div>

          <Button
            loading={loading}
            disabled={
              !password ||
              !email ||
              !name ||
              password?.length < 6 ||
              !isEmail(email || '') ||
              name?.length < 2 ||
              name?.length > 32
            }
          >
            Continue
          </Button>
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
