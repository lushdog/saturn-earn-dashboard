import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

function Loading() {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  })
  return null
}

export default Loading
