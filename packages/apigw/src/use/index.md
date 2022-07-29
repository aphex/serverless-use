# use
Wrapper managing composable execution scope, errors, and automatic result transform for ApiGateway requests

## Usage

### Basic Example
```ts
import { use } from '@serverless-use/apigw'

export const handler = use(async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: 'You must live your story.',
  }
})
```

### Automatic String Transformation
```ts
import { use } from '@serverless-use/apigw'

// Returns a 200 with application/json and the content as the body
export const handler = use(async () => {
  return '{"text": "You must live your story."}'
})
```

### Automatic Boolean Transformation
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

### Automatic Custom Object Transformation
```ts
import { use } from '@serverless-use/apigw'

// Returns a 200 with application/json and the content as the body
export const handler = use(async () => {
  return { text: 'You must live your story.' }
})
```

### With Custom Error Handler
```ts
import { use, useQueryParameters } from '@serverless-use/apigw'

export const handler =  use(
  async () => {
    const { queryParameters } = useQueryParameters()
    // Do some real auth checking here
    if (!queryParameters.token) throw new Error('Unauthorized User')

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
      body: /*html*/ `
        <body style="display: grid; place-content: center;">
          <img src="https://i.giphy.com/media/wSSooF0fJM97W/giphy.gif">
        </body>`,
    }),
  },
)
```

### Default Fallback Error Result
```ts
import { use } from '@serverless-use/apigw'

export const handler = use(
  async () => {
    throw new Error()
  },
  {
    fallbackResult: {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Never give up and good luck will find you.' }),
    },
  },
)
```

### Disable Compression
```ts
import { use } from '@serverless-use/apigw'

export const handler = use(
  async () => {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: 'You must live your story.',
    }
  },
  { compression: false },
)
```

### Custom Compression
```ts
import { use } from '@serverless-use/apigw'

export const handler = use(
  async () => {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: 'You must live your story.',
    }
  },
  {
    compression: {
      priority: ['gzip', 'deflate'],
    },
  },
)
```

### Disable Automatic Result Transformation
```ts
import { use } from '@serverless-use/apigw'

export const handler = use(
  async () => {
    return 'You must live your story.'
  },
  {
    
  },
)

```