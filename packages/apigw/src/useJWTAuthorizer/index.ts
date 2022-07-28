import { ServerlessUseAPIGatewayProxyEvent, useEvent } from '../useEvent'

import type { APIGatewayEventRequestContextJWTAuthorizer } from 'aws-lambda'

export const useJWTAuthorizer = () => {
  const { event } = useEvent<ServerlessUseAPIGatewayProxyEvent>()

  let jwt: APIGatewayEventRequestContextJWTAuthorizer['jwt'] | undefined = undefined

  if ('authorizer' in event.requestContext) {
    const authorizer = event.requestContext.authorizer
    if (authorizer && 'jwt' in authorizer) {
      jwt = authorizer.jwt
    }
  }

  return {
    getClaim: (claim: string) => jwt?.claims?.[claim],
    hasScope: (scope: string) => jwt?.scopes?.includes(scope),
  }
}
