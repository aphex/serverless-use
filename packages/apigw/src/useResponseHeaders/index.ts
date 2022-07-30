import { createSharedExecutionComposable } from '@serverless-use/core'

export const useResponseHeaders = createSharedExecutionComposable(<
  T extends Record<string, string>,
>() => {
  const headers = {} as T

  return {
    headers,
    get(header: keyof T) {
      return headers[header.toString().toLowerCase()]
    },
    set(header: keyof T, value: string) {
      headers[header.toString().toLowerCase() as keyof T] = value as typeof headers[keyof T]
    },
  }
})
