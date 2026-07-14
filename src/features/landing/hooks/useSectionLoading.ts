import { useEffect, useState } from 'react'

export function useSectionLoading(delay = 400) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return isLoading
}
