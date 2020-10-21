import {
  ArgsOf,
  CommandMessage,
  CommandNotFound,
  Discord,
  On
} from '@typeit/discord'
import { MessageEmbed } from 'discord.js'
import { Planet } from '@/entities/Planet'
import { getRepository } from 'typeorm'
import { User } from '@/entities/User'

@Discord()
abstract class DiscordBot {
  private planetRepository = getRepository(Planet)
  private userRepository = getRepository(User)

  @On('message')
  private async planet([message]: ArgsOf<'message'>) {
    const words = message.content.split(' ')

    for (let i = 0; i < words.length; i++) {
      const word = words[i]

      if (word.startsWith('+')) {
        const planet = await this.planetRepository
          .createQueryBuilder('planet')
          .where('planet.name ILIKE :name', {
            name: word.substring(1).replace(/_/g, '\\_')
          })
          .getOne()

        if (planet) {
          await message.reply(
            new MessageEmbed()
              .setTitle(`+${planet.name}`)
              .setDescription(planet.profile.description)
              .setColor(planet.profile.color || 0x5a67d8)
              .setURL(`https://www.cometx.io/+${planet.name}`)
              .setImage(planet.profile.avatarURL)
              .setFooter('CometX.io', 'https://cometx.io/icon.png')
          )
        } else {
          await message.reply('Planet not found')
        }
      } else if (word === '@' && i + 1 < words.length && !!words[i + 1]) {
        const user = await this.userRepository
          .createQueryBuilder('user')
          .where('user.username ILIKE :username', {
            username: words[i + 1].replace(/_/g, '\\_')
          })
          .getOne()

        if (user) {
          await message.reply(
            new MessageEmbed()
              .setTitle(`@${user.username}`)
              .setDescription(user.profile.bio)
              .setColor(0x5a67d8)
              .setURL(`https://www.cometx.io/@${user.username}`)
              .setImage(user.profile.avatarURL)
              .setFooter('CometX.io', 'https://cometx.io/icon.png')
              .addFields(
                { name: '**Posts**', value: user.postCount, inline: true },
                { name: '**Comments**', value: user.commentCount, inline: true }
              )
          )
        } else {
          await message.reply('User not found')
        }
      }
    }
  }

  @CommandNotFound()
  private async notFound(message: CommandMessage) {
    await message.reply('Command not found')
  }
}
