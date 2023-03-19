import { useMemo } from 'react'
import { getOverview } from '../../_modules'
import { useTabs } from './useTabs'

export const useOverview = () => {
  const { tabs } = useTabs();

  const overviewData = useMemo(() => {
    return getOverview(tabs)
  }, [tabs])

  return { overview: overviewData }
}