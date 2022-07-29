# useRequestCookies
Composable to access Request Cookies

## Usage

### Single Cookie
```ts
import { use, useRequestCookies } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = useRequestCookies()
  const name = get('name')

  return {
   name
  }
})
```

### All Cookies
```ts
import { use, useRequestCookies } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { cookies } = useRequestCookies()

  return {
   cookies
  }
})
```

### Typed Cookies
```ts
import { use, useRequestCookies } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = useRequestCookies<'name'>()

  // TS ERROR!
  // Argument of type '"foo"' is not assignable to parameter of type '"name"'.
  const foo = get('foo')

  return {
    foo,
  }
})
```