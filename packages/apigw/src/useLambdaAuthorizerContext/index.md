# useLambdaAuthorizerContext
Composable to access the Lambda Authorizer Context

## Usage

```ts
import { use, useLambdaAuthorizerContext } from '@serverless-use/apigw'

export default use(async () => {
  const { authorizer } = useLambdaAuthorizerContext<{ name: string }>()

  const { name } = authorizer || {}

  return {
    name,
  }
})

```