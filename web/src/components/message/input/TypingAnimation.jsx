import {
  typing,
  typingDot
} from '@/components/message/input/Typing.module.scss'

export default function TypingAnimation() {
  return (
    <div className={typing}>
      <div className={typingDot} />
      <div className={typingDot} />
      <div className={typingDot} />
    </div>
  )
}
