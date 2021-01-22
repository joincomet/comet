import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'
import { User } from '@/user/User.Entity'

export const followingLoader = new DataLoader(
  async (keys: { userId: number; followingId: number }[]) => {
    const users = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = ANY(:ids)', {
        ids: keys.map(k => k.userId)
      })
      .leftJoinAndSelect('user.following', 'follower')
      .getMany()

    return Promise.all(
      keys.map(async ({ userId, followingId }) =>
        (await users.find(u => u.id === userId).following)
          .map(u => u.id)
          .includes(followingId)
      )
    )
  }
)
