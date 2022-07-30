import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

export const useQueryParameters = createSharedExecutionComposable(<
  T extends Record<string, string>,
>() => {
  const { event } = useEvent()
  const get = () => (event.queryStringParameters || {}) as T

  return {
    get queryParameters() {
      return get()
    },
    get(parameter: keyof T) {
      const queryParameters = get()
      return queryParameters[parameter]
    },
  }
})
