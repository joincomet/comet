import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('./MyEditor'), { ssr: false })
export default Editor
