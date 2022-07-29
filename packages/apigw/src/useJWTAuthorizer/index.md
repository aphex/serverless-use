# useLambdaAuthorizerContext
Composable to access the Lambda Authorizer Context

## Usage

### Check a Scope
```ts
import { use, useJWTAuthorizer } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { hasScope } = useJWTAuthorizer()

  const hasEmailScope = hasScope('email')

  return {
    hasEmailScope,
  }
})
```

### Get a Claim
```ts
import { use, useJWTAuthorizer } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { getClaim } = useJWTAuthorizer()

  const email = getClaim('email')

  return {
    email,
  }
})
```