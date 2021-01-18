import { registerEnumType } from 'type-graphql'

export enum Galaxy {
  Arts = 'Arts',
  Business = 'Business',
  Culture = 'Culture',
  Discussion = 'Discussion',
  Entertainment = 'Entertainment',
  Gaming = 'Gaming',
  Health = 'Health',
  Hobbies = 'Hobbies',
  Lifestyle = 'Lifestyle',
  Memes = 'Memes',
  Meta = 'Meta',
  News = 'News',
  Politics = 'Politics',
  Science = 'Science',
  Sports = 'Sports',
  Technology = 'Technology',
  Uncategorized = 'Uncategorized'
}

registerEnumType(Galaxy, { name: 'Galaxy' })
