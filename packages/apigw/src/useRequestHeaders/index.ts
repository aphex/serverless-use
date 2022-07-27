import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

export const useRequestHeaders = createSharedExecutionComposable(() => {
  const { event } = useEvent()
  const get = () =>
    Object.fromEntries(
      Object.entries(event?.headers || {}).map(([key, value]) => [key.toLowerCase(), value]),
    )

  return {
    get headers() {
      return get()
    },
    get(header: string) {
      const headers = get()
      return headers[header.toLowerCase()]
    },
  }
})
