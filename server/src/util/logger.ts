export function logger(...messages: any[]) {
  if (process.env.NODE_ENV === 'production') return
  for (const message of messages) {
    console.log(message)
  }
}
