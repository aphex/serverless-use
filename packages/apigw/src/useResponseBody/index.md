# useResponseBody
Utility function to get and set the body that will be returned in the Response

<!-- ## Configuration -->

## Usage

### Basic Body Setting
```ts
import { use, useResponseBody } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { body } = useResponseBody()
  body.name = 'Atreyu'
})
```

### Merging with Handler
```ts
import { use, useResponseBody } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { body } = useResponseBody()
  body.name = 'Atreyu'

  return {
    enemy: 'Gmork',
  }
})
```

::: warning
In the case of a merge conflict the handler body will always win.
:::

### Returning HTML
```ts
import { use, useResponseBody } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { html } = useResponseBody()
  html.value = '<h1>You must live your story.</h1>'
})
```

### Returning Plain Text
```ts
import { use, useResponseBody } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { text } = useResponseBody()
  text.value = 'You must live your story.'
})
```

### Priority `body` > `html` > `text`
```ts
import { use, useResponseBody } from '@serverless-use/apigw'

export default use(async () => {
  const { body, html, text } = useResponseBody()
  body.name = 'Atreyu'
  html.value = '<h1>Hello</h1>'
  text.value = 'Hello World'

  // will result in 
  // { "name":"Atreyu" }
})
```