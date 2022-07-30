# usePathParameters
Composable to access Path Parameters

## Usage

### Single Parameter
```ts
import { use, usePathParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = usePathParameters()
  const name = get('name')

  return {
   name
  }
})
```

### All Parameters
```ts
import { use, usePathParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { pathParameters } = usePathParameters()

  return {
   pathParameters
  }
})
```

### Typed Parameters
```ts
import { use, usePathParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = usePathParameters<{ name?: string }>()

  // TS ERROR!
  // Argument of type '"foo"' is not assignable to parameter of type '"name"'.
  const foo = get('foo')

  return {
    foo,
  }
})
```