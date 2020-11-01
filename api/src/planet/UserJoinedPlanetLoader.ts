import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { PlanetUser } from '@/planet/PlanetUser.Entity'

export const userJoinedPlanetLoader = new DataLoader(
  async (keys: { userId: number; planetId: number }[]) => {
    const entities = await getRepository(PlanetUser)
      .createQueryBuilder('join')
      .andWhere('join.planetId = ANY(:planets)', {
        planets: keys.map(k => k.planetId)
      })
      .andWhere('join.userId = ANY(:users)', {
        users: keys.map(k => k.userId)
      })
      .getMany()

    return keys.map(
      (key: { userId: number; planetId: number }) =>
        !!entities.find(
          k => k.userId === key.userId && k.planetId === key.planetId
        )
    )
  }
)
