import { createSharedExecutionComposable } from '@serverless-use/core'

export const useResponseHeaders = createSharedExecutionComposable(<T extends string>() => {
  const headers: Record<T, string> = {} as Record<T, string>

  return {
    headers,
    get(header: T) {
      return headers[header.toLowerCase() as T]
    },
    set(header: T, value: string) {
      headers[header.toLowerCase() as T] = value
    },
  }
})
