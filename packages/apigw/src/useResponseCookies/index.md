# useResponseCookies
Utility function to get and set cookies that will be returned in the Response

<!-- ## Configuration -->

## Usage

### Setting Cookies
```ts
import { use, useResponseCookies } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { set } = useResponseCookies()

  set('name', 'Falkor')

  return {
    message: 'Having a luck dragon with you is the only way to go on a quest.',
  }
})
```

### Reading Cookies 
```ts
import { use, useResponseCookies } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get, set } = useResponseCookies()
  set('name', 'Falkor')

  const name = get('name')

  return {
    name,
  }
})

```

### Typed Cookies
```ts
import { use, useResponseCookies } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get, set } = useResponseCookies<{ title?: string }>()

  // TS ERROR!
  // Argument of type '"name"' is not assignable to parameter of type '"title"'
  set('name', 'Falkor')
  
  // TS ERROR!
  // Argument of type '"name"' is not assignable to parameter of type '"title"'
  const name = get('name')

  return {
    name,
  }
})

```