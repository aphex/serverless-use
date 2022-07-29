# useQueryParameters
Composable to access Query Parameters

## Usage

### Single Parameter
```ts
import { use, useQueryParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = useQueryParameters()
  const name = get('name')

  return {
   name
  }
})
```

### All Parameters
```ts
import { use, useQueryParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { queryParameters } = useQueryParameters()

  return {
   queryParameters
  }
})
```

### Typed Parameters
```ts
import { use, useQueryParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = useQueryParameters<'name'>()

  // TS ERROR!
  // Argument of type '"foo"' is not assignable to parameter of type '"name"'.
  const foo = get('foo')

  return {
    foo,
  }
})
```