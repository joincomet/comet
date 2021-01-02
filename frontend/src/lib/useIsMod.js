import { useCurrentUser } from '@/lib/queries/useCurrentUser'

export function useIsMod(planet) {
  const user = useCurrentUser().data
  return (
    user &&
    planet &&
    user.moderatedPlanets &&
    user.moderatedPlanets.length > 0 &&
    user.moderatedPlanets.map(p => p.id).includes(planet.id)
  )
}

export function useIsModOrAdmin(planet) {
  const user = useCurrentUser().data

  if (!planet) return user.admin

  return (
    user &&
    planet &&
    ((user.moderatedPlanets &&
      user.moderatedPlanets.length > 0 &&
      user.moderatedPlanets.map(p => p.id).includes(planet.id)) ||
      user.admin)
  )
}

export function useIsAdmin() {
  const user = useCurrentUser().data
  if (!user) return false
  return user.admin
}
