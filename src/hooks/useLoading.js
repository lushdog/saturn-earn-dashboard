import { useState } from 'react'

const useLoading = (request) => {
  const [loading, setLoading] = useState(false)

  const fetchData = (...data) => {
    setLoading(true)
    return request(...data).finally(() => {
      setLoading(false)
    })
  }
  return [loading, fetchData]
}

export default useLoading
