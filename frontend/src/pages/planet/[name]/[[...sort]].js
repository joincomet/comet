import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

export default function PlanetPage() {
  const router = useRouter()

  const sort =
    router.query.sort && router.query.sort.length >= 1
      ? router.query.sort[0].toUpperCase()
      : 'HOT'
  const time =
    router.query.sort && router.query.sort.length >= 2
      ? router.query.sort[1].toUpperCase()
      : 'ALL'

  return (
    <Layout>
      <div>{router.query.name}</div>
      <div>{sort}</div>
      <div>{time}</div>
    </Layout>
  )
}

const getVariables = query => {
  const sort =
    query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
  const time =
    query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
  return { sort, time }
}
