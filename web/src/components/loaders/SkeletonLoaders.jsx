import Avatar from '@/components/ui/Avatar'

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export const generateSkeletonMessages = () => {
  const result = []
  const messageWidths = ['11', '12', '14', '16', '20', '24', '28']
  const imageWidthsAndHeights = ['36', '40', '44', '48', '52', '56', '60']
  for (let i = 0; i < getRandomInt(10, 12); i++) {
    const skeletonMessage = {
      firstLine: {
        blobWidth: `w-${messageWidths[getRandomInt(0, messageWidths.length)]}`
      },
      lines: []
    }
    for (let j = 0; j < getRandomInt(2, 5); j++) {
      const blobWidths = []
      for (let k = 0; k < getRandomInt(4, 6); k++) {
        blobWidths.push(
          `w-${messageWidths[getRandomInt(0, messageWidths.length)]}`
        )
      }
      skeletonMessage.lines.push({ blobWidths: blobWidths })
    }
    if (getRandomInt(0, 2) == 0) {
      skeletonMessage['imageBlob'] = {
        dimensions: {
          width: `w-${
            imageWidthsAndHeights[getRandomInt(0, imageWidthsAndHeights.length)]
          }`,
          height: `h-${
            imageWidthsAndHeights[getRandomInt(0, imageWidthsAndHeights.length)]
          }`
        }
      }
    }
    result.push(skeletonMessage)
  }
  return result
}

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

export const SkeletonCommentLoader = () => {
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
          <div className="flex flex-wrap items-center mb-2 h-5 dark:bg-gray-750 bg-gray-300 w-full  rounded-full"></div>
          <div className="flex flex-wrap items-center mb h-5 dark:bg-gray-750 bg-gray-300 w-full  rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonPostPageLoader = () => {
  return (
    <div
      style={{ opacity: 1 }}
      className={`relative group hover:shadow dark:bg-gray-800 bg-gray-200 px-2 py-3 md:rounded rounded animate-pulse`}
    >
      <div className="flex">
        <div className="flex flex-col items-center pr-2 w-9">
          <div className="w-7 h-16 rounded-full dark:bg-gray-750 bg-gray-300"></div>
        </div>

        <div className="pr-4 flex-grow flex flex-col">
          <div className="text-secondary font-medium text-base w-1/4 dark:bg-gray-750 bg-gray-300 h-5 rounded-full mb-2"></div>
          <div className="text-secondary font-medium text-base w-1/2 dark:bg-gray-750 bg-gray-300 h-5 rounded-full mb-2"></div>

          <div className="mb-2 pb-2 w-full dark:bg-gray-750 bg-gray-300 h-20 rounded-lg"></div>

          <div className="flex items-center w-1/4 dark:bg-gray-750 bg-gray-300 h-5 rounded-full">
            <div className={`flex items-center`}></div>
          </div>
        </div>
      </div>
    </div>
  )
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
        className={`flex py-1 pl-4 pr-18 transparent group relative animate-pulse`}
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
