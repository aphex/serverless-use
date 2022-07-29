# useRequestBody
Composable to access the Request Body

## Usage

### Basic Read *(application/json)*
```ts
import { use, useRequestBody } from '@serverless-use/apigw'

export const handler use(async () => {
  const { body } = useRequestBody()

  return {
    body,
  }
})
```

### Text Read *(text/plain)*
```ts
import { use, useRequestBody } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { body } = useRequestBody<string>()

  if (typeof body !== 'string') return { statusCode: 400 }

  return {
    body: body.replace(/medallion/gi, 'Auryn'),
  }
})
```

### Typed Body
```ts
import { use, useRequestBody } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { body } = useRequestBody<{ name: string }>()

  // Property 'foo' does not exist on type '{ name: string; }'
  const { foo } = body

  return {
    foo,
  }
})
```