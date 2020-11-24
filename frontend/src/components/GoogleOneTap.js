import { csrfToken } from 'next-auth/client'

export default function GoogleOneTap({ csrfToken }) {
  return process.env.NODE_ENV === 'production' ? (
    <div
      id="g_id_onload"
      data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      data-login_uri="https://cometx.io/api/auth/signin/google"
      data-csrf={csrfToken}
    />
  ) : null
}

GoogleOneTap.getInitialProps = async context => {
  return {
    csrfToken: await csrfToken(context)
  }
}
