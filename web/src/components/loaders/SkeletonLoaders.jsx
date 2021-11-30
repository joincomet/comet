import Avatar from '@/components/ui/Avatar'
import { IconChat, IconDotsVertical } from '@/components/ui/icons/Icons'
import { getRandomInt } from '@/utils/getRandomInt'

export const SkeletonPostLoader = () => {
  return (
    <div className="md:px-4 pb-1.5 px-0 animate-pulse">
      <div className="relative group dark:bg-gray-800 bg-gray-200 md:rounded">
        <div className="relative group dark:bg-gray-800  bg-gray-200 px-2 py-3 md:rounded flex">
          <div className="flex flex-col items-center pr-2 w-9">
            <div className="w-5 h-5 rounded-full dark:bg-gray-750 bg-gray-300 mb-2"></div>
            <div className="w-3 h-3  rounded-sm dark:bg-gray-750 bg-gray-300"></div>
            <div className="w-5 h-5 rounded-full dark:bg-gray-750 bg-gray-300 mt-2"></div>
          </div>
          <div className="w-26 min-w-[6.5rem] h-18 min-h-[4.5rem] rounded dark:bg-gray-750 bg-gray-300 mr-4 flex justify-center bg-center bg-cover bg-no-repeat"></div>
          <div className="pr-4 flex-grow flex flex-col">
            <div className="w-1/2 flex-1 bg-gray-300 dark:bg-gray-750 rounded-full mb-2"></div>
            <div className="w-full flex-1 bg-gray-300 dark:bg-gray-750 rounded-full"></div>
            <div className="w-1/4 flex-1 bg-gray-300 dark:bg-gray-750 select-nonedark:bg-gray-750 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonPostPageLoader = () => {
  return (
    <div
      className={`relative dark:bg-gray-800 bg-gray-200 px-2 py-3 md:rounded animate-pulse`}
    >
      <div className="flex">
        <div className="flex flex-col items-center pr-2 w-9">
          <div className="w-5 h-5 rounded-full dark:bg-gray-750 bg-gray-300 mb-2"></div>
          <div className="w-3 h-3  rounded-sm dark:bg-gray-750 bg-gray-300"></div>
          <div className="w-5 h-5 rounded-full dark:bg-gray-750 bg-gray-300 mt-2"></div>
        </div>

        <div className="pr-4 flex-grow flex flex-col">
          <div className="flex flex-wrap items-center pb-1.5">
            <Avatar
              size={5}
              className="dark:bg-gray-700 bg-gray-200 rounded-full mr-1.5"
            />
            <div className="w-24 dark:bg-gray-750 bg-gray-300 h-4 rounded-full mr-2"></div>
            <div className="w-24 dark:bg-gray-750 bg-gray-300 h-4 rounded-full mr-2"></div>
            <div className="w-16 dark:bg-gray-750 bg-gray-300 h-4 rounded-full"></div>
          </div>
          <div className="w-1/4 dark:bg-gray-750 bg-gray-300 h-5 rounded-full mb-2"></div>
          <div className="w-full h-30 rounded-full mb-2"></div>
          <div className="flex items-center pt-1.5">
            <div className="w-16 dark:bg-gray-750 bg-gray-300 h-4 rounded-full mr-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SkeletonCommentLoader = () => {
  return (
    <div
      className={`relative md:rounded dark:bg-gray-800 bg-gray-200 animate-pulse`}
    >
      <div className="flex px-3 pt-3">
        <Avatar
          size={7}
          className="dark:bg-gray-750 bg-gray-300 rounded-full"
        />
        <div
          className={`pl-3 pb-3 w-full border-b dark:border-gray-750 border-gray-300`}
        >
          <div className="flex flex-wrap items-center mb-2 h-5 dark:bg-gray-750 bg-gray-300 w-3/4  rounded-full"></div>
          <div className="flex flex-wrap items-center mb h-5 dark:bg-gray-750 bg-gray-300 w-1/2  rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export const getSkeletonComments = amount => {
  const result = []
  for (let i = 0; i < amount; i++) {
    result.push(<SkeletonCommentLoader key={i}/>)
  }
  return result
}

export const SkeletonMessageLoader = ({ messages }) => {
  return (
    <SkeletonMessageLoaderTemplate>
      <SkeletonMessageLoaderChildrenTemplate messages={messages} />
    </SkeletonMessageLoaderTemplate>
  )
}

const SkeletonMessageLoaderTemplate = ({ children }) => {
  return (
    <div className={`pt-4`}>
      <div
        className={`flex py-1 pl-4 pr-18 transparent relative animate-pulse`}
      >
        <Avatar
          size={10}
          className="dark:bg-gray-700 bg-gray-200 rounded-full"
        />
        <div className="pl-4 w-full">{children}</div>
      </div>
    </div>
  )
}

const SkeletonMessageLoaderChildrenTemplate = ({ messages }) => {
  const result = [
    <div
      className={`dark:bg-gray-600 bg-gray-300 flex ${messages.firstLine.blobWidth} h-5 rounded-full mr-2 opacity-50`}
      key={0}
    ></div>
  ]
  messages.lines.forEach((line, i) => {
    const blobWidths = line.blobWidths
    result.push(
      <div key={i + 1}>
        <div className="flex mt-2">
          {blobWidths.map((width, j) => {
            return (
              <div
                className={`dark:bg-gray-600 bg-gray-300 mr-2 ${width} h-5 rounded-full opacity-20`}
                key={j}
              ></div>
            )
          })}
        </div>
        {messages.imageBlob && i == messages.lines.length - 2 ? (
          <div
            className={`dark:bg-gray-600 bg-gray-300 mt-2 ${messages.imageBlob.dimensions.width} ${messages.imageBlob.dimensions.height} rounded-lg opacity-20`}
          ></div>
        ) : null}
      </div>
    )
  })
  return result
}

export const generateSkeletonMessages = () => {
  const result = []
  const messageWidths = ['w-11', 'w-12', 'w-14', 'w-16', 'w-20', 'w-24', 'w-28']
  const imageWidths = ['w-36', 'w-40', 'w-44', 'w-48', 'w-52', 'w-56', 'w-60']
  const imageHeights = ['h-36', 'h-40', 'h-44', 'h-48', 'h-52', 'h-56', 'h-60']
  for (let i = 0; i < getRandomInt(10, 12); i++) {
    const skeletonMessage = {
      firstLine: {
        blobWidth: messageWidths[getRandomInt(0, messageWidths.length)]
      },
      lines: []
    }
    for (let j = 0; j < getRandomInt(2, 5); j++) {
      const blobWidths = []
      for (let k = 0; k < getRandomInt(4, 6); k++) {
        blobWidths.push(messageWidths[getRandomInt(0, messageWidths.length)])
      }
      skeletonMessage.lines.push({ blobWidths: blobWidths })
    }
    if (getRandomInt(0, 2) == 0) {
      skeletonMessage['imageBlob'] = {
        dimensions: {
          width: imageWidths[getRandomInt(0, imageWidths.length)],
          height: imageHeights[getRandomInt(0, imageHeights.length)]
        }
      }
    }
    result.push(skeletonMessage)
  }
  return result
}

export const SkeletonServerInfoCard = () => {
  return (
    <div
      className={`relative flex flex-col w-full rounded-lg group dark:bg-gray-800 bg-white animate-pulse`}
    >
      <div className="h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative dark:bg-gray-700 bg-gray-200">
        <div className="absolute left-4 -bottom-3">
          <Avatar
            size={10}
            className="dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 ring-white bg-gray-300"
          />
        </div>
      </div>

      <div className="flex flex-col flex-grow px-4 pt-5 pb-4 h-40">
        <div className="text-lg font-semibold text-secondary h-5 w-3/4 dark:bg-gray-750 bg-gray-300 rounded-full"></div>

        <div className="text-13 text-tertiary line-clamp-3 pt-1 h-5 w-1/2 dark:bg-gray-750 bg-gray-300 rounded-full mt-3"></div>

        <div className="flex mt-auto text-xs">
          <div className="inline-flex items-center h-5 w-1/2 dark:bg-gray-750 bg-gray-300 rounded-full"></div>

          <div className="ml-auto inline-flex items-center  h-5 w-1/4 dark:bg-gray-750 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export const getSkeletonServerInfoCards = amount => {
  const result = []
  for (let i = 0; i < amount; i++) {
    result.push(<SkeletonServerInfoCard />)
  }
  return result
}
