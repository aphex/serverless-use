# useResponseHeaders
Utility function to get and set headers that will be returned in the Response

<!-- ## Configuration -->

## Usage

### Setting Headers
```ts
import { use, useResponseHeaders } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { set } = useResponseHeaders()

  set('content-type', 'text/html')

  return '<h2>You must live your story.</h2>'
})
```

### Reading Headers 
```ts
import { use, useResponseHeaders } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { set, get } = useResponseHeaders()
  set('content-type', 'application/json')

  const contentType = get('content-type')

  return `<h2>${contentType}</h2>`
})

```

### Typed Headers
```ts
import { use, useResponseHeaders } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { set, get } = useResponseHeaders<'content-type' | 'authorization'>()
  set('content-type', 'application/json')

  // TS Error! 
  // Argument of type '"auth"' is not assignable to 
  // parameter of type '"content-type" | "authorization"' 
  set('auth', 'application/json')

  const contentType = get('content-type')

  return `<h2>${contentType}</h2>`
})

```