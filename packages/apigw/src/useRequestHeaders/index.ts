import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

export const useRequestHeaders = createSharedExecutionComposable(<
  T extends Record<string, string>,
>() => {
  const { event } = useEvent()
  const get = () =>
    (Object.fromEntries(
      Object.entries(event?.headers || {}).map(([key, value]) => [key.toLowerCase(), value]),
    ) || {}) as T

  return {
    get headers() {
      return get()
    },
    get(header: keyof T) {
      const headers = get()
      return headers[header.toString().toLowerCase()]
    },
  }
})
