# use

Handler wrapper enabling global composable for ApiGateway requests

## Usage

Basic Example
```ts
import { use } from '@serverless-use/apigw'

export const handler = use(async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: 'Hello World',
  }
})
```

Automatic String Transformation
```ts
import { use } from '@serverless-use/apigw'

// Returns a 200 with application/json and the content as the body
export const handler = use(async () => {
  return '{"text": "Hello World"}'
})
```

Automatic Boolean Transformation
```ts
import { use } from '@serverless-use/apigw'

// Returns a 200
export const handler = use(async () => {
  return true
})

// Returns a 400
export const handler = use(async () => {
  return false
})
```

Automatic Custom Object Transformation
```ts
import { use } from '@serverless-use/apigw'

// Returns a 200 with application/json and the content as the body
export const handler = use(async () => {
  return { text: 'Hello World' }
})
```

With Custom Error Handler
```ts
import { use } from '@serverless-use/apigw'

export const handler = use(
  async () => {
    if (!isUserAuthorized())
      throw new Error('Unauthorized User')

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: 'Welcome!',
    }
  },
  {
    onError: (e: Error) => ({
      statusCode: 401,
      headers: {
        'Content-Type': 'text/html',
      },
      body: e.message,
    }),
  },
)
```