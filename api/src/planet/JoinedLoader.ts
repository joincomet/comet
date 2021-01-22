import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { Planet } from '@/planet/Planet.Entity'

export const joinedLoader = new DataLoader(
  async (keys: { userId: number; planetId: number }[]) => {
    const planets = await getRepository(Planet)
      .createQueryBuilder('planet')
      .where('planet.id = ANY(:planetIds)', {
        planetIds: keys.map(k => k.planetId)
      })
      .leftJoinAndSelect('planet.users', 'user')
      .getMany()

    return Promise.all(
      keys.map(async ({ userId, planetId }) =>
        (await planets.find(p => p.id === planetId).users)
          .map(u => u.id)
          .includes(userId)
      )
    )
  }
)
