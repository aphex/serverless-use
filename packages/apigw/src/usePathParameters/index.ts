import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'

import type { APIGatewayProxyEventPathParameters } from 'aws-lambda'

export const usePathParameters = createSharedExecutionComposable(<T extends APIGatewayProxyEventPathParameters>() => {
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
