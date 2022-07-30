import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

export const usePathParameters = createSharedExecutionComposable(<
  T extends Record<string, string>,
>() => {
  const { event } = useEvent()
  const get = () => (event?.pathParameters || {}) as T

  return {
    get pathParameters() {
      return get()
    },
    get(parameter: keyof T) {
      const pathParameters = get()
      return pathParameters[parameter]
    },
  }
})
