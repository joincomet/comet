import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { User } from '@/user/User.Entity'

export const followedLoader = new DataLoader(
  async (keys: { userId: number; followedId: number }[]) => {
    const users = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = ANY(:ids)', {
        ids: keys.map(k => k.userId)
      })
      .leftJoinAndSelect('user.followers', 'follower')
      .getMany()

    return Promise.all(
      keys.map(async ({ userId, followedId }) =>
        (await users.find(u => u.id === userId).followers)
          .map(u => u.id)
          .includes(followedId)
      )
    )
  }
)
