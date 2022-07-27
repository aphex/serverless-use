import { createSharedExecutionComposable } from '@serverless-use/core'
import { CookieParseOptions, parse } from 'cookie'

import { useEvent } from '../useEvent'

export const useRequestCookies = createSharedExecutionComposable(
  (parseOpts?: CookieParseOptions) => {
    const { event } = useEvent()
    const cookies = parse(('cookies' in event ? event.cookies?.join(';') : '') || '', parseOpts)

    return {
      cookies,
    }
  },
)
