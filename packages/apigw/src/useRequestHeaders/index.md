# useRequestHeaders
Composable to access Request Headers

## Usage

### Basic Read
```ts
import { use, useRequestHeaders } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get, headers } = useRequestHeaders()
  const userAgent = get('user-agent')

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: /*html*/ `
      <div>
        <h1>Single Header</h1>
        <p><b>User Agent: </b> ${userAgent}</p>
      </div>
      <div>
        <h1>All Headers</h1>
        ${Object.entries(headers)
          .map(([key, value]) => `<p><b>${key}:</b> ${value}</p>`)
          .join('')}
      </div>
    `,
  }
})
```
### Typed Headers
```ts
import { use, useRequestHeaders } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = useRequestHeaders<'authentication' | 'user-agent'>()

  // TS ERROR!
  // Argument of type '"name"' is not assignable to parameter 
  // of type '"authentication" | "user-agent"'.
  const name = get('name')

  return { name }
})
```