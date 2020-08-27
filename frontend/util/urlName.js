export const urlName = (title) => {
  if (!title) return ''
  return title
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/\W/g, '')
    .split('_')
    .slice(0, 9)
    .join('_')
}
