import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

export const useRequestHeaders = createSharedExecutionComposable(<T extends string>() => {
  const { event } = useEvent()
  const get = () =>
    (Object.fromEntries(
      Object.entries(event?.headers || {}).map(([key, value]) => [key.toLowerCase(), value]),
    ) || {}) as Record<T, string>

  return {
    get headers() {
      return get()
    },
    get(header: T) {
      const headers = get()
      return headers[header.toLowerCase() as T]
    },
  }
})
