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

### Setting Multiple Cookies
[OOTB](https://en.wikipedia.org/wiki/Out_of_the_box_(feature)) the AWS [API Gateway](https://aws.amazon.com/api-gateway/) 
response headers are a JS object which means you cannot send multiple `set-cookie` headers as you
can only have 1 key of that name. ServerlessUse will do some [Shenanigans](https://i.giphy.com/media/6jRPMGlxveBs4/giphy-downsized-large.gif)
to create multiple set-cookie headers.

::: warning
Be cautious with this as API Gateway has [limits on header sizes](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html#api-gateway-control-service-limits-table)
however this seem to only be on incoming requests. So if your API response sends back > 10240 Bytes of cookies the browser
will store them but no longer be able to make requests as cookies are sent with every request.
```ts
import { use, useResponseCookies } from '@serverless-use/apigw'

export default use(async () => {
  const { set } = useResponseCookies()
  for (let i = 0; i < 5; i++) {
    set(`foo-${i}`, `bar-${i}`)
  }

  return "All the 🍪's"
})
```
:::

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