import { lazy, Suspense } from 'react'
import ReactPlayer from 'react-player'
// const { Tweet } = lazy(() => import('react-twitter-widgets'))
import { Tweet } from 'react-twitter-widgets'
import ctl from '@netlify/classnames-template-literals'

const twitterRegex = /^https?:\/\/twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/
const bannedVideoRegex = /^https?:\/\/banned\.video\/watch\?id=((?:\w){24})/
const spotifyRegex = /^https?:\/\/open\.(?:spotify\.com\/)(?:embed\/)?(track|playlist|album)\/((?:\w){22})/
const gfycatRegex = /^https?:\/\/gfycat\.com\/(\w+)/
const bitchuteRegex = /^https?:\/\/www\.bitchute\.com\/video\/(\w+)/

const isReactPlayer = url => ReactPlayer.canPlay(url)
const isTwitter = url => twitterRegex.test(url)
const isBannedVideo = url => bannedVideoRegex.test(url)
const isSpotify = url => spotifyRegex.test(url)
const isGfycat = url => gfycatRegex.test(url)
const isBitchute = url => bitchuteRegex.test(url)

export const canEmbed = url =>
  (url &&
    (isReactPlayer(url) ||
      isTwitter(url) ||
      isBannedVideo(url) ||
      isSpotify(url) ||
      isGfycat(url))) ||
  isBitchute(url)

const containerClass = ctl(`aspect-h-9 aspect-w-16 relative`)
const embedClass = ctl(`w-full h-full`)

export default function CustomEmbed({ url }) {
  if (isReactPlayer(url))
    return (
      <div className={containerClass}>
        <ReactPlayer
          url={url}
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                controls: 1
              }
            }
          }}
        />
      </div>
    )

  if (isTwitter(url)) {
    const tweetId = url.match(twitterRegex)[1]
    return (
      <Tweet
        tweetId={tweetId}
        options={{
          theme: 'dark',
          align: 'center',
          dnt: true
        }}
      />
    )
  }

  if (isBannedVideo(url)) {
    const videoId = url.match(bannedVideoRegex)[1]
    return (
      <div className={containerClass}>
        <iframe
          src={`https://api.banned.video/embed/${videoId}?autoplay=false&amp;muted=false`}
          frameBorder="0"
          allowFullScreen
          className={embedClass}
        />
      </div>
    )
  }

  if (isSpotify(url)) {
    const spotifyMatch = url.match(spotifyRegex)
    const spotifyType = spotifyMatch[1]
    const spotifyId = spotifyMatch[2]
    return (
      <div className={containerClass}>
        <iframe
          src={`https://open.spotify.com/embed/${spotifyType}/${spotifyId}`}
          frameBorder="0"
          allowTransparency="true"
          allow="encrypted-media"
          className={embedClass}
        />
      </div>
    )
  }

  if (isGfycat(url)) {
    const gfycatId = url.match(gfycatRegex)[1]
    return (
      <div className={containerClass}>
        <iframe
          src={`https://gfycat.com/ifr/${gfycatId}`}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          className={embedClass}
        />
      </div>
    )
  }

  if (isBitchute(url)) {
    const videoId = url.match(bitchuteRegex)[1]
    return (
      <div className={containerClass}>
        <iframe
          src={`https://www.bitchute.com/embed/${videoId}/`}
          frameBorder="0"
          allowFullScreen
          className={embedClass}
        />
      </div>
    )
  }

  return null
}
