import { Tweet } from 'react-twitter-widgets'
import ctl from '@netlify/classnames-template-literals'
import YouTube from 'react-youtube'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'

const twitterRegex =
  /^https?:\/\/twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/
const bannedVideoRegex = /^https?:\/\/banned\.video\/watch\?id=((?:\w){24})/
const spotifyRegex =
  /^https?:\/\/open\.(?:spotify\.com\/)(?:embed\/)?(track|playlist|album)\/((?:\w){22})/
const gfycatRegex = /^https?:\/\/gfycat\.com\/(\w+)/
const bitchuteRegex = /^https?:\/\/www\.bitchute\.com\/video\/(\w+)/
const youtubeRegex = /^https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
const youtubeShortRegex = /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/
const twitchRegex = /^https?:\/\/www\.twitch\.tv\/([a-zA-Z0-9_-]+)/
const twitchVideoRegex = /^https?:\/\/www\.twitch\.tv\/videos\/(\d+)/
const twitchClipsRegex = /^https?:\/\/clips\.twitch\.tv\/([a-zA-Z0-9_-]+)/

const isTwitter = url => twitterRegex.test(url)
const isBannedVideo = url => bannedVideoRegex.test(url)
const isSpotify = url => spotifyRegex.test(url)
const isGfycat = url => gfycatRegex.test(url)
const isBitchute = url => bitchuteRegex.test(url)
const isYoutube = url => youtubeRegex.test(url)
const isYoutubeShort = url => youtubeShortRegex.test(url)
const isTwitch = url => twitchRegex.test(url)
const isTwitchVideo = url => twitchVideoRegex.test(url)
const isTwitchClips = url => twitchClipsRegex.test(url)

export const canEmbed = url =>
  url &&
  (isTwitter(url) ||
    isBannedVideo(url) ||
    isSpotify(url) ||
    isGfycat(url) ||
    isBitchute(url) ||
    isYoutube(url) ||
    isTwitch(url) ||
    isTwitchVideo(url) ||
    isTwitchClips(url))

const containerClass = ctl(`aspect-h-9 aspect-w-16 relative`)
const embedClass = ctl(`w-full h-full`)

export default function CustomEmbed({ url }) {
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

  if (isYoutube(url) || isYoutubeShort(url)) {
    const videoId = isYoutube(url)
      ? url.match(youtubeRegex)[1]
      : url.match(youtubeShortRegex)[1]
    return (
      <YouTube
        videoId={videoId}
        containerClassName="relative w-full h-0 aspect-h-9 aspect-w-16 overflow-hidden youtube"
        opts={{
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 1
          }
        }}
      />
    )
  }

  if (isTwitch(url)) {
    const channel = url.match(twitchRegex)[1]
    return (
      <ReactTwitchEmbedVideo
        channel={channel}
        layout="video"
        theme="dark"
        targetClass={containerClass}
      />
    )
  }

  if (isTwitchVideo(url)) {
    const video = url.match(twitchVideoRegex)[1]
    return (
      <ReactTwitchEmbedVideo
        video={video}
        layout="video"
        theme="dark"
        targetClass={containerClass}
      />
    )
  }

  if (isTwitchClips(url)) {
    const clipId = url.match(twitchClipsRegex)[1]
    return (
      <div className={containerClass}>
        <iframe
          src={`https://clips.twitch.tv/embed?clip=${clipId}&parent=localhost&parent=joincomet.app`}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          className={embedClass}
        />
      </div>
    )
  }

  return null
}
