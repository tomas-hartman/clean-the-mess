import { useCallback, useEffect, useState } from "react"

export const useColorScheme = () => {
  const [darkSchemeOn, setDarkSchemeOn] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

  const listener = useCallback(e => {
    setDarkSchemeOn(e.matches)
  }, [])

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener)
  }, [listener])

  return {
    darkSchemeOn
  }
}