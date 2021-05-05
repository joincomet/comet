export const createNotification = ({
  onClick,
  title,
  body,
  icon,
  timestamp
}) => {
  if (Notification.permission !== 'granted') return
  const notification = new Notification(title, {
    body,
    icon,
    timestamp,
    silent: true
  })
  notification.onclick = onClick
  const audio = new Audio(`${window.electron ? '.' : ''}/notification.mp3`)
  audio.volume = 0.5
  audio.play()
}
