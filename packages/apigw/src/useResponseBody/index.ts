import { createSharedExecutionComposable } from '@serverless-use/core'

export const useResponseBody = createSharedExecutionComposable(<
  T extends object | string = any,
>() => {
  const body: T extends object ? Partial<T> : T = {} as any

  return {
    body,
  }
})
