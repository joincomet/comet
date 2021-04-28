import {
  IconCategoryArts,
  IconCategoryBusiness,
  IconCategoryCulture,
  IconCategoryDiscussion,
  IconCategoryEntertainment,
  IconCategoryGaming,
  IconCategoryHealth,
  IconCategoryHobbies,
  IconCategoryLifestyle,
  IconCategoryMemes,
  IconCategoryMeta,
  IconCategoryNews,
  IconCategoryOther,
  IconCategoryPolitics,
  IconCategoryProgramming,
  IconCategorySports,
  IconCategoryScience,
  IconCategoryTechnology,
  IconAll,
  IconFeatured
} from '@/components/ui/icons/Icons'

export const getCategoryIcon = category => {
  if (!category) return IconAll
  switch (category) {
    case 'Featured':
      return IconFeatured
    case 'Arts':
      return IconCategoryArts
    case 'Business':
      return IconCategoryBusiness
    case 'Culture':
      return IconCategoryCulture
    case 'Discussion':
      return IconCategoryDiscussion
    case 'Entertainment':
      return IconCategoryEntertainment
    case 'Gaming':
      return IconCategoryGaming
    case 'Health':
      return IconCategoryHealth
    case 'Hobbies':
      return IconCategoryHobbies
    case 'Lifestyle':
      return IconCategoryLifestyle
    case 'Memes':
      return IconCategoryMemes
    case 'Meta':
      return IconCategoryMeta
    case 'News':
      return IconCategoryNews
    case 'Politics':
      return IconCategoryPolitics
    case 'Programming':
      return IconCategoryProgramming
    case 'Science': // HiBeaker
      return IconCategoryScience
    case 'Sports':
      return IconCategorySports
    case 'Technology': // HiChip
      return IconCategoryTechnology
    case 'Other':
      return IconCategoryOther
  }
}
