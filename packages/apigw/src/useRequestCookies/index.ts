import { createSharedExecutionComposable } from '@serverless-use/core'
import { CookieParseOptions, parse } from 'cookie'

import { useEvent } from '../useEvent'

export const useRequestCookies = createSharedExecutionComposable(
  <T extends string>(parseOpts?: CookieParseOptions) => {
    const { event } = useEvent()
    const cookies = parse(
      ('cookies' in event ? event.cookies?.join(';') : '') || '',
      parseOpts,
    ) as Record<T, string>

    return {
      cookies,
      get(cookie: T) {
        return cookies[cookie]
      },
    }
  },
)
