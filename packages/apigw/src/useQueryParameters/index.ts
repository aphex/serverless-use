import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

export const useQueryParameters = createSharedExecutionComposable(<T extends string>() => {
  const { event } = useEvent()
  const get = () => (event.queryStringParameters || {}) as Record<T, string>

  return {
    get queryParameters() {
      return get()
    },
    get(parameter: T) {
      const queryParameters = get()
      return queryParameters[parameter]
    },
  }
})
