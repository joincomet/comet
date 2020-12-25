import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator'

export const galaxiesList = [
  'Technology',
  'Science',
  'Movies & Television',
  'Music',
  'Art',
  'Gaming',
  'Podcasts, Streams & Videos',
  'Internet Culture & Memes',
  'Funny',
  'Pics & Gifs',
  'Programming',
  'News',
  'Politics',
  'Business, Economics & Finance',
  'Marketplace & Deals',
  'Animals & Pets',
  'Outdoors & Nature',
  'Reading, Writing & Literature',
  'Religion & Spirituality',
  'Ethics & Philosophy',
  'Fitness & Nutrition',
  'Medical & Mental Health',
  'Hobbies',
  'Sports',
  'Crypto',
  'Anime',
  'Home & Garden',
  'Places & Travel',
  'Food & Drink',
  'Learning & Education',
  'Careers',
  'Family & Relationships',
  'Law',
  'History',
  'Beauty & Makeup',
  'Crafts & DIY',
  'Fashion',
  'Celebrity',
  'Cars & Motor Vehicles',
  'Tabletop Games',
  'Military',
  'Activism',
  'Culture, Race & Ethnicity',
  'Sexual Orientation & Gender',
  "Men's Health",
  "Women's Health",
  'Addiction Support',
  'Trauma Support',
  'Mature Themes & Adult Content',
  'Meta/CometX'
]

export function IsGalaxy(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isGalaxy',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && galaxiesList.includes(value)
        }
      }
    })
  }
}
