import { ServerlessUseAPIGatewayProxyEvent, useEvent } from '../useEvent'

export const useLambdaAuthorizerContext = <TAuthorizerContext>() => {
  const { event } = useEvent<ServerlessUseAPIGatewayProxyEvent>()

  let _authorizer: TAuthorizerContext | undefined = undefined

  if ('authorizer' in event.requestContext) {
    const { authorizer } = event.requestContext
    if (authorizer && 'lambda' in authorizer) {
      const { lambda } = authorizer
      if (lambda) _authorizer = lambda as TAuthorizerContext
    }
  }

  return {
    get authorizer() {
      return _authorizer
    },
  }
}
