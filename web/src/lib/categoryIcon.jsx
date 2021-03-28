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
  IconCategoryNone,
  IconCategoryPolitics,
  IconCategoryProgramming,
  IconCategorySports
} from '@/lib/Icons'

export const categoryIcon = (category, className = 'w-5 h-5') => {
  switch (category) {
    case 'Arts':
      return <IconCategoryArts className={className} />
    case 'Business':
      return <IconCategoryBusiness className={className} />
    case 'Culture':
      return <IconCategoryCulture className={className} />
    case 'Discussion':
      return <IconCategoryDiscussion className={className} />
    case 'Entertainment':
      return <IconCategoryEntertainment className={className} />
    case 'Gaming':
      return <IconCategoryGaming className={className} />
    case 'Health':
      return <IconCategoryHealth className={className} />
    case 'Hobbies':
      return <IconCategoryHobbies className={className} />
    case 'Lifestyle':
      return <IconCategoryLifestyle className={className} />
    case 'Memes':
      return <IconCategoryMemes className={className} />
    case 'Meta':
      return <IconCategoryMeta className={className} />
    case 'News':
      return <IconCategoryNews className={className} />
    case 'Politics':
      return <IconCategoryPolitics className={className} />
    case 'Programming':
      return <IconCategoryProgramming className={className} />
    case 'Science': // HiBeaker
      return (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
            clipRule="evenodd"
          />
        </svg>
      )
    case 'Sports':
      return <IconCategorySports className={className} />
    case 'Technology': // HiChip
      return (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13 7H7v6h6V7z" />
          <path
            fillRule="evenodd"
            d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
            clipRule="evenodd"
          />
        </svg>
      )
    case 'Uncategorized':
      return <IconCategoryNone className={className} />
  }
}
