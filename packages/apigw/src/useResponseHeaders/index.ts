import { createSharedExecutionComposable } from '@serverless-use/core'

export const useResponseHeaders = createSharedExecutionComposable(() => {
  const headers: Record<string, string> = {}

  return {
    headers,
    get(header: string) {
      return headers[header.toLowerCase()]
    },
    set(header: string, value: string) {
      headers[header.toLowerCase()] = value
    },
  }
})
