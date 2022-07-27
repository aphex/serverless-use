import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

export const useQueryParameters = createSharedExecutionComposable(() => {
  const { event } = useEvent()
  const get = () => event?.queryStringParameters || {}

  return {
    get queryParameters() {
      return get()
    },
    get(parameter: string) {
      const queryParameters = get()
      return queryParameters[parameter]
    },
  }
})
