import type { HeadlessEffectComponent } from 'react'
import { memo } from 'react'

import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect'
import { useAppSelector } from '../redux/hooks'
import { dispatch } from '../redux/store'
import { selectTheme, updateTheme } from '../redux/themeSlice'

const GrobalHooks: HeadlessEffectComponent = memo(() => {
  // apply TailwindCSS theme onLoaded
  // bause Router component render phase defenitelly run once per app loding
  const theme = useAppSelector(selectTheme)
  useIsomorphicLayoutEffect(() => {
    dispatch(updateTheme(theme))
  }, [])

  return null
})
GrobalHooks.displayName = 'HeadlessEffect.GrobalHooks'

export default GrobalHooks
