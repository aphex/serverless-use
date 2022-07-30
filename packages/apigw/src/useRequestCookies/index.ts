import { createSharedExecutionComposable } from '@serverless-use/core'
import { CookieParseOptions, parse } from 'cookie'

import { useEvent } from '../useEvent'

export const useRequestCookies = createSharedExecutionComposable(
  <T extends Record<string, string>>(parseOpts?: CookieParseOptions) => {
    const { event } = useEvent()
    const cookies = parse(
      ('cookies' in event ? event.cookies?.join(';') : '') || '',
      parseOpts,
    ) as T

    return {
      cookies,
      get(cookie: keyof T) {
        return cookies[cookie]
      },
    }
  },
)
