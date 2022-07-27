import { useEvent } from '../useEvent'

import type { APIGatewayProxyWithLambdaAuthorizerEvent } from 'aws-lambda'
export const useLambdaAuthorizerContext = <TAuthorizerContext>() => {
  const { event } = useEvent<APIGatewayProxyWithLambdaAuthorizerEvent<TAuthorizerContext>>()
  const authorizer = event.requestContext.authorizer

  return {
    get: () => authorizer,
  }
}
