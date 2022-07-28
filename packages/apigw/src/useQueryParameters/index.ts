import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

import type { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'

export const useQueryParameters = createSharedExecutionComposable(<
  T extends APIGatewayProxyEventQueryStringParameters
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
