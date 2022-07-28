import { createSharedExecutionComposable } from '@serverless-use/core'

import type {
  APIGatewayProxyEvent,
  APIGatewayProxyEventV2,
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyEventV2WithLambdaAuthorizer,
} from 'aws-lambda'
export type ServerlessUseAPIGatewayProxyEvent =
  | APIGatewayProxyEvent
  | APIGatewayProxyEventV2
  | APIGatewayProxyEventV2WithJWTAuthorizer
  | APIGatewayProxyEventV2WithLambdaAuthorizer<any>

// Event is a Execution Singleton (one time registered global).
export const useEvent = createSharedExecutionComposable(<
  T extends ServerlessUseAPIGatewayProxyEvent = APIGatewayProxyEventV2
>() => {
  let event: T | undefined

  return {
    get event() {
      if (!event) throw new Error('Event can only be accessed after it has been registered')
      return event
    },
    _registerEvent: (e: T) => {
      if (event) throw new Error('Event can only be registered once')
      event = e
    },
  }
})
