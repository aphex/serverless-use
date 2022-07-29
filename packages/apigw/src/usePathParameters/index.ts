import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

export const usePathParameters = createSharedExecutionComposable(<T extends string>() => {
  const { event } = useEvent()
  const get = () => (event?.pathParameters || {}) as Record<T, string>

  return {
    get pathParameters() {
      return get()
    },
    get(parameter: T) {
      const pathParameters = get()
      return pathParameters[parameter]
    },
  }
})
