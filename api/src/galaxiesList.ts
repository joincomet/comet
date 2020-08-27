const galaxies = [
  { fullName: 'Music', name: 'music', icon: 'mdiMusic' },
  { fullName: 'Gaming', name: 'gaming', icon: 'mdiControllerClassic' },
  { fullName: 'Programming', name: 'programming', icon: 'mdiCodeTags' },
  { fullName: 'Photography', name: 'photography', icon: 'mdiCamera' },
  {
    fullName: 'Memes & Humor',
    name: 'humor',
    icon: 'mdiEmoticonExcited'
  },
  {
    fullName: 'Movies & TV',
    name: 'movies_tv',
    icon: 'mdiMovie'
  },
  {
    fullName: 'Videos & Livestreams',
    name: 'videos_livestreams',
    icon: 'mdiVideoOutline'
  },
  { fullName: 'News & Politics', name: 'news', icon: 'mdiNewspaper' },
  { fullName: 'Drugs', name: 'drugs', icon: 'mdiPill' },
  { fullName: 'Health & Fitness', name: 'health', icon: 'mdiWeightLifter' },
  {
    fullName: 'Discussion',
    name: 'discussion',
    icon: 'mdiCommentTextMultiple'
  },
  { fullName: 'Technology', name: 'technology', icon: 'mdiDevices' },
  {
    fullName: 'Finance & Business',
    name: 'finance',
    icon: 'mdiCashUsdOutline'
  },
  {
    fullName: 'Outdoors, Nature & Environment',
    name: 'outdoors',
    icon: 'mdiNaturePeople'
  },
  { fullName: 'Sports', name: 'sports', icon: 'mdiBasketball' },
  { fullName: 'Food', name: 'food', icon: 'mdiFood' },
  { fullName: 'Science', name: 'science', icon: 'mdiMicroscope' },
  { fullName: 'Writing', name: 'writing', icon: 'mdiFeather' },
  { fullName: 'Art', name: 'art', icon: 'mdiImageFrame' },
  { fullName: 'Education', name: 'education', icon: 'mdiSchool' },
  {
    fullName: 'Spirituality, Religion & Philosophy',
    name: 'spirituality',
    icon: 'mdiBookshelf'
  },
  { fullName: 'Fashion', name: 'fashion', icon: 'mdiTshirtCrew' },
  { fullName: 'Places', name: 'places', icon: 'mdiCity' },
  { fullName: 'Animals', name: 'animals', icon: 'mdiDogSide' },
  { fullName: 'Other', name: 'other', icon: 'mdiHelpCircle' }
]

export const galaxiesList = galaxies.sort((a, b) => {
  if (a.name === 'other') return 1
  return a.fullName.localeCompare(b.fullName)
})
